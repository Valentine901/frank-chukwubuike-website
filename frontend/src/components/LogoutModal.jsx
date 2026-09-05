import { LogOut, X, Loader2 } from "lucide-react";
import { useAuth } from "../Context/AuthContext";

const LogoutModal = ({ setIsLogoutModal }) => {
    const { logout, loading } = useAuth();

    return (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
       
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative transform transition-all duration-300 scale-100">
                
             
                <button 
                    onClick={() => setIsLogoutModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                
                <div className="flex flex-col items-center text-center mt-2">
                    <div className="p-3 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full mb-4 shadow-inner">
                        <LogOut size={28} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading">
                        Confirm Sign-Out
                    </h3>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-heading max-w-xs">
                        Are you sure you want to log out? You will need to enter your password again to manage your projects.
                    </p>
                </div>

                
                <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
                    <button
                        onClick={() => setIsLogoutModal(false)}
                        className="flex-1 order-2 sm:order-1 py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 font-heading text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700/50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        onClick={logout}
                        className="flex-1 order-1 sm:order-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 font-heading text-sm font-semibold text-white transition-colors shadow-lg shadow-red-600/20 cursor-pointer"
                    >
                        {loading ? <Loader2 size={24} className="animate-spin" /> :
                        "Logout"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LogoutModal;
