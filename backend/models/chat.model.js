const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    answered: {
        type: Boolean,
        default: false
    },
    agent: {
        type:String,
        default:null
    },
    response:{
        type:String,
        default:null
    },
    responsetime:{
        type: Number,
        default:null
    }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
