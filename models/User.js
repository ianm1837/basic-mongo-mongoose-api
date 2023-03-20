const { Schema, SchemaTypes , model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');

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
    validate: {
      validator: isEmail,
      message: 'Please enter a valid e-mail address',
    },
  },
  thoughts: [SchemaTypes.ObjectId],
  friends: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  ],
});

const userModel = model('user', UserSchema);

module.exports = userModel;
