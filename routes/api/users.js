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

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id}).populate(['thoughts', 'friends']);
        res.json(user);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

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


module.exports = router;