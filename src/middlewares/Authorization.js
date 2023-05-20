import { User,  } from "../models";
import verifyToken from "../helpers/verifyToken";
import { getUserSessions } from "../service/userServices";

const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({message:"Access denied. No token provided!"});
      
    const decoded = await verifyToken(token);

    const user = await User.findOne({ where: { id: decoded.user.id } });
    
    if (!user) return res.status(401).json({message: "Access denied. User not found"});
   if(!user.isVerified) return res.status(401).json({message:'user not verified'})
    const session = await getUserSessions(token);
    if (!session.length == 1)
      return res.status(401).json({ message: "Access denied. Invalid session!"});

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Access denied. Invalid token", error: error.message});
  }
};

export default isAuthenticated

