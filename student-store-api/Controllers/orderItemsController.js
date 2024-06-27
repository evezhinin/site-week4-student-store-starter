const orderItemsModel = require("../models/orderItemsModel")

const getAllOrdersItem = async (req, res) => {
    try{
        const orderItems = await orderItemsModel.getAllOrdersItem();
        res.status(200).json(orderItems);

    } catch(error){
        res.status(400).json({ error: error.message });
    };
}

const getOrderItemsById = async (req, res) => {
    try {
        const orderItems = await orderItemsModel.getOrderItemsById(req.params.order_item_id);
        if (orderItems){
            res.status(200).json(orderItems);
        } else {
            res.status(404).json({ error: "Order items not found" });
        }
    } catch(error){
        res.status(400).json({ error: error.message });
    }
}

const createOrdersItem = async (req, res) => {
    try {
      const newOrderItems= await orderItemsModel.createOrdersItem(req.body);
      res.status(201).json(newOrderItems);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const updateOrdersItem = async (req, res) => {
    try {
        const { order_item_id } = req.params;
        const updatedData = req.body;

        const updatedOrderItem = await orderItemsModel.updateOrdersItem(order_item_id, updatedData);
        res.status(200).json(updatedOrderItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports ={
    getAllOrdersItem,
    getOrderItemsById,
    createOrdersItem,
    updateOrdersItem,
}