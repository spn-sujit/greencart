import jwt from "jsonwebtoken";

const authUser = async (req,res,next)=>{
    const {token} = req.cookies;
    if(!req.body) req.body = {};
    if(!token){
        return  res.json({success:false, message :'Not Authorized'});
    }
    try{
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode){
            req.body.userId = tokenDecode.id;
        }
        else{
            return res.json({success:false,message:'Not Authorized'});
        }
        next();

    }catch(error){
          res.json({success:false,message:error.message});
    }

}
export default authUser;