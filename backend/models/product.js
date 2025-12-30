const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

const product = mongoose.model('Product', productSchema);
module.exports = product;