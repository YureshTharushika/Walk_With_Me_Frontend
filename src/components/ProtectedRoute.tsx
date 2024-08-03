import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();;
  
    if (isLoading) {
      return <div>Loading...</div>;  // Render loading indicator
    }

    if (!isAuthenticated) {
      console.log("from protected route: "+isAuthenticated);
      return <Navigate to="/login" />;
    }
  
    return <Outlet />;
  };
  
  export default ProtectedRoute;