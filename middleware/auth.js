const {validateToken}=require('../controllers/auth')
const auth=(req,res,next)=>{
    validateToken(req,res,next)
}
module.exports=auth;