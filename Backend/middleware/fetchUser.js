const jwt = require('jsonwebtoken');
const JWT_SEC = "palakisgreatguy%"


const fetchUser=(req,res,next)=>{

    const token=req.header('jwtData')
    if(!token){
        return res.status(401).send({error: "Please authenticate first"})
    }

    try {
        const str=jwt.verify(token,JWT_SEC)
    req.user=str.user;
     next();
    } catch(error) {
        return res.status(401).send({error: "Please authenticate first"})
    }

}
module.exports=fetchUser;