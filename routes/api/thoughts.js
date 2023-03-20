const router = require('express').Router();
const thoughts = require('../../controllers/thoughts');

// you are here: /api/thoughts

router
  .route('/')
    .get(thoughts.getAllThoughts)
    .post(thoughts.createThought);

router
  .route('/:id')
    .get(thoughts.getThoughtById)
    .put(thoughts.updateThought)
    .delete(thoughts.deleteThought);

router
  .route('/:thoughtId/reactions')
    .post(thoughts.createReaction)
    .put(thoughts.updateReaction)
    .delete(thoughts.deleteReaction);

module.exports = router;
