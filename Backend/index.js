const express = require("express");
const app = express();
var cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

require("dotenv").config();


//middleware
app.use(express.json());

const categories = require("./routes/categories");
const products = require("./routes/products");
const auth = require("./routes/auth");
const str = require("./routes/stripe");
//mount
app.use("/api/v1", categories);
app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", str);

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("app is running successfully at",port);
})

const connectWithDb = require("./config/database");
connectWithDb();

// app.use('/',(req,res)=>{
//     res.send("<h1>pizza</h1>")
// })