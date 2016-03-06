// grab the things we need
var mongoose = require('mongoose');
var mongoose = require('Verse');
var Schema = mongoose.Schema;

// create a schema
var ChapterSchema = new Schema({
  title: String,
  verses: [Verse]
});

// the schema is useless so far
// we need to create a model using it
var Chapter = mongoose.model('Chapter', ChapterSchema);

// make this available to our users in our Node applications
module.exports = Chapter;
