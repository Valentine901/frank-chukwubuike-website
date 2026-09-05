import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { loading, userData } = useAuth();
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-300 text-xl font-heading animate-pulse">
                    Authenticating session...
                </p>
            </div>
        );
    }

    if(!userData) return <Navigate to="/auth/login" />;

    return children;
}

export default ProtectedRoute;