const express = require("express");
const router = express.Router();
const orderItemsController = require("../Controllers/orderItemsController");

//get all orders
router.get("/", orderItemsController.getAllOrdersItem);
//get order by Id 
router.get("/:order_item_id", orderItemsController.getOrderItemsById);
//add a new order
router.post("/", orderItemsController.createOrdersItem);
router.put("/:order_item_id", orderItemsController.updateOrdersItem);


module.exports = router;
