import sendResetPasswordEmail from "../helpers/sendResetPasswordEmail/sendResetEmail";
import assignToken from "../helpers/assignToken"
import verifyToken from "../helpers/verifyToken"
import { userExist } from "../service/userServices";
import bcrypt from 'bcrypt'

const requestResetPassword = async( req, res)=>{
    try {
        const { email } = req.body;
        
        //Check if the user(email) exist 
        const user = await userExist(email);
        if(!user){
            return res.status(404).json({status: 404, message:"Ooops! User does't exists!"});
        }
            //check if the user is verified
        if (!user.isVerified) {
            return res.status(403).json( {status: 403, message: 'This account is not verified!'});
        }

        const token = await assignToken({id: user.id, email: user.email})
        //proceding with email to reset password
        const encodedToken = encodeURIComponent(token);
        
        const redirectLink = `${process.env.REDIRECT_FRONTEND_BASE_URL}/api/reset-password?token=${encodedToken}`
        // const redirectLink = `${process.env.BASE_URL}` + `/api/reset-password/` + token

        // console.log('reditrectLink', redirectLink)
        sendResetPasswordEmail(user, redirectLink);

        return res.status(200).json({message: "Email reset link sent successfully", resetToken: token});


    } catch (error) {
        return res.status(500).json({message: `Ooops! Unable reset password ${error.message}`});
    }
}


const resetPassword = async(req, res)=>{

    let { newPassword } = req.body;
    let { confirmPassword } = req.body;

    if(newPassword === confirmPassword){
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
                    return res.status(200).json({ success: true, message: "Password updated successfully"})
                }
    
                } catch (error) {
                    return res.status(500).json({ success: false, message: `Ooops! Updating user password failed ${error.message}`});
                }
    
            }else{
                return res.status(500).json({ success: false, message: `Ooops! You can't update the user who doesn't exist ${error.message}`} );
            }
    
        } catch (error) {
            return res.status(500).json({ success: false, message: `Ooops! Checking for password reset failed ${error.message}`});
        }

    }else{
        return res.status(400).json({ success: false, message: `Ooops! Entered passwords doesn't match`});
    }
}

const getResetPassword = async (req, res)=>{
    const { token } = req.params
    const verified = await verifyToken(token)
    if(verified.user){

        res.send({message: 'you are verifying email', verified: verified.user})
    }

}


export{
     requestResetPassword,
     resetPassword,
     getResetPassword
}
