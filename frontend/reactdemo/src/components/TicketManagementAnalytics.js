import React,{useState,useEffect} from "react";
import axios from'axios';
//import '../App.css';
import BarChart from "../BarChart";
import "bootstrap/dist/css/bootstrap.css"

function TicketManagementAnalytics() {
    const [analyticsData, setAnalyticsData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3099/api/analytics/chat'); // Replace with your API endpoint
            setAnalyticsData(response.data);
        };

        fetchData();
    }, []);

    const data = {
        totalChats: parseInt(analyticsData?.totalChats || 0, 10),
        averageResponseTime: parseInt(analyticsData?.averageResponseTime || 0, 10)
    };



    //console.log('egrfv',analyticsData.totalChats)
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