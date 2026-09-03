import { useTheme } from "../Context/ThemeContext";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <h2>Admin DashBoard</h2>
        </div>
    )
}

export default AdminDashboard;