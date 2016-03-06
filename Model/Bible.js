// grab the things we need
var mongoose = require('mongoose');
var mongoose = require('Testament');
var Schema = mongoose.Schema;

// create a schema
var BibleSchema = new Schema({
  name: String,
  idiom: String,
  version: String
  testament: [Testament]
});

// the schema is useless so far
// we need to create a model using it
var Bible = mongoose.model('Bible', BibleSchema);

// make this available to our users in our Node applications
module.exports = Bible;
