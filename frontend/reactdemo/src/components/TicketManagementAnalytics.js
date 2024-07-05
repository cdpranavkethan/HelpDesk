import React,{useState,useEffect} from "react";
import axios from'axios';
import BarChart from "../BarChart";
import "bootstrap/dist/css/bootstrap.css"
import { useNavigate } from 'react-router-dom';

function TicketManagementAnalytics() {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch initial search results and all articles on component mount
        fetchData();
        // Retrieve token from localStorage
        const storedToken = localStorage.getItem('token');
          setToken(storedToken);
      }, [navigate]);
    
      useEffect(() => {
        // Fetch all articles when the token changes
        if (token) {
          fetchData();
        }
      }, [token]);

      const fetchData=async()=>{
        try{
            const response=await axios.get('http://localhost:3001/api/analytics/chat',{
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnalyticsData(response.data);
        }catch(error){
            console.log('Error',error);
        }
      };

    const data = {
        totalChats: parseInt(analyticsData?.totalChats || 0, 10),
        averageResponseTime: parseInt(analyticsData?.averageResponseTime || 0, 10)
    };

    return (
        <div className="container-fluid page-wrapper">
            <div className="container mt-5">
                <h1 className="text-center mb-4">Ticket Management Analytics</h1>
                <br/>
                <div className="analysis-box bg-light p-4 mb-4">
                
                    {analyticsData && (
                        <div>
                            <h3>Total Tickets: {analyticsData.totalChats}</h3>
                            
                            <h3>Average Resolution Time: {analyticsData.averageResponseTime} seconds</h3>

                        </div>
                    )}
                </div>
                <br/><br/><br/>
                <h2 className="text-center mb-4">Ticket Performance Dashboard</h2>
                <br/><br/><br/><br/>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <BarChart data={data} />
                    </div>
                    
                </div>
                <br/><br/><br/><br/>
            </div>
        </div>
    );
    
};

export default TicketManagementAnalytics;