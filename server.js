// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser'),
  // import modules
  db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



////////////////////
//  DATA
///////////////////







////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find(function(err, books) {
    if (err) {
      return console.log("index error: " + err);
    }
    res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  var bookId = req.params.id;

  // find book in db by id
  db.Book.findOne({ _id: bookId }, function(err, foundBook) {
    res.json(foundBook);
  });
});

// create new book
app.post('/api/books', function(req, res) {
  var newBook = new db.Book(req.body);

  newBook.save(function(err, savedBook) {
    res.json(savedBook);
  });
});

// update book
app.put('/api/books/:id', function(req,res){
// get book id from url params (`req.params`)
  console.log('books update', req.params);
  var bookId = req.params.id;
  // find the index of the book we want to remove
  db.Book.findOne({ _id: bookId}, function(err, foundBook) {
    // update attrs
    foundBook.title = req.body.title;
    foundBook.author = req.body.author;

    foundBook.save(function(err, saveBook) {
        res.json(saveBook);
    })
  })
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  var bookId = req.params.id;
  // find book in db by id and remove
  db.Book.findOneAndRemove({ _id: bookId }, function(err, deletedBook) {
    res.json(deletedBook);
  })
});







app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
