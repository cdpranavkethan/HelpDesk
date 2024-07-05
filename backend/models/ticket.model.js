const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
  resolutionTime:{type:Number,default:null},
  createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Ticket', ticketSchema);
