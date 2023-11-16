const mongoose = require('mongoose');

const CartItemSchema = mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});
CartItemSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'book',
    select: '-__v',
  });
  next();
});
module.exports = mongoose.model('CartItem', CartItemSchema);
