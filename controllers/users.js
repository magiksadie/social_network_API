const { User, Thought } = require('../models/index');

const userController = {
    //Get all users
    getAllUsers: (req, res) => {
        User.find({})
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //Get a user by id
    getUserById: (req, res) => {
        User.findById(req.params.id)
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .then(dbUserData => {
            if (!dbUserData) {
                res.json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //Create a user
    createUser: (req, res) => {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //Update a user
    updateUser: (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //Delete a user and all of their thoughts
    deleteUser: (req, res) => {
        User.findByIdAndDelete(req.params.id)
        .then(dbUserData => {
            Thought.deleteMany({ user: req.params.id })
            .then(dbThoughtData => {
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //Add a friend to a user
    addFriend: (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { $push: { friends: req.body.friend } }, { new: true })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //Remove a friend from a user
    removeFriend: (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: req.body.friend } }, { new: true })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }
};

module.exports = userController;