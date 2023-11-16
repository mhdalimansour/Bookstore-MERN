const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'CartItem',
    },
  ],
  user: {
    type: String,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Cart', CartSchema);
