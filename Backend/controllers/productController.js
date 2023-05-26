const Products = require('../models/productModel');

exports.getAllProducts = async (req,res)=>{
    try{
        const products = await Products.find();
        res.status(200).json({
            success:true,
            message:"All Products fetched",
            data:products,
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:`Cannot fetch Products: ${err}`
        })
    }
}

exports.getProduct = async (req,res)=>{
    try{
        const id = req.params.id;
        console.log(id)
        const product = await Products.findById(id);
        res.status(200).json({
            success:true,
            message:" Product fetched",
            data:product,
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:`Cannot fetch the Product: ${err}`
        })
    }
}