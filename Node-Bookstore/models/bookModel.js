const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: [true, 'Book must have an ISBN'],
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Book must have a title'],
    },
    author: String,
    genre: {
      type: [String],
    },
    description: {
      type: String,
    },
    imageCover: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      defualt: 1,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
      set: (value) => Math.round(value * 10) / 10,
    },
    numRatings: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
      required: [true, 'Book must have a price'],
    },
    copiesSold: {
      type: Number,
      default: 0,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

bookSchema.index({ price: 1 });
bookSchema.index({ slug: 1 });

bookSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
bookSchema.pre('save', function (next) {
  this.imageCover = `${this.isbn}.png`;
  next();
});

bookSchema.pre('save', function (next) {
  this.isbn = this.isbn.replace(/-/g, '');
  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
