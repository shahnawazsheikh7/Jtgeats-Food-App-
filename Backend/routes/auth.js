const express = require("express");
const router = express.Router();

const {authorize, isCustomer, isAdmin} = require("../middlewares/authMiddleware");

//import controllers
const {signUp,login,orders,createOrder,order} = require("../controllers/authController");

//routes
router.post('/signup',signUp);
router.post('/login',login);

//protected routes
router.get("/user", authorize, isCustomer, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for customer',
    });
} );

router.get("/user/orders", authorize,orders);
router.post("/user/newOrder", authorize,createOrder);
router.post("/user/order/:orderId", authorize,order);

router.get("/admin", authorize, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});

module.exports = router;