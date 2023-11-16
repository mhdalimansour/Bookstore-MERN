const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const CartItem = require('../models/cartItemModel');

exports.addBook = catchAsync(async (req, res, next) => {
  const bookId = req.params.id;
  const cart = await Cart.findOne({ user: req.user.email }).populate('items');
  // eslint-disable-next-line no-plusplus
  let foundItemFlag = false;
  let newCartItem;
  for (let i = 0; i < cart.items.length; i += 1) {
    if (cart.items[i].book._id.valueOf() === bookId) {
      newCartItem = cart.items[i];
      foundItemFlag = true;
      break;
    }
  }
  if (!foundItemFlag) {
    newCartItem = new CartItem({ book: bookId, quantity: 1 });
    cart.items.push(newCartItem);
  } else {
    newCartItem.quantity += 1;
  }

  await newCartItem.save();
  await cart.save();

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

exports.viewCart = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Unauthorized'), 404);
  }
  const cart = await Cart.findOne({ user: req.user.email }).populate(
    'items',
    '-__v',
  );
  if (!cart) {
    return next(new AppError('cart not found', 404));
  }
  let total = 0;
  for (let i = 0; i < cart.items.length; i += 1) {
    total += cart.items[i].quantity * cart.items[i].book.price;
  }
  res.status(200).json({
    status: 'success',
    data: {
      id: cart._id,
      cart: cart.items,
      user: req.user.email,
      totalPrice: total,
    },
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const bookId = req.params.id;
  const { qty } = req.body;
  const cart = await Cart.findOne({ user: req.user.email }).populate('items');

  const inCart = cart.items.find((item) => item.book.equals(bookId));
  if (!inCart) {
    return next(new AppError('Book doesnt exist in cart'), 404);
  }
  inCart.quantity = qty;
  inCart.save();

  res.status(200).json({
    status: 'success',
    data: {
      inCart,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const item = await CartItem.findByIdAndDelete(req.params.itemId);
  if (!item) {
    return next(new AppError('Item not found'));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.cartId).populate('items');
  if (!cart) {
    return next(new AppError('Cart Not Found', 404));
  }

  cart.items = [];
  await cart.save();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
