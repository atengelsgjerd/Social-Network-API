const {User} = require('../../models');


const router = require('express').Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).populate(['thoughts', 'friends']);
        res.json(users);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id}).populate(['thoughts', 'friends']);
        res.json(user);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({_id: req.params.id}, {$set:req.body}, {new: true});
        res.json(user);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.id});
        res.json(user);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const {userId, friendId } = req.params;
        if (userId === friendId) {
            return res.status(400).json({message: "You can't be friends with yourself!"});
        }
        const friend = await User.findOne({_id: friendId});
        if (!friend) {
            res.status(404).json({message: "Friend not found!"});
            return;
        }
        const user = await User.findOneAndUpdate(
            {_id: userId},
            {$addToSet: {friends: friendId}},
            {new: true}
        ).populate('friends');
        if (!user) {
            res.status(404).json({message: "User not found!"});
            return;
        }
        res.status(200).json(user);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const {userId, friendId } = req.params;
        const user = await User.findOneAndUpdate(
            {_id: userId},
            {$pull: {friends: friendId}},
            {new: true}
        ).populate('friends');
        if (!user) {
            res.status(404).json({message: "User not found!"});
            return;
        }
        res.status(200).json(user);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;