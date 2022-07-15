const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.status(200).json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get user by id
    getUserById({ params }, res) {
        User.findOne({ _id:params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'There is no user with this id!' });
            }
            res.status(200).json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create User
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.status(201).json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' })
            }
            res.status(200).json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.status(200).json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // add friend to user
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then (dbUserData => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.status(200).json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // remove friend from user
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.status(200).json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;