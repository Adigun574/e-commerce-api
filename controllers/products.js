const Product = require("../models/product")
const User = require("../models/user")

const getProducts = async (req,res) => {
    try{
        let foundProducts = await Product.find()
        res.status(200).json({success: true, msg: 'products fetched successfully', data : foundProducts})
    } catch{
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
}

const createProducts = async (req,res) => {
    try{
        let products = await Product.insertMany(req.body)
        res.status(200).json({success: true, msg: 'products created successfully', data : products})
    } catch{
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
}

const addToCart = async (req,res) => {
    try{
        const userId = req.params.userId
        let updatedUser = await User.findOneAndUpdate({_id:userId}, {cart:req.body})
        res.status(200).json({success: true, msg: 'products added to cart successfully', data : updatedUser})
    } catch{
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
}

module.exports = {
    getProducts,
    createProducts,
    addToCart
}