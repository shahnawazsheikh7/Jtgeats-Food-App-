const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",
    }],
});

module.exports = mongoose.model("categoriesModel",categoriesSchema);