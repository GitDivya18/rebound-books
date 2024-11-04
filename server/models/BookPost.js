const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookPostSchema = new Schema({
  bookName: {
    type: String,
  },
  author: {
    type: String, // Added author field
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
});

const BookPost = mongoose.model('BookPost', bookPostSchema);

module.exports = BookPost;
