
const Ticket = require('../models/ticket.model');

// GET /api/tickets
async function getTickets(req, res) {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST /api/tickets
async function createTicket(req, res) {
  const { title, description } = req.body;

  try {
    const count = await Ticket.countDocuments({});
    const id = count + 1;

    const obj = { _id: id, title: title, description: description }; // Assuming 'Open' is the default status
    const ticket = new Ticket(obj);

    const newTicket = await ticket.save();
    console.log('Ticket Created:', newTicket);
    // Return the newly created ticket with its ID in the response
    res.status(201).json(newTicket);
  } catch (err) {
    console.error('Error Creating Ticket:', err);
    res.status(400).json({ message: err.message });
  }
}

/*async function createTicket(req, res) {
  const {  title, description, status } = req.body;
  const t = Ticket.find({})
  const id=t+1
  const obj={id,title,description,status}
  const ticket = new Ticket(obj);
  try {
    const newTicket = await ticket.save();
    console.log('Ticket Created:', newTicket);
    res.status(201).json(newTicket);
  } catch (err) {
    console.error('Error Creating Ticket:', err); 
    res.status(400).json({ message: err.message });
  }
}*/


/*Nodemon not crashes if uses this code*/
async function getTicketById(req, res) {
  try {
    const ticket = await Ticket.findById(parseInt(req.params.id));
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket Not Found' });
    }
    return res.status(200).json(ticket);
  } catch (err) {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Ticket Not Found' });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

/*GET /api/tickets/:id
async function getTicketById(req, res) {
  try {
    const ticket = await Ticket.findById(parseInt(req.params.id));
    if(!ticket){
      res.status(404).json({ message: 'Ticket Not Found' });
    }
    res.status(200).json(ticket);
    } 
    catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
      }
}*/

// PUT /api/tickets/:id
// PUT /api/tickets/:id
async function updateTicket(req, res) {
  const { title, description} = req.body;
  const ticketId = req.params.id; // Retrieve ticket ID from request parameters

  try {
    // Find the ticket by ID
    const ticket = await Ticket.findById(ticketId);
    // If ticket is not found, return error
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    // Update ticket properties if provided in request body
      ticket.status = 'Closed';
      ticket.resolutionTime = (new Date() - ticket.createdAt) / 1000;
    if (title) {
      ticket.title = title;
    }
    if (description) {
      ticket.description = description;
    }
    // Save the updated ticket
    const updatedTicket = await ticket.save();
    // Return the updated ticket
    res.json(updatedTicket);
  } catch (err) {
    // Handle any errors that occur during the update process
    res.status(400).json({ message: err.message });
  }
}


// DELETE /api/tickets/:id
async function deleteTicket(req, res) {
  const ticketId = parseInt(req.params.id);
  console.log('Deleting ticket:', ticketId);
  try {
    const ticket = await Ticket.findByIdAndDelete(ticketId);
    console.log('Found ticket:', ticket);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    console.log('Ticket deleted:', ticket);
    res.json({ message: 'Ticket deleted', ticket: ticket });
  } catch (err) {
    console.error('Error deleting ticket:', err);
    res.status(500).json({ message: err.message });
  }
}


const getOpenTickets = async (req, res) => {
  try {
    console.log(req.params.status)
    const openTickets = await Ticket.find({status:"Open"});
    console.log("Open Tickets:", openTickets); // Check if tickets are fetched
    if (!openTickets || openTickets.length === 0) {
      return res.status(404).json({ message: "No open tickets found" });
    }
    res.json(openTickets);
  } catch (err) {
    console.error("Error fetching open tickets:", err); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
  getOpenTickets
};