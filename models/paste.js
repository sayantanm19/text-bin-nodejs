var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var pasteSchema = new Schema({
    idx: String,
    paste: String,
    date: Date,
    title: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('paste', pasteSchema);