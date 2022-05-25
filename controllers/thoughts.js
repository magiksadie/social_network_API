const { User, Thought } = require('../models/index');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
};

getThoughtById = (req, res) => {
    Thought.findOne({ _id: req.params.id })
    .populate({
        path: "reactions",
        select: "-__v",
    })
    .select("-__v")
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
};

createThoughts = (req, res) => {
    Thought.create({
        user: req.body.user,
        content: req.body.content,
    })
    .then(dbThoughtData => {
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
};

updateThought = (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(dbThoughtData => {
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
};

deleteThought = (req, res) => {
    Thought.findOneAndRemove({ _id: req.params.id })
    .then(dbThoughtData => {
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
};

createReaction = (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true })
    .then(dbThoughtData => {
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
};

deleteReaction = (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true })
    .then(dbThoughtData => {
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
};

module.export = thoughtController;