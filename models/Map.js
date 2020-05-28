const mongoose = require('mongoose');
const { Schema } = mongoose;
const locationSchema = require('./Location');

const mapSchema = new Schema({
  title: { type: String, required: [true, 'Please add a title'] },
  locations: [locationSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  modifyAt: { type: Date, default: Date.now },
});

mongoose.model('maps', mapSchema);
