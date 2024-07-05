const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/chat.model');
router.use(express.json())
router.use(express.urlencoded({extended:true}))

// Route handler for '/api/analytics/chat'
router.get('/', async (req, res) => {
    try {
        // Get total number of chats
        const totalChats = await ChatMessage.countDocuments();

        // Calculate average response time
        const chatMessages = await ChatMessage.find({ answered: true }); // Consider only answered messages
        const totalResponseTime = chatMessages.reduce((acc, msg) => acc + msg.responsetime, 0);
        const averageResponseTime = totalResponseTime / chatMessages.length;
        const answeredChats=chatMessages.length
        // Return analytics data
        res.json({
            totalChats,
            answeredChats,
            averageResponseTime
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});

module.exports = router;