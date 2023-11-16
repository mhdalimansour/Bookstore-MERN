const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/confirm-order')
  .post(bookController.sellBooks, orderController.createOrder);

router.use(authController.restrictTo('admin'));

router.route('/').get(orderController.getAllOrders);

router
  .route('/:orderId')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
