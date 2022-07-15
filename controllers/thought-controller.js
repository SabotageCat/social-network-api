const { Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.status(200).json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },
    // get a thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.status(200).json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // create a thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.status(201).json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },
    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this data!' });
            }
            res.status(200).json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.status(200).json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // create a reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.status(200).json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id! '});
            }
            res.status(200).json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;