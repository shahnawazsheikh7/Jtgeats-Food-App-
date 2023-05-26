const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    status:{
        type:String,
        required:true,
    },
    orderValue:{
        type:Number,
        required:true
    }

});

module.exports = mongoose.model("orderModel",OrderSchema);