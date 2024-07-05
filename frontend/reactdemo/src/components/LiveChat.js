import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faPhone, faTrash, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const username = localStorage.getItem('username'); // Get username from local storage
  const token = localStorage.getItem('token'); // Get JWT token from local storage

  useEffect(() => {
    // Fetch initial chat messages for the user
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000); // Poll every 5 seconds (adjust as needed)
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/chat/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/chat/', {
        sender: username,
        message: newMessage
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewMessage('');
      // After sending a message, refresh messages
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteMessage = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this message?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/chat/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // After deleting a message, refresh messages
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat">
          <div className="card">
            <div className="card-header msg_head ">
              <div className="d-flex bd-highlight text-center">
                <div className="user_info">
                  <span>Post Your Questions</span>
                </div>
              </div>
            </div>
            <div className="card-body msg_card_body">
              {messages.map((msg) => (
                <div key={msg._id} className={`mb-4 ${msg.answered ? 'text-left' : 'text-right'}`}>
                  <div className={`card ${msg.answered ? 'bg-success' : 'bg-primary'} text-white rounded-3`} style={{ maxWidth: 'fit-content', marginLeft: msg.sender === username ? 'auto' : '0', marginRight: msg.sender !== username ? 'auto' : '0' }}>
                    <div className="card-body">
                      {msg.message}
                      {msg.answered && (
                        <>
                          <div className="mt-2">
                            <small><strong>Answer:</strong> {msg.response}</small>
                          </div>
                          <div className="mt-2">
                            <small>Answered by: {msg.agent}</small>
                          </div>
                        </>
                      )}
                      <div className="mt-3 text-muted">{formatTimestamp(msg.timestamp)}</div>
                    </div>
                    {msg.sender === username && (
                      <button className="btn  btn-sm mt-2" onClick={() => handleDeleteMessage(msg._id)} style={{ position: 'absolute', top: '5px', right: '5px', padding: '5px', borderRadius: '50%', fontSize: '14px' }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <form onSubmit={handleMessageSubmit}>
                <div className="input-group">
                  <textarea
                    className="form-control type_msg rounded-start"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={{ height: '38px', resize: 'none' }}
                  ></textarea>
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-primary btn-lg rounded-end d-flex align-items-center justify-content-center" style={{ height: '38px', width: '100px' }}>
                      <FontAwesomeIcon icon={faLocationArrow} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
