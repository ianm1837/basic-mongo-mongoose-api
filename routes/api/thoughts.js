const router = require('express').Router();
const thoughts = require('../../controllers/thoughts');

// you are here: /api/thoughts

//prettier-ignore
router.route('/')
  .get(thoughts.getAllThoughts)
  .post(thoughts.createThought);

router
  .route('/:id')
  .get(thoughts.getThoughtById)
  .put(thoughts.updateThought)
  .delete(thoughts.deleteThought);
