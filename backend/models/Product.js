const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  currentStock: {
    type: Number,
    required: true,
    default: 0
  },
  minThreshold: {
    type: Number,
    required: true,
    default: 5
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  ownerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);