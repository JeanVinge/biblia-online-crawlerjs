// grab the things we need
var mongoose = require('mongoose');
var mongoose = require('Book');
var Schema = mongoose.Schema;

// create a schema
var TestamentSchema = new Schema({
  name: String,
  books: [Book]
});

// the schema is useless so far
// we need to create a model using it
var Testament = mongoose.model('Testament', TestamentSchema);

// make this available to our users in our Node applications
module.exports = Testament;
