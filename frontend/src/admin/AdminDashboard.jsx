import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminContent from "./AdminContent";
import AdminProfile from "./AdminProfile";
// Import your missing component placeholders here
// import AdminProjects from "./AdminProjects"; 
// import AdminUpload from "./AdminUpload";
// import AdminSettings from "./AdminSettings";
import LogoutModal from "../components/LogoutModal";


import { useState } from "react";

const AdminDashboard = () => {
    const [isLogoutModal, setIslogoutModal] = useState(false);
    const [isAdminProfileEditModal, setIsAdminProfileEditModal] = useState(false);
    const [isAdminNavbar, setIsAdminNavbar] = useState(false);

    // Track active view
    const [activeView, setActiveView] = useState("dashboard");

    // logout modal toggler
    const handleLogoutModalChange = () => {
        setIslogoutModal(true);
    };

    // profile edit modal toggler
    const handleProfileEditModalChange = () => {
        setIsAdminProfileEditModal(!isAdminProfileEditModal);
    }

    const handleToggleAdminNavbar = () => {
        setIsAdminNavbar(!isAdminNavbar);
    };
    

    // track each view and find the match and inject it inside the dash component
    const renderMainContent = () => {
        switch (activeView) {
            case "dashboard":
                return <AdminContent 
                isLogoutModal={isLogoutModal} 
                setIsLogoutModal={setIslogoutModal}
                 />;

            case "profile":
                return <AdminProfile 
                isAdminProfileEditModal={isAdminProfileEditModal}
                setIsAdminProfileEditModal={setIsAdminProfileEditModal}
                handleProfileEditModalChange={handleProfileEditModalChange} 
                />;
                
            case "projects":
                return <div>{/* <AdminProjects /> */} Projects View Placeholder</div>;
            case "upload":
                return <div>{/* <AdminUpload /> */} Upload Project View Placeholder</div>;
            case "settings":
                return <div>{/* <AdminSettings /> */} Settings View Placeholder</div>;
            default:
                return <AdminContent isLogoutModal={isLogoutModal} setIsLogoutModal={setIslogoutModal} />;
        }
    };

    return (
        <div className="flex w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-100 transition-all duration-300">

            {/* Sidebar section */}
            <AdminSidebar
                isAdminNavbar={isAdminNavbar}
                setIsAdminNavbar={setIsAdminNavbar}
                handleLogoutModalChange={handleLogoutModalChange}
                activeView={activeView}
                setActiveView={setActiveView}
            />

            {/* Main content */}
            <div className="flex flex-col p-0 w-full">
                <AdminNavbar handleToggleAdminNavbar={handleToggleAdminNavbar} isAdminNavbar={isAdminNavbar} />

                {isLogoutModal && <LogoutModal handleLogoutModalChange={handleLogoutModalChange} setIsLogoutModal={setIslogoutModal} />}
                <div className="w-full flex-1">
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
