const router = require('express').Router();
const {
    getUserById,
    createUser,
    updateUser,
    getAllUsers,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../controllers/users');

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id/friends').post(addFriend).delete(removeFriend);

module.exports = router;