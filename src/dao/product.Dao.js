const Product = require('../models/products.models');

const productDao = {

    async product() {

    },
    async getAllProducts() {
        try {
            const products = await Product.find();
            // const product = await Product.paginate({}, {limit:3, page:1})
            return products;
        } catch (error) {
            console.error(error)
            throw new Error('Error fetching products');
        }
    },

    async getProductById(productId) {
        try {
            const product = await Product.findById(productId);
            return product;
        } catch (error) {
            throw new Error('Error fetching product by ID');
        }
    },

    async addProduct(newProductData) {
        try {
            const newProduct = new Product(newProductData);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error('Error adding product');
        }
    },

    async updateProduct(productId, updatedProductData) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
            if (!updatedProduct) {
                throw new Error('Product not found');
            }
            return updatedProduct;
        } catch (error) {
            throw new Error('Error updating product');
        }
    },

    async deleteProduct(productId) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                throw new Error('Product not found');
            }
            return;
        } catch (error) {
            throw new Error('Error deleting product');
        }
    },

    async getProductsByQuery(queryParams) {
        const { limit = 10, page = 1, sort = 'asc', query = '' } = queryParams;
        const skip = (page - 1) * limit;

        const filter = {};
        if (query) {
            // Agregar condiciones de búsqueda según tus necesidades
            filter.title = { $regex: query, $options: 'i' };
        }

        const sortOptions = {};
        if (sort === 'asc' || sort === 'desc') {
            sortOptions.price = sort === 'asc' ? 1 : -1;
        }

        try {
            const products = await Product.find(filter)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);
            return products;
        } catch (error) {
            throw new Error('Error fetching products by query');
        }

    }
}

module.exports = productDao;
