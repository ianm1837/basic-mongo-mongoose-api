const { User, Thought } = require('../models');

module.exports = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
      })
      .sort({ _id: -1 })
      .then((dbUserData) => res.status(200).json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      }
      );
  },

  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: 'thoughts',
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.status(200).json(dbUserData);
      }
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      }
      );
  },

  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.status(200).json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      }
      );
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      
      { $set: req.body },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.status(200).json(dbUserData);
      }
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      }
      );
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.status(200).json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      }
      );
  },
  
  addFriend(req, res) {

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!', });
          return;
        }
        res.status(200).json(dbUserData);
      }
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      }
      );
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, 
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.status(200).json(dbUserData);
      }
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      }
      );
  },
};
