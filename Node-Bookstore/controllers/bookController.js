const Book = require('../models/bookModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Cart = require('../models/cartModel');
const AppError = require('../utils/appError');

exports.createBook = factory.createOne(Book);
exports.getAllBooks = factory.getAll(Book);
// exports.getBook = factory.getOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);

function isISBN(id) {
  return /^[0-9]{13}$/.test(String(id)); // 12 digits, no dashes or other characters
}

function isID(id) {
  return /^[0-9]+$/.test(id);
}

function isSlug(id) {
  return /^[a-zA-Z0-9-]+$/.test(id);
}

exports.getBook = catchAsync(async (req, res, next) => {
  const identifier = req.params.id;
  let book = {};
  if (isISBN(identifier)) {
    book = await Book.findOne({ isbn: req.params.id });
  } else if (isID(identifier)) {
    book = await Book.findById(req.params.id);
  } else if (isSlug(identifier)) {
    book = await Book.findOne({ slug: req.params.id });
  }
  if (!book) {
    return next(new AppError('No document found with this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: book,
    },
  });
});

exports.sellBooks = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.body.cart).populate('items');
  if (!cart) {
    return next(new AppError('Cart Not Found', 404));
  }

  for (let i = 0; i < cart.items.length; i += 1) {
    const boughtQuantity = cart.items[i].quantity;
    const { book } = cart.items[i];
    if (book.quantity - boughtQuantity <= 0) {
      return next(new AppError('Not Enough Books', 400));
    }

    book.quantity -= boughtQuantity;
    // eslint-disable-next-line no-await-in-loop
    await book.save();
  }
  await cart.save();
  next();
});
