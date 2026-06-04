const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const app = express();

const PORT = 5050;

// This MUST be at the top so Express knows how to read JSON bodies!
app.use(express.json());

// Connect to MongoDB using the direct local IP address
mongoose.connect('mongodb://127.0.0.1:27017/kirana-tracker')
  .then(() => console.log('🔌 Connected to MongoDB safely!'))
  .catch((err) => console.error('❌ Database connection error:', err));

// Core Homepage Route
app.get('/', (req, res) => {
  return res.send('🚀 Kirana Inventory Backend is up and running perfectly!');
});

// Add a product route
app.post('/api/products', async (req, res) => {
  try {
    const { name, currentStock, minThreshold, price, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Name and price are required!' });
    }

    const newProduct = new Product({
      name,
      currentStock,
      minThreshold,
      price,
      category
    });

    await newProduct.save();
    return res.status(201).json({ success: true, message: '📦 Product added successfully!', data: newProduct });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Get all products route
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetches everything from your collection
    return res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Update a product by ID (e.g., updating stock or price)
app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // returns the updated version instead of the old one
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found!' });
    }

    return res.status(200).json({ success: true, message: '🔄 Product updated successfully!', data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a product by ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found!' });
    }

    return res.status(200).json({ success: true, message: '🗑️ Product removed from inventory!' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is actively running on: http://localhost:${PORT}`);
});