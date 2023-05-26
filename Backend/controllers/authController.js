const User = require("../models/userModel");
const Order = require("../models/orderModel");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/auth");
require("dotenv").config();

exports.signUp = async (req, res) => {
    try {
        const { name, email, password, role, confirmPassword } = req.body;

        //if user email already registered
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.json({
                success: false,
                message: "User Email already exist. Please try another email or login",
            });
        } else if (confirmPassword !== password) {
            return res.json({
                success: false,
                message: "Password and confirm password doesn't match",
            });
        }

        const newUser = await User.create({ name, email, password, role });
        res.status(200).json({
            success: true,
            message: "New user signed up",
            newUser,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Cannot sign up new user: ${err}`,
        });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "PLease fill all the details carefully",
            });
        }
        console.log(email,password)

        const loginUser = await User.findOne({ email }).populate("orders").exec();

        if (!loginUser) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist",
            });
        }

        const payload = {
            email: loginUser.email,
            id: loginUser._id,
            role: loginUser.role,
        };

        //verify password & generate a JWT token
        if (password===loginUser.password) {

            //password match
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                });

            // loginUser = loginUser.toObject();
            loginUser.token = token;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            return res.cookie("loginCookie", token, options).status(200).json({
                success:true,
                token,
                loginUser,
                message:'User Logged in successfully',
            });
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Login Failure`,
        });
    }
};

exports.orders = async(req,res)=>{
    try{
        const payload = req.user;
        console.log(payload)
        const userOrders = await User.findById(payload.id).orders;

        res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            userOrders
        });
    }catch(err){
        res.status(400).json({
            success:false,
            message:"cant fetch orders"
        })

    }
}
exports.order = async(req,res)=>{
    try{
        const orderId = req.params.orderId;
        console.log(orderId)
        const userOrder = await Order.findById(orderId).populate("products").exec();

        res.status(200).json({
            success:true,
            message:"Order fetched successfully",
            userOrder
        });
    }catch(err){
        res.status(400).json({
            success:false,
            message:"cant fetch orders"
        })

    }
}

exports.createOrder = async(req,res)=>{
    try{
        const {products, status, orderValue} = req.body;
        const user = req.user.id;

        const newOrder = (await Order.create({products, user, status, orderValue}));
        const updatedUser = await User.findByIdAndUpdate(user, {$push: {orders: newOrder._id} }, {new :true})
        .populate("orders").exec();

        res.status(200).json({
            success:true,
            message:"Order created successfully",
            newOrder,
            updatedUser
        });
    }catch(err){
        res.status(400).json({
            success:false,
            message:"cant create an order"
        })

    }
}

