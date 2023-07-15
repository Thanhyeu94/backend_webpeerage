import { Request,Response } from "express";
import { responseBadRequest, responseErrorInternal, responseNotFound, responseSuccess, responseUnauthorized } from "../../common/response";
import usersService from "../users/users.service";
import authService from "./auth.service";
import crypto from "crypto"
class authController{
    async register(req:Request,res:Response){
        try {
           const {name,phone,email,password} = req.body;
           if(!name||!phone||!email||!password){
            return res.send(responseBadRequest('invalid params'))
           }
           const checkEmail = await usersService.checkUnique(email)
           if(checkEmail){
            return res.send(responseBadRequest('email already exists'))
           }
           const secret = process.env.HASHING_KEY;
           if(!secret){
            return res.send(responseNotFound())
           }
          const hashpass = crypto.createHmac("sha256", secret||'').update(password).digest('hex');
          const verifiedToken = await authService.genVerifiedTocken({email,phone})
          if(verifiedToken==''){
            return res.send(responseErrorInternal())
          }
          const link = `http://localhost:3000/api/v1/auth/verify?email=${email}&token=${verifiedToken}`
          console.log(link)
         const customer = await usersService.insert({
            email: email,
            phone: phone,
            password: hashpass,
            name: name,
            vetify_token: String(verifiedToken),
            status_token: false,
         })
         await authService.sendMail(email, link)
         return res.send(responseSuccess(customer));
        } catch (err:any) {
            return res.send(responseErrorInternal(err.message));
        }
     }
     async verify(req:Request,res:Response) {
        try {
            const {email,token} = req.query
            console.log("req: ",req.query)
            const customer = await usersService.findOne({
                email: String(email),
                token: String(token),
            })
            if (customer===null){
                console.log("hihi")
                return res.send(responseBadRequest('invalid params'));
            }
            const decodeData: any = await authService.verifyToken(String(token))
            if(customer.email !== decodeData.email){
                return res.send(responseBadRequest('invalid params'));
            }
            const active = await authService.activeAccout(String(email))

            return res.send(responseSuccess(active));
        } catch (err:any) {
            return res.send(responseErrorInternal(err.message));
        }
     }
     async login(req:Request,res:Response) {
        try {
            const {email,password}= req.body;
            if(!email || !password){
                return res.send(responseBadRequest('invalid email or password'))
            }
            const secret = process.env.HASHING_KEY;
           if(!secret){
            return res.send(responseNotFound())
           }
            const hashpass = crypto.createHmac("sha256", secret||'').update(password).digest('hex');
            const checkCustome= await usersService.checkCustomer({
                email,
                password:hashpass,
            })
            console.log("gffd",checkCustome)
            if (checkCustome === null) {
                return res.send(responseBadRequest("invalid email or password"));
              }  
              const accessToken = await authService.genAccessToken({ 
                id: checkCustome.id,
                email: checkCustome.email 
                });
              if (accessToken === "") {
                return res.send(responseErrorInternal());
              }
              return res.send(responseSuccess({accessToken}));      
        } catch (err:any) {
            return res.send(responseErrorInternal(err.message));
        }
     }
 }
 export default new authController();