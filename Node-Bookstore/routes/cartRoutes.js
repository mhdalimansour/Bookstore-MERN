const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/', cartController.viewCart);

router.patch('/update/:id', cartController.updateCart);

router.post('/new/:id', cartController.addBook);

router.delete('/deleteItem/:itemId', cartController.deleteItem);

router.delete('/clear-cart/:cartId', cartController.clearCart);
module.exports = router;
