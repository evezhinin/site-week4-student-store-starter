const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Function gets all the products 
//Filtering and sorting 
const getAllProducts = async(filter = {}, orderBy = {}) => {
    return prisma.products.findMany({
        where: filter,
        orderBy: orderBy,
    });
};

//Function gets all the products by Id 

const getProductById = async (id) => {
    return prisma.products.findUnique({ 
        where: { 
            id: parseInt(id) 
        }
    });
};

//Function create a new product 
const createProduct = async(productData) => {
    return prisma.products.create({
        data: productData
    });
};

//Function update a product 
const updateProduct = async(id, productData) => {
    return prisma.products.update({
        where: {id: parseInt(id) },
        data: productData
    });
};

//Function delete a product
const deleteProduct = async (id) => {
    return prisma.products.delete({
        where: {id: parseInt(id) }
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};



