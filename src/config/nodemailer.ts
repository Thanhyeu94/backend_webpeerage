import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'jocelyn.hoppe78@ethereal.email',
        pass: '5vP11HK59ncETUxDBp'
    }
});