
// auth, isAdmin,isCustomer

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authorize = (req,res, next) => {
    try{
        //extract JWT token
        //PENDING : other ways to fetch token
        const token = req.body.token ;

        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            //why this ?
            req.user = payload;
            console.log(req.user);
        } catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    } 
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
        });
    }
   
}


exports.isAdmin = (req,res,next) => {
    try{
            if(req.user.role !== "admin") {
                return res.status(401).json({
                    success:false,
                    message:'THis is a protected route for admin only',
                });
            }
            next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

exports.isCustomer = (req,res,next) => {
    try{
        if(req.user.role !== "customer") {
            return res.status(401).json({
                success:false,
                message:'THis is a protected route for customer',
            });
        }
        next();
}
catch(error) {
    return res.status(500).json({
        success:false,
        message:'User Role is not matching',
    })
}
}