import { Navigate,Outlet } from "react-router-dom";
const ProtectedRoute=()=>{
    const auth=localStorage.getItem('token');
    if(auth){
        return <Outlet/>
    }
    else{
        return <Navigate to="/login"/>
    }
}
export default ProtectedRoute;