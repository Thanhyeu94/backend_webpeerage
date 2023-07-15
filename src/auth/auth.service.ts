import * as  jwt from "jsonwebtoken"
import { authCreatePayLoad } from "./auth.interface"
import {pool} from "../config/pg"
import { transporter } from "../config/nodemailer"
class authService{
    async genVerifiedTocken(customer:any){
        try {
            if(!process.env.JWT_KEY) return ''
            const verifiedToken = jwt.sign(customer,process.env.JWT_KEY,{ expiresIn: 60 * 60 })
            return verifiedToken
          } catch (err) {
            console.log(err)
            return false
            // throw err
          }
     }
     async verifyToken(token:string){
      try {
        if(!process.env.JWT_KEY) return null
        const customer = jwt.verify(token,process.env.JWT_KEY||'')
        return customer
        } catch (err) {
          console.log(err)
          return false
          throw err
        }
   }
   async activeAccout(email: string) {
    try {
      const customer = await pool.query(
        `
          UPDATE customers
          SET status_token = true
          WHERE email = $1
          RETURNING id, email
        `, [email]
      )

      if (customer.rows.length === 0) {
        return null
      }
      return customer.rows[0]
    } catch (err) {
      throw err
    }
  }
  async sendMail(email: string, link: string) {
    const mailOptions = {
      from: 'thanh@gmail.com',
      to: email,
      subject: 'ACTIVE ACCOUNT',
      text: link,
      html: `<a href="${link}">Click here to active your account</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return false
      }
      console.log('Message sent: %s', info.messageId);
      return true
    });
  }
  async genAccessToken(customer:any){
    if (!process.env.JWT_KEY) return ''
    const accessToken = jwt.sign(customer, process.env.JWT_KEY, { expiresIn: 604800 })
    return accessToken
  }
}
 export default new authService();