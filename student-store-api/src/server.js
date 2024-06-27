require("dotenv").config()
const express = require('express')
const app = express()
const PORT = 3000
const cors = require("cors");
const morgan = require("morgan");

//importing routes
const productRoutes = require("../Routes/productRoutes");
const orderRoutes = require("../Routes/orderRoute")
const orderItemsRoutes = require("../Routes/orderItemsRoutes")

//app.use(cors()); // Enable CORS middleware to handle cross-origin requests
// app.use(morgan("dev"));
//lets you send json responses and also acept requests in json 
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));



app.get('/', (req, res) => {
    res.send('Hello from student store backend!')
})

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/orderItems", orderItemsRoutes);




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


