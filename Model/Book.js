// grab the things we need
var mongoose = require('mongoose');
var mongoose = require('Chapter');
var Schema = mongoose.Schema;

// create a schema
var BookSchema = new Schema({
  name: String,
  abbreviation: String,
  number_of_chapters: String
  chapters: [Chapter]
});

// the schema is useless so far
// we need to create a model using it
var Book = mongoose.model('Book', BookSchema);

// make this available to our users in our Node applications
module.exports = Book;
