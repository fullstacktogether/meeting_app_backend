const jwt = require("jsonwebtoken");
const User = require("../models/User")
const auth = async(req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ","")
        const verify = jwt.verify(token,"SECRET")
        const userId = verify.user
        req.user = await User.findById({_id:userId})
        next()
    } catch (error) {
        next(error)
    }
}
module.exports=auth