const mongoose = require("mongoose");
const Product = require("./models/product.js");

main()
.then(()=>{
    console.log("connecion succesful");
})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
}


let allProducts = [

    {
        name: "Laptop",
        price: 55000,
        category: "Electronics",
        description: "A powerful laptop for work, coding and entertainment",
        stock: 15
    },

    {
        name: "Smartphone",
        price: 25000,
        category: "Electronics",
        description: "A modern smartphone with a high-quality camera",
        stock: 30
    },

    {
        name: "Wireless Headphones",
        price: 3500,
        category: "Accessories",
        description: "Comfortable wireless headphones with clear sound",
        stock: 50
    },

    {
        name: "Running Shoes",
        price: 2200,
        category: "Footwear",
        description: "Lightweight running shoes suitable for daily workouts",
        stock: 25
    },

    {
        name: "Backpack",
        price: 1200,
        category: "Bags",
        description: "Durable backpack with multiple compartments",
        stock: 40
    },

    {
        name: "Smart Watch",
        price: 4500,
        category: "Electronics",
        description: "Smart watch with fitness tracking and notifications",
        stock: 20
    }

];

Product.insertMany(allProducts);