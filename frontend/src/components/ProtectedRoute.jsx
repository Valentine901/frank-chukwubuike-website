import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const { loading, userData } = useAuth();
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-300 text-4xl font-heading animate-spin font-bold">
                    <Loader2 size={110} />
                </p>
            </div>
        );
    }

    if(!userData) return <Navigate to="/auth/login" />;

    return children;
}

export default ProtectedRoute;