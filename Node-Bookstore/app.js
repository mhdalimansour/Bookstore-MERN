const express = require('express');
const morgan = require('morgan');
// const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const AppError = require('./utils/appError');
const bookRouter = require('./routes/booksRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
// 1) GLOBAL MIDDLEWARES
app.use(cors({ origin: 'http://localhost:3000' }));
// Set secuirity http headers
app.use(helmet());

// development logginf
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many requests!\nTry again in an hour.',
});
app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// data sanitization against NoSQL injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// prevent parameter polution // add more to whitelist
app.use(
  hpp({
    whitelist: ['duration', 'price'],
  }),
);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.get('/', (req, res) => {
  res.status(200).render('base');
});

app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

// this code will not be reached if we find the route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error handeling
app.use(globalErrorHandler);

module.exports = app;
