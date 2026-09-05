import React, { useState } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from "../Context/ThemeContext";

const AdminNavbar = ({ handleToggleAdminNavbar, isAdminNavbar }) => {
  const { toggleTheme, theme } = useTheme();


  return (
    <div className="flex w-full justify-between border-b-2 border-gray-300 dark:border-gray-500 items-center bg-gray-100 dark:bg-gray-800 h-15 px-3 transition-all duration-300">

      <div className='flex lg:hidden p-1 bg-gray-300 dark:bg-gray-700 rounded-xl '>
       {isAdminNavbar ? <X size={30} onClick={handleToggleAdminNavbar} /> :
        <Menu size={30} onClick={handleToggleAdminNavbar} /> }
      </div>

      <div className='flex p-1 bg-gray-300 dark:bg-gray-700 rounded-xl'>
        {theme === "dark" ? 
        <Sun className='dark:text-yellow-400' onClick={toggleTheme} size={30} /> :
        <Moon className='dark:text-white' onClick={toggleTheme} size={30} /> }
      </div>

    </div>
  )
}

export default AdminNavbar;