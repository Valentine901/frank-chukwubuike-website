import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { loading, userData } = useAuth();
    
    if (loading) return <p>Authenticating...</p>

    if(!userData) return navigate("/auth/login");

    return children;
}

export default ProtectedRoute;