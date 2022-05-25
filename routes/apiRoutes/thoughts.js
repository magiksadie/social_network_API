const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    updateThought,
    createThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughts');

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;