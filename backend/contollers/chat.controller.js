const ChatMessage = require('../models/chat.model');



async function addMessage (req, res) {
    try {
        const newMessage =await ChatMessage.create(req.body);
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getMessage (req, res){
    try {
        const { username } = req.params;
        const customerMessages = await ChatMessage.find({ sender: username });
        res.json(customerMessages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateMessage(req, res){
    try {
        const { id } = req.params;
        const { agent, response } = req.body;
    
        // Get current timestamp
        const currentTime = new Date();

        // Find the chat message by ID
        const message = await ChatMessage.findById(id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Update the chat message fields
        message.answered = true;
        message.agent = agent;
        message.responsetime = (currentTime - message.timestamp) / 1000; // Calculate response time in seconds
        message.response = response;

        // Save the updated message
        await message.save();

        res.status(200).json({ message: 'Message updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteMessage(req,res){
    try {
        const { id } = req.params;
        const message = await ChatMessage.findByIdAndDelete(id);
        if(!message){
            return res.status(404).json({message:'Message not found'});
        }
        res.status(200).json({message:'Message deleted successfully'});
    } catch(err){
        res.status(500).json({message:err.message});
    }
}

async function getUnanswered(req,res){
    try{
        const messages = await ChatMessage.find({answered:false});
        res.status(200).json(messages);

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
module.exports={addMessage,getMessage,getUnanswered,updateMessage,deleteMessage}