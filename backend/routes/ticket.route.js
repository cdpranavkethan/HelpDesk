const express = require('express');
const router = express.Router();
const {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
  getOpenTickets
} = require('../contollers/ticket.controller');

// GET /api/tickets
router.get('/', getTickets);

// POST /api/tickets 
router.post('/', createTicket);

//GETOPEN /api/tickets/open
router.get('/open', getOpenTickets);

// GET /api/tickets/:id
router.get('/:id', getTicketById);

// PUT /api/tickets/:id
router.put('/:id', updateTicket);

// DELETE /api/tickets/:id
router.delete('/:id', deleteTicket);



module.exports = router;