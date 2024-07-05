import React ,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Tickets from './components/Tickets'; 
import AdminTicket from './components/AdminTicket'
import KnowledgeBase from './components/KnowledgeBase'; 
import LiveChat from './components/LiveChat'; 
import Analytics from './components/Analytics'; 
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Header from './components/Header';
import Logout from './components/Logout';
import Register from './components/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import Articles from './components/Articles';
import CustomerRoute from './routes/customerRoute';
import AdminRoute from'./routes/AdminRoute';
import AdminChat from './components/AdminChat';

import TicketManagementAnalytics from './components/TicketManagementAnalytics';
import ChatAnalytics from './components/ChatAnalytics';
import AgentAnalytics from './components/AgentAnalytics';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Set authentication state to true
    }
  }, []);
  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/logout" element={<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/register" element={<Register/>} />
          <Route element={<ProtectedRoute/>}>
            <Route element={<CustomerRoute/>}>
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/knowledge-base" element={<Articles/>} />
              <Route path="/live-chat" element={<LiveChat />} />
            </Route>
            <Route element={<AdminRoute/>}>
              <Route path="/admin/knowledge-base" element={<KnowledgeBase/>} />
              <Route path="/admin/live-chat" element={<AdminChat/>}/>
              <Route path="/admin/tickets" element={<AdminTicket />} />
            </Route>
            <Route path="/analytics" element={<Analytics/>} />
          <Route path="/ticketManagementAnalytics" element={<TicketManagementAnalytics/>}/>
            <Route path="/chatAnalytics" element={<ChatAnalytics/>}/>
          <Route path="/agentAnalytics" element={<AgentAnalytics/>}/>
          </Route>
        </Routes>
      <Footer/>
    </Router>
  );
};

export default Dashboard;
