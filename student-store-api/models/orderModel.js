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
    //new code
//   const price = await getTotal(order_id);
//   console.log(price);
//   const t = await prisma.orders.update({
//     where: { order_id: parseInt(order_id) },
//     data: {
//       total_price: price,
//     }
//   });
    return prisma.orders.findUnique({
        where: {
            order_id: parseInt(order_id)
        },
        include: {
            orderItems: true
        }
    });
};

//creates a new order
const createOrder = async(orderData) =>{
    //console.log(orderData);
    return prisma.orders.create({
        data: orderData
        
    });
};

//updates a new order
const updateOrder = async(order_id, orderData) => {
    return prisma.orders.update({
        where: {order_id: parseInt(order_id)},
        data: orderData
    });
};

//deletes a order
// const deleteOrder = async(order_id) => {
//     return prisma.orders.delete({
//         where: { order_id: parseInt(order_id)}
//     })
// }

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

//const addItemstoOrder
//old version
// const addItemsToOrder = async(order_id, orderItemsData) =>{
//     const createOrderItems = orderItemsData.map(item => {
//         return prisma.orderItems.create({
//             data:{
//                 order_id: parseInt(order_id),
//                 product_id: item.product_id,
//                 quantity: item.quantity,
//                 price: item.price,
//             }
//         });
//     });
//     return Promise.all(createOrderItems)
// };

const addItemsToOrder = async (order_id, orderItemsData) => {
    console.log(orderItemsData)
    const createdOrderItems = [];

    for (const item of orderItemsData) {
        const createdItem = await prisma.orderItems.create({
            data: {
                order_id: parseInt(order_id),
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
            }
        });
        createdOrderItems.push(createdItem);
    }
    //recalculating and updating total_price
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
    
};

