const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        // required:true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderModel",
    }],
    role:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model("userModel",UserSchema);