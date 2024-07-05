const mongoose = require('mongoose')

const agentSchema=new mongoose.Schema({
    name:String,
    ticketsResolved:Number,
    customerSatisfaction:Number
});

module.exports = mongoose.model('agentSchema',agentSchema)