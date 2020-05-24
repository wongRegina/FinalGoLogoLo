var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema({
    textId: String,
    text: {type:String,trim: true, minlength: 0},
    color: String,
    fontSize: { type: Number, min: 2, max: 144 },
    x: {type: Number, min: 0},
    y: {type: Number, min: 0},
    lastClicked: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Text', TextSchema);