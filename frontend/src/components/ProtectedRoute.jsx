import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const { userData } = useAuth();
    
    // if (loading) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    //             <p className="text-gray-600 dark:text-gray-300 font-heading animate-spin font-bold">
    //                 <Loader2 size={48} />
    //             </p>
    //         </div>
    //     );
    // }

    if(!userData || userData === null) return <Navigate to="/auth/login" />;

    return children;
}

export default ProtectedRoute;