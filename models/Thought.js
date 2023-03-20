const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const ReactionSchema = require('./Reaction');

const Schema = mongoose.Schema;

function dateFormat(date) {
  console.log(date);
}

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
});

const ThoughtModel = mongoose.model('thought', ThoughtSchema);

module.exports = ThoughtModel;
