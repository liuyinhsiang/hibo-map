const mongoose = require('mongoose');
const slugify = require('slugify');
const { Schema } = mongoose;
// const locationSchema = require('./Location');

const MapSchema = new Schema({
  title: { type: String, required: [true, 'Please add a title'] },
  // locations: [locationSchema],
  placeIds: [String],
  slug: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  modifyAt: { type: Date, default: Date.now },
  access: {
    type: String,
    enum: ['public', 'private'],
    default: 'private',
  },
});

MapSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Map', MapSchema);
