import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import AgentBarChart from "../AgentBarChart";
import "bootstrap/dist/css/bootstrap.css"

function AgentAnalytics() {
    const [agents, setAgents] = useState([]);
    const [isLoading,setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3099/api/analytics/agents/'); // Replace with your API endpoint
                setAgents(response.data);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            } finally {
                setIsLoading(false); // Set loading state to false after fetching
            }
        };

        fetchData();
    }, []);

    const agentdata = {
        ticketsResolved: parseInt(agents[0]?.ticketsResolved || 0, 10),
        customerSatisfaction: parseInt(agents[0]?.customerSatisfaction || 0, 10)
    };
    

    return (
        <div className="App">
            <h1>Agents</h1>
            {isLoading ? ( // Display loading state if data is being fetched
                <p>Loading...</p>
            ) : (
                <ul className="agent-list">
                    {agents.map(agent => (
                        <li key={agent._id} className="agent-item">
                            <AgentBarChart data={agentdata} />

                            <h2 className="agent-name">{agent.name}</h2>
                            <p className="agent-info">Tickets Resolved: {agent.ticketsResolved}</p>
                            <p className="agent-info">Customer Satisfaction: {agent.customerSatisfaction}</p>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AgentAnalytics;
