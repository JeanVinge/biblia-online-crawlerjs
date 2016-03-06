// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var VerseSchema = new Schema({
  number: String,
  paragraph: String
});

// the schema is useless so far
// we need to create a model using it
var Verse = mongoose.model('Verse', VerseSchema);

// make this available to our users in our Node applications
module.exports = Verse;
