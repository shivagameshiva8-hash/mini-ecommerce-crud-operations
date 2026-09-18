const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
    },
    description:{
        type:String
    },
    stock:{
        type:Number
    }
});

const Product = mongoose.model("product",productSchema);

module.exports = Product;