import nodemailer from 'nodemailer';
import generateHtmlTemplate from './generateHtmlTemplate';

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
    from: `"Smart health" <${process.env.EMAIL}>`, // sender address
    to: `${newUser.email}`, // list of receivers
    subject: "sucessfull", // Subject line
    text: "Hello world?", // plain text body
    html: generateHtmlTemplate( null, newUser.email) // html body
  });

}
export default sendVerificationEmail


