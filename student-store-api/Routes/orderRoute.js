const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");
//get all orders
router.get("/", orderController.getAllOrders);
//get order by Id 
router.get("/:order_id", orderController.getOrderById);
//add a new order
router.post("/", orderController.createOrder);
//update a new order
router.put("/:order_id", orderController.updateOrder);
//delete a order 
router.delete("/:order_id", orderController.deleteOrder);

router.post("/:order_id/items", orderController.addItemsToOrder)
router.get("/:order_id/total", orderController.calculateOrderTotal)

module.exports = router;
