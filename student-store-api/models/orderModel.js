const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

//gets all orders plus its orderitems section
const getAllOrders = async() => {
    return prisma.orders.findMany({
        include:{
            orderItems: true
        }
    });
};

//get an order with its respective orderitems
const getOrderById = async (order_id) => {

    return prisma.orders.findUnique({
        where: {
            order_id: parseInt(order_id)
        },
        include: {
            orderItems: true
        }
    });
};


// Function to create a new order
const createOrder = async (orderData) => {
    const { customer_id, status, total_price } = orderData;
    return prisma.orders.create({
        data: {
            customer_id: parseInt(customer_id),
            status,
            total_price: parseFloat(total_price)
        },
        include: {
            orderItems: true  // Ensure orderItems are included when creating
        }
    });
};



//updates a new order
const updateOrder = async(order_id, orderData) => {
    return prisma.orders.update({
        where: {order_id: parseInt(order_id)},
        data: orderData
    });
};


//this code deletes an order, 
const deleteOrder = async (order_id) => {
    try {
        // Delete related orderItems first
        await prisma.orderItems.deleteMany({
            where: {
                order_id: parseInt(order_id)
            }
        });

        // Now delete the order itself
        const deletedOrder = await prisma.orders.delete({
            where: {
                order_id: parseInt(order_id)
            }
        });

        return deletedOrder;
    } catch (error) {
        throw new Error(`Error deleting order: ${error.message}`);
    }
};


const addItemsToOrder = async (order_id, orderItemsData) => {
    const createdOrderItems = [];

    for (const item of orderItemsData) {
        const createdItem = await prisma.orderItems.create({
            data: {
                order_id: parseInt(order_id),
                product_id: parseInt(item.product_id),
                quantity: parseInt(item.quantity),
                price: parseFloat(item.price),
            }
        });
        createdOrderItems.push(createdItem);
    }

    // Update total price after creating all order items
    await updateOrderTotalPrice(order_id);

    return createdOrderItems;
};



const updateOrderTotalPrice = async (order_id) => {
    const order = await prisma.orders.findUnique({
        where: { order_id: parseInt(order_id) },
        include: { orderItems: true }
    });

    if (!order) {
        throw new Error("Order not found");
    }

    const totalPrice = order.orderItems.reduce((total, item) => {
        return total + (item.quantity * item.price);
    }, 0);

    // Update the order with the new total_price
    await prisma.orders.update({
        where: { order_id: parseInt(order_id) },
        data: { total_price: totalPrice }
    });

    return totalPrice;
};



//const calculateOrderTotal

const calculateOrderTotal = async(order_id) => {
    //finds the order with order_id and include 
    const order = await prisma.orders.findUnique({
        where: {order_id: parseInt(order_id)},
        include: {orderItems: true}
    });

    if(!order){
        throw new Error("Order not found");
    }

    const totalPrice = order.orderItems.reduce((total, item) => {
        return total + (item.quantity * item.price)
    }, 0);

    return totalPrice;
    
}

module.exports ={
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    addItemsToOrder,
    calculateOrderTotal,
    updateOrderTotalPrice,
    
};