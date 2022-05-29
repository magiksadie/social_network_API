const { User, Thought } = require("../models");

const userController = {
  // Get a single User by their id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .then((dbUserData) => {
            if (!dbUserData) {
            res
                .status(404)
                .json({ message: "Sorry, No user was found with this ID!" });
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Get all Users
    getAllUsers(req, res) {
        User.find({})
        // added this 4/28
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // Create a User
    createUser({ body }, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.json(err));
    },
    // Update User by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
        })
        .then((dbUserData) => {
            if (!dbUserData) {
            res.status(404).json({ message: "No user was found with this ID!" });
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    // Delete a User & their associated Thoughts
    deleteUser({ params }, res) {
        Thought.deleteMany({ userId: params.id })
        .then(() => {
            User.findOneAndDelete({ userId: params.id }).then((dbUserData) => {
            if (!dbUserData) {
                res
                .status(404)
                .json({ message: "Sorry, no user was found with that ID!" });
                return;
            }
            res.json(dbUserData);
            });
        })
        .catch((err) => res.json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
            res
                .status(404)
                .json({ message: "Sorry, no user was found with this ID!" });
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
            res
                .status(404)
                .json({ message: "Sorry, no user was found with that ID!" });
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
};

module.exports = userController;