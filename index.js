const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/productSchema");
const app = express();
const productRoute = require("./routes/productRoute");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(`/api/products`, productRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

mongoose
  .connect(
    "mongodb+srv://dheerajrvithalkar:GbqEvlHgevpcjDI6@backenddb.pogtn1t.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
