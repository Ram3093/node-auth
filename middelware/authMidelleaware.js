const jwt=require('jsonwebtoken');
const User =require('../models/user')

const requireAuth=(req,res,next)=>{

   const token=req.cookies.jwt;
   //console.log(token)
   //check json web token exists and is verified
   if (token){
       jwt.verify(token,'my top secret.', (err,decodedToken)=>{
           if(err){
            res.redirect('/login');
           }
           else{
             //  console.log(decodedToken);
               
               next();
           }
       })
   }else{
       res.redirect('/login');
   }

}

const checkUser=(req,res,next)=>{
    const token=req.cookies.jwt;
    //console.log(token)
    //check json web token exists and is verified
    if (token){
        jwt.verify(token,process.env.SECRET,async(err,decodedToken)=>{
            if(err){
                res.locals.user=null
                next();
             //res.redirect('/login');
         
            }
            else{
              //  console.log(decodedToken);
                const user=await User.findById(decodedToken.id);
                res.locals.user=user;
                next();
            }
        })
    }else{
        res.locals.user=null
        next();
    }
}

module.exports={ requireAuth ,checkUser }