const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'CartItem',
    },
  ],
  location: String,
  total: {
    type: Number,
    required: true,
  },
  dateCompleted: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'items',
    select: '-__v',
  });
  next();
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
