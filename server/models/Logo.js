var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  user: String,
  text: { type: String, trim: true, minlength: 0 },
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 0, max: 30 },
  borderWidth: { type: Number, min: 0, max: 30 },
  padding: { type: Number, min: 0, max: 30 },
  margin: { type: Number, min: 0, max: 30 },
  width: { type: Number, min: 100, max: 700 },
  height: { type: Number, min: 100, max: 1000 },
  textX: { type: Number, min: 0, max: 700 },
  textY: { type: Number, min: 0, max: 1000 },
  imageX: { type: Number, min: 0, max: 700 },
  imageY: { type: Number, min: 0, max: 1000 },
  imageWidth: { type: Number, min: 0, max: 700 },
  imageHeight: { type: Number, min: 0, max: 1000 },
  url: { type: String },
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);