import { User, Upload, Settings, LayoutDashboard, LogOut, X } from "lucide-react";
import { FaFolderOpen } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { BASE_IMAGE_URL } from "../constants/Api";

const AdminSidebar = ({ 
    handleLogoutModalChange, 
    isAdminNavbar, 
    setIsAdminNavbar,
    handleToggleAdminNavbar, 
    activeView, 
    setActiveView 
}) => {
    const { userData, profile, loading } = useAuth();

    if (loading) {
        return <div className="hidden lg:flex flex-col min-h-screen w-70 animate-pulse bg-gray-100 p-4" />;
    }

    const menuItems = [
        { label: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
        { label: "Projects", icon: FaFolderOpen, view: "projects" },
        { label: "Upload Project", icon: Upload, view: "upload" },
        { label: "Profile", icon: User, view: "profile" },
        { label: "Settings", icon: Settings, view: "settings" },
    ];

    return (
        <>
            {/* LARGE DESKTOP SCREEN SIDEBAR (Locked on the left side) */}
            <div className="hidden lg:flex flex-col min-h-screen border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 w-70 transition-all duration-300">

                {/* Header */}
                <div className="border-b-2 border-gray-200 dark:border-gray-700 p-4 flex items-center h-16">
                    <h1 className="text-gray-700 dark:text-gray-100 font-bold font-heading text-xl md:text-2xl capitalize">
                        {userData?.first_name || "Admin"}
                    </h1>
                </div>

                {/* Profile Avatar */}
                <div className="flex flex-col items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 w-full">
                    <img
                        src={profile?.image ? `${BASE_IMAGE_URL}/${profile.image}` : `https://dicebear.com{userData?.first_name || 'admin'}`}
                        alt="Profile Avatar"
                        className="rounded-full object-cover border border-gray-300 dark:border-gray-600 bg-white w-24 h-24"
                    />
                    <div className="flex flex-col truncate w-full">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-heading truncate text-center capitalize">
                            {userData?.first_name} {userData?.last_name}
                        </h2>
                        <span className="text-lg font-heading text-blue-600 dark:text-blue-400 font-bold text-center">Admin</span>
                    </div>
                </div>

                {/* Navigation List Links */}
                <nav className="w-full px-3 py-4 space-y-4 flex-1">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = activeView === item.view;

                        return (
                            <button
                                key={index}
                                onClick={() => setActiveView(item.view)}
                                className={`w-full flex items-center gap-4 p-4 rounded-lg font-heading font-semibold text-sm transition-all duration-200 cursor-pointer text-left ${isActive
                                        ? "bg-blue-600/10 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
                                    }`}
                            >
                                <Icon size={20} className={isActive ? "text-blue-600 dark:text-blue-400" : undefined} />
                                <span className="text-lg font-semibold font-heading">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Logout Button Block */}
                <div className="border-t border-gray-200 dark:border-gray-700 w-full px-3 py-4 mt-auto">
                    <button
                        onClick={handleLogoutModalChange}
                        className="w-full flex items-center gap-4 p-4 rounded-lg font-heading font-semibold text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400 transition-all duration-200 cursor-pointer text-left"
                    >
                        <LogOut size={20} />
                        <span className="text-lg font-semibold font-heading">Logout</span>
                    </button>
                </div>
            </div>



            {/* 🌟 SMALL & MEDIUM SCREEN BACKGROUND OVERLAY (Dims workspace screen when active) */}
           <div 
                onClick={handleToggleAdminNavbar}
                className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300 lg:hidden ${
                    isAdminNavbar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            {/* 🌟 SMALL & MEDIUM SCREEN SLIDE-OUT PANEL (Stays mounted, slides using transitions) */}
            <div className={`fixed top-0 left-0 h-screen border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 w-70 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
                isAdminNavbar ? "translate-x-0" : "-translate-x-full"
            }`}>
                
                {/* Header with Close X Indicator Button */}
                <div className="border-b-2 border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between h-16 shrink-0">
                    <h1 className="text-gray-700 dark:text-gray-100 font-bold font-heading text-xl md:text-2xl capitalize">
                        {userData?.first_name || "Admin"}
                    </h1>
                    <button 
                        onClick={() => setIsAdminNavbar(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Profile Avatar */}
                <div className="flex flex-col items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 w-full shrink-0">
                    <img 
                        src={profile?.image ? `${BASE_IMAGE_URL}/${profile.image}` : `https://dicebear.com{userData?.first_name || 'admin'}`} 
                        alt="Profile Avatar"
                        className="rounded-full object-cover border border-gray-300 dark:border-gray-600 bg-white w-24 h-24"
                    />
                    <div className="flex flex-col truncate w-full">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-heading truncate text-center capitalize">
                            {userData?.first_name} {userData?.last_name}
                        </h2>
                        <span className="text-lg font-heading text-blue-600 dark:text-blue-400 font-bold text-center">Admin</span>
                    </div>
                </div>

                {/* Navigation List Links */}
                <nav className="w-full px-3 py-4 space-y-4 flex-1 overflow-y-auto">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = activeView === item.view;

                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    setActiveView(item.view);   // Change global string state
                                    handleToggleAdminNavbar();
                                     // Close mobile navbar drawer on item select
                                }} 
                                className={`w-full flex items-center gap-4 p-4 rounded-lg font-heading font-semibold text-sm transition-all duration-200 cursor-pointer text-left ${
                                    isActive
                                        ? "bg-blue-600/10 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
                                }`}
                            >
                                <Icon size={20} className={isActive ? "text-blue-600 dark:text-blue-400" : undefined} />
                                <span className="text-lg font-semibold font-heading">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Logout Button Block */}
                <div className="border-t border-gray-200 dark:border-gray-700 w-full px-3 py-4 mt-auto shrink-0 bg-gray-100 dark:bg-gray-800">
                    <button 
                        onClick={() => {
                            handleToggleAdminNavbar(); // Dismiss mobile menu drawer
                            handleLogoutModalChange();  // Popup confirmation modal
                        }}
                        className="w-full flex items-center gap-4 p-4 rounded-lg font-heading font-semibold text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400 transition-all duration-200 cursor-pointer text-left"
                    >
                        <LogOut size={20} />
                        <span className="text-lg font-semibold font-heading">Logout</span>
                    </button>
                </div>
            </div> 
        </>
    );
};

export default AdminSidebar;
