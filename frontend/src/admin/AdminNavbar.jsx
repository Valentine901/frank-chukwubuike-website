import React, { useState } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext";
import { BASE_IMAGE_URL } from '../constants/Api';

const AdminNavbar = ({ handleToggleAdminNavbar, isAdminNavbar }) => {
  const { toggleTheme, theme } = useTheme();
  const { profile } = useAuth();


  return (
    <div className="flex w-full justify-between border-b-2 border-gray-300 dark:border-gray-500 items-center bg-gray-100 dark:bg-gray-800 h-20 lg:h-15 px-3 transition-all duration-300">

      <div className='flex lg:hidden p-1 bg-gray-300 dark:bg-gray-700 rounded-xl '>
        {isAdminNavbar ? <X size={30} onClick={handleToggleAdminNavbar} /> :
          <Menu size={30} onClick={handleToggleAdminNavbar} />}
      </div>

<div className='flex items-center gap-5'>
      <div className='flex p-1 bg-gray-300 dark:bg-gray-700 rounded-xl items-center'>
        {theme === "dark" ?
          <Sun className='dark:text-yellow-400' onClick={toggleTheme} size={30} /> :
          <Moon className='dark:text-white' onClick={toggleTheme} size={30} />}

      </div>

      
      <div className="flex items-center w-10 h-10 rounded-full">
                    <div className="image-block rounded-full items-center flex">
                        <img
                            src={profile?.image ? `${BASE_IMAGE_URL}/${profile.image}` : `https://dicebear.com{userData?.first_name || 'admin'}`}
                            alt="Profile Avatar"
                            className="flex lg:hidden rounded-full object-cover border border-gray-300 dark:border-gray-600 bg-white w-12 h-12"
                        />
                    </div>
        </div>
      </div>

    </div>
  )
}

export default AdminNavbar;