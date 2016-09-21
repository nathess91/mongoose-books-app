var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app");

// Import and export Book model
module.exports.Book = require('./book.js');
