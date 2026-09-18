const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path=require("path");
const Product = require("./models/product");
const methodOverride = require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

//req.body=>>take from user submit so write
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


main()
    .then(()=>{
        console.log("connection successful");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
}



//INDEX ROUTE
app.get("/products", async (req,res)=>{
    let products = await Product.find();
    console.log(products);
    res.render("index.ejs",{products});
    // res.send("working");
});

//New Route
app.get("/products/new",(req,res)=>{
    res.render("new.ejs");
})

//create Route
app.post("/products",(req,res)=>{
    let {description,price,name} = req.body;
    let newProduct = new Product({
        description:description,
        price:price,
        name:name
    });
    newProduct
        .save()
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        res.redirect("/products");
});

//edit route
app.get("/products/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let product=await Product.findById(id);
    res.render("edit.ejs",{product});
})

//update route
app.put("/products/:id",async (req,res)=>{
    let {id} = req.params;
    let {price:newPrice} =req.body;
    console.log(newPrice);
    let updatedProduct = await Product.findByIdAndUpdate(
        id,
        {price:newPrice},
        {runValidators:true,new:true}
    );
    console.log(updatedProduct);
    res.redirect("/products");
});


//destroy route
app.delete("/products/:id/delete",async (req,res)=>{
    let {id} = req.params;
    let deletedChat = await Product.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/products");
});


//search route
app.get("/products/search",async (req,res)=>{
   let search = req.query.search;
   console.log("Search:", search);
   let products;
   if(search) {
    products =await Product.find({
        name:{$regex: search, $options:"i"}
    });
   }else{
    products= await Product.find();
   }
   console.log("Products:", products);

   res.render("index.ejs",{products});


});

//Filter Route
app.get("/products/filter", async (req,res)=>{
     let filter = req.query.category;
    let products;
    if (filter) {
        products = await Product.find({
            category: filter
        });
    } else {
        products = await Product.find();
    }
    res.render("index.ejs", { products });
    // let filter=req.query.category;
    // let products = await Product.find({
    //     category:filter
    // })
    // res.render("index.ejs",{products});
})


app.get("/",(req,res)=>{
    res.send("server is working");
})


app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})