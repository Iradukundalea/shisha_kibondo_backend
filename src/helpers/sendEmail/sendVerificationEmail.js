import nodemailer from 'nodemailer';
import generateHtmlTemplate from './generateHtmlTemplate';
import { generatePasswordHtmlTemplate } from './generateHtmlTemplate'

const sendVerificationEmail = async(regToken, newUser) =>{
   
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }   
    })

  let info = await transporter.sendMail({
    from: `"SHISHAKIBONDO" <${process.env.EMAIL}>`, // sender address
    to: `${newUser.email}`, // list of receivers
    subject: "sucessfull", // Subject line
    text: "Hello world?", // plain text body
    html: generateHtmlTemplate( null, newUser.email) // html body
  });

}

export const sendInitialPassowrd = async(newUser, password, role) =>{

  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }   
  })

let info = await transporter.sendMail({
  from: `"SHISHAKIBONDO" <${process.env.EMAIL}>`, // sender address
  to: `${newUser.email}`, // list of receivers
  subject: "Account Credentials", // Subject line
  text: "Password for your account!", // plain text body
  html: generatePasswordHtmlTemplate( null, newUser, password, role) // html body
});

}

export default sendVerificationEmail
