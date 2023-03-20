const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
  reactionId: {
    type: mongoose.SchemaTypes.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

module.exports = ReactionSchema;
