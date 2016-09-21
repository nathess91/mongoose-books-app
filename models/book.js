var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create book schema
var BookSchema = new Schema({
  title: String,
  author: String,
  image: String,
  releaseDate: String
});

// Create Book model from schema
var Book = mongoose.model('Book', BookSchema);

// Export Book from this module
module.exports = Book;
