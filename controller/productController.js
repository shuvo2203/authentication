const Product = require('../models/productModel');

//create a product
exports.createProduct=async(req, res)=>{
    const{name,price,desc} = req.body;
    const product = await Product.create({
        name,
        price,
        desc
    });
    res.status(200).json({
        success:true,
        product
    });
}

//get all product
exports.getAllProduct=async(req, res)=>{
    const product = await Product.find();
    if(!product){
        res.status(400).json('product not found');
    }
    res.status(200).json({
        success:true,
        product
    });
}

//get a single product
exports.getSingleProduct=async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(400).json('product not found');
    }
    res.status(200).json({
        success:true,
        product
    });
}

//update a product
exports.updateProduct=async(req, res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!product){
        res.status(400).json('product not found');
    }
    res.status(200).json({
        success:true,
        product
    });
}

//delete a product
exports.deleteProduct=async(req, res)=>{
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
        res.status(400).json('product not found');
    }
    res.status(200).json({
        success:true,
        message:'product delete successfully'
    })
}