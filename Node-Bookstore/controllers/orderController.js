const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// add function to remove confirmed orders from database

exports.createOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({
    items: req.body.items,
    total: req.body.total,
    user: req.user.email,
    phoneNumber: req.user.phonenumber,
    location: req.user.location,
  });
  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});
exports.getOrder = factory.getOne(Order);
exports.getAllOrders = factory.getAll(Order);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
