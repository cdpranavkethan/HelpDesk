import {Outlet} from 'react-router-dom';
const CustomerRoute=()=>{
    const role=localStorage.getItem("role");
    if(role==="customer"){
        return <Outlet/>;
    }
    else{
        return <h1>Access Denied!!</h1>
    }
}
export default CustomerRoute;