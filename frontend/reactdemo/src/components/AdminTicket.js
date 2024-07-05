import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Admin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [fetchedTicket, setFetchedTicket] = useState(null);
  const [deleteStatusMessage, setDeleteStatusMessage] = useState('');
  const [showSubmittedStatus, setShowSubmittedStatus] = useState(true);
  const [showFetchedTicketDetails, setShowFetchedTicketDetails] = useState(true);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [fetchTicketStatus, setFetchTicketStatus] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false); // New state to control update form visibility
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalDescription, setOriginalDescription] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);
  const token=localStorage.getItem('token')
  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tickets',
      {headers: { Authorization: `Bearer ${token}` }});
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleGetTicketDetails = async (id) => {
    setTicketId(id);
    try {
      const response = await axios.get(`http://localhost:3001/api/tickets/${id},`,{headers: { Authorization: `Bearer ${token}` }});
      if (response.status === 200) {
        console.log('Ticket details:', response.data);
        setFetchedTicket(response.data);
        setUpdateTitle(response.data.title);
        setUpdateDescription(response.data.description);
        setOriginalTitle(response.data.title); // Set original title
        setOriginalDescription(response.data.description); // Set original description
        setShowFetchedTicketDetails(true);
        setFetchTicketStatus('found');
      } else {
        console.error('Ticket not found');
        setFetchTicketStatus('not-found');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Ticket not found');
        setFetchTicketStatus('not-found');
      } else {
        console.error('Error retrieving ticket details:', error);
        setFetchTicketStatus('error');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/tickets', { title, description },{headers: { Authorization: `Bearer ${token}` }});
      const newTicketId = response.data._id;
      console.log('New ticket ID:', newTicketId);
      setSubmittedTicket(response.data);
      await fetchTickets();
      setTitle('');
      setDescription('');
      setShowSubmittedStatus(true);
    } catch (error) {
      console.error('Error submitting ticket:', error);
    }
  };

  const handleRemoveTicket = async (ticketId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/tickets/${ticketId}`,{headers: { Authorization: `Bearer ${token}` }});
      console.log('Response:', response); // Log the response for debugging
      if (response.status === 200) {
        setTickets(tickets.filter(ticket => ticket._id !== ticketId));
        setDeleteSuccessMessage(`Ticket with ID ${ticketId} deleted successfully.`);
        setFetchedTicket(null); // Clear fetched ticket details after deletion
        fetchTicketsAgain(); // Fetch tickets again to update the list
      } else {
        setDeleteSuccessMessage(`Ticket with ID ${ticketId} not found.`);
      }
    } catch (error) {
      console.error('Error removing ticket:', error);
      setDeleteSuccessMessage(`Error removing ticket with ID ${ticketId}.`);
    }
  };

  // Function to fetch tickets again
  const fetchTicketsAgain = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tickets',{headers: { Authorization: `Bearer ${token}` }});
      setTickets(response.data); // Update tickets state with fetched data
      setDeleteSuccessMessage(null); // Reset delete success message
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleUpdateTicket = async (id) => {
    if (updateTitle === originalTitle && updateDescription === originalDescription) {
      setDeleteSuccessMessage('Please update the form.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/api/tickets/${id}`, { title: updateTitle, description: updateDescription },{
        headers: { Authorization: `Bearer ${token}` }});
      if (response.status === 200) {
        setDeleteSuccessMessage(`Ticket with ID ${id} updated successfully.`);
        setShowUpdateForm(false); // Hide update form after successful update
        fetchTickets(); // Fetch updated tickets list
      } else {
        setDeleteSuccessMessage(`Ticket with ID ${id} not found.`);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      setDeleteSuccessMessage(`Error updating ticket with ID ${id}.`);
    }
  };

  const handleHideSubmittedStatus = () => {
    setShowSubmittedStatus(false);
  };

  const handleHideFetchedTicketDetails = () => {
    setShowFetchedTicketDetails(false);
    setDeleteSuccessMessage('');
  };

  const handleHideUpdateDetails = () => {
    setUpdateTitle('');
    setUpdateDescription('');
    setShowUpdateForm(false); // Hide update form
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  return (
    <div className="container mt-5">
           <div className="form-group mt-3">
        <h2>Get Ticket by ID</h2>
        <label htmlFor="ticketId">Enter Ticket ID:</label>
        <div className="input-group">
          <input type="text" className="form-control" id="ticketId" value={ticketId} onChange={(e) => setTicketId(e.target.value)} />
          <div className="input-group-append">
            <button onClick={() => handleGetTicketDetails(ticketId)} className="btn btn-info">Get Details</button>
          </div>
        </div>
        {fetchTicketStatus === 'not-found' && (
          <p className="text-danger mt-2">Ticket not found.</p>
        )}
      </div>
      {fetchedTicket && showFetchedTicketDetails && (
        <div className="card mt-3">
          <div className="card-body">
            <h2 className="card-title">Fetched Ticket Details</h2>
            <p><strong>ID:</strong> {fetchedTicket._id}</p>
            <p><strong>Title:</strong> {fetchedTicket.title}</p>
            <p><strong>Description:</strong> {fetchedTicket.description}</p>
            <p><strong>Status:</strong> {fetchedTicket.status}</p>
            <div className="d-flex">
              <button onClick={handleHideFetchedTicketDetails} className="btn btn-primary">OK</button>
              <button onClick={() => handleRemoveTicket(fetchedTicket._id)} className="btn btn-danger ml-2">Delete</button>
              <button onClick={() => setShowUpdateForm(true)} className="btn btn-primary ml-2">Update</button>
            </div>
            {deleteSuccessMessage && (
              <p className="text-success mt-2">{deleteSuccessMessage}</p>
            )}
          </div>
        </div>
      )}
      {showUpdateForm && (
        <div className="card mt-3">
          <div className="card-body">
            <h2 className="card-title">Update Ticket</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateTicket(fetchedTicket._id); }}>
              <div className="form-group">
                <label htmlFor="updateTitle">New Title:</label>
                <input type="text" className="form-control" id="updateTitle" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="updateDescription">New Description:</label>
                <textarea className="form-control" id="updateDescription" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" onClick={handleCloseUpdateForm} className="btn btn-secondary ml-2">Close</button>
              {deleteSuccessMessage && (
                <p className="text-success mt-2">{deleteSuccessMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
      <button onClick={handleToggleDetails} className="btn btn-secondary mt-3">
        {showDetails ? 'Hide Ticket Details' : 'Show All Ticket Details'}
      </button>
      {showDetails && (
        <div className="mt-3">
          <h2>All Tickets</h2>
          <ul className="list-group">
            {tickets.map(ticket => (
              <li key={ticket._id} className="list-group-item">
                <div>
                  <p><strong>ID:</strong> {ticket._id}</p>
                  <p><strong>Title:</strong> {ticket.title}</p>
                  <p><strong>Description:</strong> {ticket.description}</p>
                  <p><strong>Status:</strong> {ticket.status}</p>
                  <div className="d-flex">
                    <button onClick={() => handleGetTicketDetails(ticket._id)} className="btn btn-info mr-2">Update</button>
                    <button onClick={() => handleRemoveTicket(ticket._id)} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;

