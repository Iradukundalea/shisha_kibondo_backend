import generateHtmlTemplate from "../sendEmail/generateHtmlTemplate";
import nodemailer from 'nodemailer'

const sendResetPasswordEmail = async(user, link) =>{
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
    to: `${user.email}`, // list of receivers
    subject: "Reset Password", // Subject line
    text: `${link}`, // plain text body
    html: `
    <p>Click the link below to follow the requirements to reset your password:</p>
    <a href=${link}>Click here to reset your password</a>
    <br>
    `
    // html: generateHtmlTemplate(redirectLink, newUser.email) // html body
  }, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // }); 

}

export default sendResetPasswordEmail
