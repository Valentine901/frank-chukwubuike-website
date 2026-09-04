import { useTheme } from "../Context/ThemeContext";
import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";



const AdminDashboard = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-100">
            
            {/* Admin Sidebar section */}
            <div>
                <AdminSidebar />
            </div>

            {/* Admin Main section*/}
            <div>
                <h2>Main Page</h2>
            </div>
        </div>
    )
}

export default AdminDashboard;