import { useAuth } from "../Context/AuthContext";

const LogoutModal = ({ setIsLogoutModal}) => {
    const { logout } = useAuth();
    return (
        <div className="w-80 rounded-xl bg-gray-200 dark:bg-gray-900 flex flex-col items-center justify-center h-40 absolute top-20 left-105">
            <p>Are you sure you want to log out?</p>
            <div className="flex space-x-5 mt-6">
                <button 
                onClick={() => setIsLogoutModal(false)}
                className="px-6 py-2 rounded-md shadow-sm font-heading bg-gray-600 font-semibold hover:bg-gray-500 active:bg-gray-400 transition-all duration-300 text-gray-100">Cancel</button>
                <button
                onClick={logout}
                className="px-6 py-2 rounded-md shadow-sm font-heading bg-red-600 font-semibold hover:bg-red-500 active:bg-red-400 transition-all duration-300 text-gray-100 ">Logout</button>
            </div>
        </div>
    )
}

export default LogoutModal