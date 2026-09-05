import { User, Upload, Settings, LayoutDashboard, File, LogOut } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import LogoutModal from "../components/LogoutModal";

const BASE_URL = "http://localhost:8000";

const AdminSidebar = ({ handleLogoutModalChange, isAdminNavbar }) => {

    const { userData, profile, loading, logout } = useAuth();

    if (loading) {
        return (
            <div className="hidden md:flex flex-col min-h-screen border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 w-70 animate-pulse p-4">
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded mb-6"></div>
                <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded mb-6"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((n) => <div key={n} className="h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>)}
                </div>
            </div>
        );
    }

    const menuItems = [
        { label: "Dashboard", icon: LayoutDashboard, active: true },
        { label: "Projects", icon: File, active: false },
        { label: "Upload Project", icon: Upload, active: false },
        { label: "Profile", icon: User, active: false },
        { label: "Settings", icon: Settings, active: false },
    ];

    return (
        <>
        <div className="hidden md:flex flex-col min-h-screen border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 w-70 transition-all duration-300">
            
            {/* Header */}
            <div className="border-b-2 border-gray-200 dark:border-gray-700 p-4 flex items-center h-16">
                <h1 className="text-gray-700 dark:text-gray-100 font-bold font-heading text-xl md:text-2xl capitalize">
                    {userData?.first_name || "Admin"}
                </h1>
            </div>

            {/* Profile Information */}
            <div className="flex flex-col items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 w-full">
                <img 
                    
                    src={profile?.image ? `${BASE_URL}/${profile.image}` : `https://dicebear.com{userData?.first_name || 'admin'}`} 
                    alt="Profile Avatar"
                    className="rounded-full object-cover border border-gray-300 dark:border-gray-600 bg-white w-24 h-24"
                />
                <div className="flex flex-col truncate w-full">
                    <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-heading truncate text-center capitalize">
                        {userData?.first_name} {userData?.last_name}
                    </h2>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold text-center">Admin</span>
                </div>
            </div>

            <nav className="w-full px-3 py-4 space-y-2 flex-1">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={index}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-heading font-semibold text-sm transition-all duration-200 cursor-pointer text-left ${
                                item.active
                                    ? "bg-blue-600/10 text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                        >
                            <Icon size={20} className={item.active ? "text-blue-600 dark:text-blue-400" : null} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

           
            <div className="border-t border-gray-200 dark:border-gray-700 w-full px-3 py-4 mt-auto">
                <button 
                    onClick={handleLogoutModalChange}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-lg font-heading font-semibold text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400 transition-all duration-200 cursor-pointer text-left"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
            
        </div>

        {/* mobile navbar for admin dashboard */}
      {isAdminNavbar &&  
        <div className="flex flex-col md:hidden min-h-screen border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 w-70 transition-all duration-300 absolute top-15 left-0">
            
            {/* Header */}
            <div className="border-b-2 border-gray-200 dark:border-gray-700 p-4 flex items-center h-16">
                <h1 className="text-gray-700 dark:text-gray-100 font-bold font-heading text-xl md:text-2xl capitalize">
                    {userData?.first_name || "Admin"}
                </h1>
            </div>

            {/* Profile Information */}
            <div className="flex flex-col items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 w-full">
                <img 
                    
                    src={profile?.image ? `${BASE_URL}/${profile.image}` : `https://dicebear.com{userData?.first_name || 'admin'}`} 
                    alt="Profile Avatar"
                    className="rounded-full object-cover border border-gray-300 dark:border-gray-600 bg-white w-24 h-24"
                />
                <div className="flex flex-col truncate w-full">
                    <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-heading truncate text-center capitalize">
                        {userData?.first_name} {userData?.last_name}
                    </h2>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold text-center">Admin</span>
                </div>
            </div>

            <nav className="w-full px-3 py-4 space-y-2 flex-1">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={index}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg font-heading font-semibold text-sm transition-all duration-200 cursor-pointer text-left ${
                                item.active
                                    ? "bg-blue-600/10 text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                        >
                            <Icon size={20} className={item.active ? "text-blue-600 dark:text-blue-400" : null} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

           
            <div className="border-t border-gray-200 dark:border-gray-700 w-full px-3 py-4 mt-auto">
                <button 
                    onClick={handleLogoutModalChange}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-lg font-heading font-semibold text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400 transition-all duration-200 cursor-pointer text-left"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
            
        </div>
      
      }
        </>
    );
};

export default AdminSidebar;
