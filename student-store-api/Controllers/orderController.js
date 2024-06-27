const orderModel = require("../models/orderModel")

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.status(200).json(orders);
    } catch(error){
        res.status(400).json({ error: error.message });
    };
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderModel.getOrderById(req.params.order_id);
        if (order){
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch(error){
        res.status(400).json({ error: error.message });
    }
}

const createOrder = async (req, res) => {
  console.log("order created", req.body)
    try {
      const newOrder= await orderModel.createOrder(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};


const updateOrder = async (req, res) => {
    try {
      //new line
      const order_id = req.params.order_id
      const updatedOrder = await orderModel.updateOrder(req.params.order_id, req.body);
      //new line
      await orderModel.updateOrderTotalPrice(req.params.order_id);
      if (updatedOrder) {
        res.status(200).json(updatedOrder);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
      const deletedOrder = await orderModel.deleteOrder(req.params.order_id);
      if (deletedOrder) {
        res.status(200).json(deletedOrder);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //Post request to add items to an existing order identofied by order_id
const addItemsToOrder = async (req, res) => {
    try {
        const order_id = req.params.order_id;
        //get the data from request body 
        const orderItemsData = req.body.items;//maybe change orderItems to items
        //console.log(orderItemsData, req.body)
        //call the orderModel to add items to the order
        const newOrderItems = await orderModel.addItemsToOrder(order_id, orderItemsData);

        res.status(200).json(newOrderItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//handles get request to calcualte and return the total price of an order_id
const calculateOrderTotal = async (req, res) => {
  try {
      const order_id = req.params.order_id;

      //calls the orderModel to calculate the total price of the order
      const totalPrice = await orderModel.calculateOrderTotal(order_id);

      res.status(200).json({total_price: totalPrice});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

  module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    addItemsToOrder,
    calculateOrderTotal,
};