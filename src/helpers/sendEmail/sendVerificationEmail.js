import nodemailer from 'nodemailer';
import generateHtmlTemplate from './generateHtmlTemplate';

const sendVerificationEmail = async(regToken, newUser) =>{
    const redirectLink = `` `` 
    console.log("redirectLink", redirectLink)
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
    subject: "Account Verification", // Subject line
    text: "Hello world?", // plain text body
    html: generateHtmlTemplate(redirectLink, newUser.email) // html body
  });

}
export default sendVerificationEmail


