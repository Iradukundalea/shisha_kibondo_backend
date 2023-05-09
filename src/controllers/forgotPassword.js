import sendResetEmail from "../helpers/sendResetPasswordEmail/sendResetEmail";
import assignToken from "../helpers/assignToken"
import verifyToken from "../helpers/verifyToken"
import { userExist } from "../service/userServices";
import bcrypt from 'bcrypt'

const requestResetPassword = async( req, res)=>{
    try {
        const {email} = req.body;
        
        //Check if the user(email) exist 
        const user = await userExist(email);
        if(!user){
            return res.status(404).json({status: 404, message:"Ooops! User does't exists!"});
        }
            //check if the user is verified
        if (!user.isVerified) {
            return res.status(403).json( {status: 403, message: 'This account is not verified!'});
        }

        const token = await assignToken(user)
        //proceding with email to reset password
        const redirectLink = `${process.env.BASE_URL}` + `/api/reset-password` + token
        // console.log('reditrectLink', redirectLink)
        sendResetEmail(user, redirectLink);

        return res.status(200).json({message: "Email reset link sent successfully", resetToken: token});


    } catch (error) {
        return res.status(500).json({message: `Ooops! Unable reset password ${error.message}`});
    }
}


const resetPassword = async(req, res)=>{

    let {newPassword} = req.body;
    let {confirmPassword} = req.body;

    if(newPassword == confirmPassword){
        try {
            let token = req.params.token;
            const data = await verifyToken(token)
            const user = await userExist(data.user.email);
            if(user){
                try {
                if(newPassword == confirmPassword){
                        //hash the new password
                const hashedPassword= await bcrypt.hash(newPassword, 10);
                //Update the user password
                user.update({password: hashedPassword});
                res.send("Password updated successfully")
                // return res.status(200).json({message: "Password updated successfully", hashedPassword});
                }
    
                } catch (error) {
                    res.send(`Ooops! Updating user password failed ${error.message}`)
                // return res.status(500).json( {message: `Ooops! Updating user password failed ${error.message}`});
                }
    
            }else{
                res.send(`Ooops! You can't update the user who doesn't exist ${error.message}`)
                // return res.status(500).json( { message: `Ooops! You can't update the user who doesn't exist ${error.message}`} );
            }
    
        } catch (error) {
            res.send(`Ooops! Checking for password reset failed ${error.message}`)
            // return res.status(500).json( { message: `Ooops! Checking for password reset failed ${error.message}`});
        }

    }else{
        res.send('passwords need to match')
        // return res.status(400).json({ message: `Ooops! Entered passwords doesn't match`});
    }
    
}

const getResetPassword =(req, res)=>{
res.render('reset-password')
}


export{
     requestResetPassword,
     resetPassword,
     getResetPassword
}