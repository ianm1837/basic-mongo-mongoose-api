const { User, Thought } = require('../models');

module.exports = {
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
      })
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.status(200).json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({
        path: 'reactions',
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.status(200).json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  async createThought(req, res) {
    try {

      let thought = await Thought.create(req.body);

      let user = await User.findOne({ username: req.body.username });

      user.thoughts.push(thought._id);

      let updatedUser = await user.save();

      res.status(200).json(updatedUser);

    }
    catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    ).then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.status(200).json(dbThoughtData);
    });
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        User.findOneAndUpdate(
          { username: dbThoughtData.username },
          { $pull: { thoughts: req.params.id } },
          { new: true }
        ).then((data) => {
          // console.log(data);
        });
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  
  async createReaction(req, res) {
    try{
      let thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true });

      let updatedThought = await thought.save();

      res.status(200).json(updatedThought);
    }
    catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async updateReaction(req, res) {

    console.log(req.body.reactionId)

    try{
      let thought = await Thought.findOneAndUpdate(
        { "_id": req.params.thoughtId ,"reactions._id": req.body.reactionId },
        { $set: { 'reactions.$.reactionBody': req.body.reactionBody } },
        { new: true }
        );

      res.status(200).json(thought);
    }
    catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async deleteReaction(req, res) {
    try{
      let thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.body.reactionId } } },
        { new: true }
        );

      res.status(200).json(thought);
    }
    catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
};  
