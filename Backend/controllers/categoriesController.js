const Category = require("../models/categoriesModel");
const Product = require("../models/productModel")

exports.getCategories = async (req,res) =>{
    try{
        const categories = await Category.find();

        res.status(200).json({
            success:true,
            message:"All categories fetched",
            data:categories,
        })

    } catch(err){
        return res.status(400).json({
            success:false,
            message:`Cannot fetch categories: ${err}`
        })
    }
};
exports.oneCategory = async (req,res) =>{
    try{
        const id = req.params.id;
        const cat = await Category.findById(id).populate("products").exec();

        res.status(200).json({
            success:true,
            message:"Category fetched",
            cat
        })

    } catch(err){
        return res.status(400).json({
            success:false,
            message:`Cannot fetch category: ${err}`
        })
    }
};

exports.newCategory = async (req,res) =>{
    try{
        const {title,image} = req.body;
        const response = await Category.create({title,image});

        res.status(200).json({
            success:true,
            message:"Category created successfully",
            response,
        })

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"Cannot create new category",
        })
    }
};
exports.addProduct = async(req,res)=>{
    try{
        const {title,image,description,rating,price,category} = req.body;
        const newProduct = await Product.create({title,image,description,rating,price,category});
        const updatedCategory = await Category.findByIdAndUpdate(category, {$push:{products:newProduct._id}}, {new:true});
        res.status(200).json({
            success:true,
            message:"Product added Successfully",
            newProduct,
            updatedCategory
        })

    }catch(err){
        return res.status(400).json({
            success:false,
            message:`Cannot add product, ${err}`
        })

    }
}