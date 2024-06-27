const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const getAllOrdersItem = async() => {
    return prisma.orderItems.findMany();
};

const getOrderItemsById = async (order_item_id) => {
    return prisma.orderItems.findUnique({
        where: {
            order_item_id: parseInt(order_item_id)
        }
    });
}; 

//adding the orderItems as an array 
const createOrdersItem = async(orderItemsData) => {
    return prisma.orderItems.create({
        data: {
            // order_id: orderItemsData.order_id,
            product_id: orderItemsData.product_id,
            quantity: orderItemsData.quantity,
            price: orderItemsData.price,
            }
    })
};

const updateOrdersItem = async(order_item_id, orderItemsData) => {
    try{
        const updatedOrdersItem = await prisma.orderItems.update({
            where: {order_item_id: parseInt(order_item_id)},
            data: orderItemsData, 
        });

        const orders = await prisma.orders.findUnique({
            where: {order_id: updatedOrdersItem.order_id},
            include: {orderItems: true}
        });

        if(!orders){
            throw new Error("Orders not Found");
        }

        const totalPrice = orders.orderItems.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);
        await prisma.orders.update({
            where: {order_id: updatedOrdersItem.order_id},
            data: {total_price: totalPrice},
        });
        return updatedOrdersItem

    } catch (error){
        throw new Error(`Error updating order item: ${error.message}`);
    }

};


module.exports = {
    getAllOrdersItem,
    getOrderItemsById,
    createOrdersItem,
    updateOrdersItem,
}
