const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: [280, 'Thought must be 280 characters or less'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        },
    ],
});

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: [280, 'Reaction must be 280 characters or less'],
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => dateFormat(createdAt),
    },
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

ThoughtSchema.virtual('reactionsCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;