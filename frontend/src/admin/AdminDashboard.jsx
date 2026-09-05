import { useTheme } from "../Context/ThemeContext";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminContent from "./AdminContent";
import { useState, useEffect } from "react";


const AdminDashboard = () => {
    const { theme, toggleTheme } = useTheme();
    const [isLogoutModal, setIslogoutModal] = useState(false);
     const [isAdminNavbar, setIsAdminNavbar] = useState(false);

    const handleLogoutModalChange = () => {
        setIslogoutModal(true);
    }

    const handleToggleAdminNavbar = () => {
        setIsAdminNavbar(!isAdminNavbar);
    }

    return (
        <div className="flex w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-100 transition-all duration-300">
            
            {/* Admin Sidebar section */}
            <div>
                <AdminSidebar handleLogoutModalChange={handleLogoutModalChange} isAdminNavbar={isAdminNavbar} />
            </div>

            {/* Admin Main section*/}
            <div className="flex flex-col p-0 w-full">
              
                <div>
                    <AdminNavbar handleToggleAdminNavbar={handleToggleAdminNavbar} isAdminNavbar={isAdminNavbar}  />
                </div>

                  <div>
                    <AdminContent isLogoutModal={isLogoutModal} setIsLogoutModal={setIslogoutModal} />
                  </div>
            </div>
        </div>
    )
}

export default AdminDashboard;