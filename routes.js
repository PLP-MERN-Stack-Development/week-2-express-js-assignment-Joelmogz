const Product = require('./product');
const express = require('express');
const {authenticate} = require('./auth'); // Assuming you have an auth middleware
const { validateProduct } = require('./validation'); // Assuming you have a validation middleware

const router = express.Router();
// Middleware to authenticate requests

router.use(authenticate);
// Create a new product
router.post('/', async (req, res) => {
    try {
        const lastProduct = await Product.findOne().sort({ _id: -1 }).exec();
        // Generate a new ID based on the last product's ID
        // If no products exist, start with ID 1
        const newId = lastProduct ? (parseInt(lastProduct.id) + 1).toString() : '1';


            const product = new Product({
        id: newId, // ✅ include the generated ID here
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).send({ error: 'Search query is required' });
        }
        const products = await Product.find({
            name: { $regex: q, $options: 'i' } // Case-insensitive search
        });
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Get product statistics
router.get('/stats', async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    averagePrice: { $avg: '$price' }
                }
            }
        ]);
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({id: req.params.id})
        if (!product) {
            return res.status(404).send();
        }
            res.send(product);

    } catch (error) {
        res.status(500).send(error);
    }
}, validateProduct);
// Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
          {id: req.params.id}, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).send();
        }
        res.send(product); 
    } catch (error) {
        res.status(500).send(error);
    }
});
// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({id: req.params.id});
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error)
    }
});
module.exports = router;    