const router = require('express').Router();
const users = require('../../controllers/users');

// you are here: /api/users

router
  .route('/')
    .get(users.getAllUsers)
    .post(users.createUser);

router
  .route('/:id')
    .get(users.getUserById)
    .put(users.updateUser)
    .delete(users.deleteUser);

router
  .route('/:userId/friends/:friendId')
    .post(users.addFriend)
    .delete(users.deleteFriend);

module.exports = router;
