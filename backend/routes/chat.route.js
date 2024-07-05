const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/chat.model');

const chatController=require('../contollers/chat.controller')
router.use(express.json())
router.use(express.urlencoded({extended:true}))

// Create new chat message
router.post('/',chatController.addMessage);

// Get unanswered questions (for support agents)
router.get('/unanswered', async (req, res) => {
    try {
        const unansweredQuestions = await ChatMessage.find({ answered: false });
        res.json(unansweredQuestions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get an individual users messages

router.get('/:username',chatController.getMessage);

router.get('/unanswered',chatController.getUnanswered);

router.put('/:id', chatController.updateMessage);

router.delete('/:id',chatController.deleteMessage);

module.exports = router;
