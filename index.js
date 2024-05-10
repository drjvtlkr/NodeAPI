const express = require("express");
const mongoose = require("mongoose")
const Product = require('./model/productSchema')
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get(`/api/products`, async (req, res) =>{
  try {
    const products = await Product.find({});
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

app.get(`/api/product/:id`, async (req, res)=>{
  try {
    const {id} = req.params;
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message: error.messgae})
  }
})

app.post(`/api/products`, async (req, res) =>{
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.put(`/api/product/:id`, async(req,res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body)
    if(!product) {
      return res.status(404).json({message: "Product Not Found"})
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


app.delete(`/api/product/:id`, async(req,res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id)
    if(!product) {
      return res.status(404).json({message:"product not found"})
    }
    res.status(200).json({message: "Product delete successfully"})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

mongoose.connect("mongodb+srv://dheerajrvithalkar:GbqEvlHgevpcjDI6@backenddb.pogtn1t.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
  console.log("Connected to MongoDB")
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((err)=>{

  console.log(err)
})
