import { User,  } from "../models";

const isAdmin = async (req, res, next) => {
    console.log('AAAAAAAAAADdddddddddddddmmmmmmmin', req.user)
    try {
      const admin = await User.findOne({ where: { id: req.user.id, role: 'admin' } });
      
      if (!admin) return res.status(401).json({message: "Not Authorized, Only admin!"});
      return next()
     
    } catch (error) {
      return res.status(401).json({ message: "failed to perform action, try again", error: error.message, user: req.user});
    }
  };

  export default isAdmin