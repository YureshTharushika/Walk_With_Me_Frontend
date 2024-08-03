import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
        const checkAuth = async () => {
          const token = localStorage.getItem('token');
          if (token) {
            try {
              const response = await api.get('/check-auth');
              console.log("from use auth: " + response.data.authenticated); 
              if (response.data.authenticated) {
                setIsAuthenticated(true);
              } else {
                navigate('/login');
              }
            } catch (error) {
              console.error('Error checking authentication status', error);
              navigate('/login');
            }
          } else {
            navigate('/login');
          }
          setIsLoading(false);  // Set loading state to false after check
        };
    
        checkAuth();
      }, [navigate]);

      const logout = () => {
        try {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error) {
            console.error('Error during logout', error);
        }
    };

    return { isAuthenticated, logout , isLoading};
    
    };

export default useAuth;
