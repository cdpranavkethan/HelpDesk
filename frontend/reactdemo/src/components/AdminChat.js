import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [updatedResponseText, setUpdatedResponseText] = useState('');
  const username = localStorage.getItem('username'); // Get username from local storage
  const token = localStorage.getItem('token'); // Get JWT token from local storage

  useEffect(() => {
    // Fetch initial unanswered chat messages for the admin
    fetchUnansweredMessages();
    const intervalId = setInterval(fetchUnansweredMessages, 5000); // Poll every 5 seconds (adjust as needed)
    return () => clearInterval(intervalId);
  }, []);

  const fetchUnansweredMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/chat/unanswered`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching unanswered messages:', error);
    }
  };

  const handleEditMessage = (messageId, responseText) => {
    setEditingMessageId(messageId);
    setUpdatedResponseText(responseText);
  };

  const handleSaveMessage = async (messageId) => {
    try {
      await axios.put(`http://localhost:3001/api/chat/${messageId}`, {
        agent:username,
        response: updatedResponseText
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditingMessageId(null);
      // After updating a message, refresh unanswered messages
      fetchUnansweredMessages();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat">
          <div className="card">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="user_info">
                  <span>Unanswered Chat Messages</span>
                </div>
              </div>
            </div>
            <div className="card-body msg_card_body">
              {messages.length===0?
              (<div className='text-center'>No Unread Messages</div>):(messages.map((msg) => (
                <div key={msg._id} className="mb-4">
                  <div className="card bg-primary text-white rounded-3">
                    <div className="card-body">
                      {msg._id === editingMessageId ? (
                        <div className="input-group">
                          <textarea
                            className="form-control"
                            value={updatedResponseText}
                            onChange={(e) => setUpdatedResponseText(e.target.value)}
                          ></textarea>
                          <div className="input-group-append">
                            <button className="btn btn-success" onClick={() => handleSaveMessage(msg._id)}>
                              <FontAwesomeIcon icon={faSave} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>{msg.message}</div>
                          <div className="mt-2">
                            <small><strong>Sender:</strong> {msg.sender}</small>
                          </div>
                          <div className="mt-2">
                            <small><strong>Timestamp:</strong> {msg.timestamp}</small>
                          </div>
                          <div className="mt-2">
                            <small><strong>Response:</strong></small>
                            <div>{msg.response}</div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-sm btn-info" onClick={() => handleEditMessage(msg._id, msg.response)}>
                        Answer
                      </button>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
