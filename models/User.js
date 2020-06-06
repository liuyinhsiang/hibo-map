const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
  signInChannel: {
    type: String,
    enum: ['google', 'local'],
  },
  googleId: {
    type: String,
    required: [
      function () {
        return this.signInChannel === 'google';
      },
      'Please use googleId',
    ],
  },
  displayName: {
    type: String,
    required: [true, 'Please add a displayName'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [
      function () {
        return this.signInChannel === 'local';
      },
      'Please add a password',
    ],
    minlength: 6,
    select: false,
  },
  // resetPasswordToken: String,
  // resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Cascade delete maps when a user is deleted
UserSchema.pre('remove', async function (next) {
  await this.model('Map').deleteMany({ user: this._id });
  next();
});

// Reverse populate with virtual
UserSchema.virtual('maps', {
  ref: 'Map',
  localField: '_id',
  foreignField: '_user',
  justOne: false,
});

module.exports = mongoose.model('User', UserSchema);
