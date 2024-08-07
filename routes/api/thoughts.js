const {Thought} = require('../../models');
const router = require('express').Router();


// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// GET thought by id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOne({_id: req.params.id});
        res.json(thought);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST a new thought
router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Update a thought by id
router.put('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({_id: req.params.id}, {$set:req.body}, {new: true});
        res.json(thought);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete a thought by id
router.delete('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({_id: req.params.id});
        res.json(thought);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.put('/:id/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({_id: req.params.id}, {$addToSet:{reactions:req.body}}, {new: true});
        res.json(thought);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.delete('/:id/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({_id: req.params.id}, {$pull:{reactions:{reactionId:req.params.id}}}, {new: true});
        res.json(thought);
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;