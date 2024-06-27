const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productControllers");

//get all products
router.get("/", productController.getAllProducts);

//get product by ID
router.get("/:id", productController.getProductById);

//add a new product
router.post("/", productController.createProduct);

//update a product
router.put("/:id", productController.updateProduct);

//delete a product
router.delete("/:id", productController.deleteProduct);



module.exports = router;