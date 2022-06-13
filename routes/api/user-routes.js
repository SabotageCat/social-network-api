const router = require('express').Router();

// /api/users
router
.route('/')
.get()
.post();

// /api/users/:userId
router
.route('/:id')
.get()
.put()
.delete();

// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post()
.delete();

module.exports = router;