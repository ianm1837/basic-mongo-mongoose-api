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

  createThought(req, res) {
    Thought.create(req.body).then((dbThoughtData) => {
      res.status(200).json(dbThoughtData._id);
    });
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
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};
