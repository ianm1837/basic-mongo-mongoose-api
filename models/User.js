const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [isEmail, 'Please enter a valid e-mail address'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
