import React from 'react';
import { Menu, X, Moon, Sun, ChevronDown, Plus } from 'lucide-react';
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext";
import { BASE_IMAGE_URL } from '../constants/Api';
import DropDownUpload from './DropDownUpload';

const AdminNavbar = ({ 
    handleToggleAdminNavbar, 
    isAdminNavbar, 
    setIsAdminProjectCreateModal, 
    isDropDown, 
    setIsDropDown 
}) => {
  const { toggleTheme, theme } = useTheme();
  const { profile } = useAuth();

  return (
    <div className="relative flex w-full justify-between border-b border-gray-200 dark:border-gray-700 items-center bg-white dark:bg-gray-900 h-16 px-4 transition-all duration-300">
      
     
      <div className="flex lg:hidden">
        <button 
          onClick={handleToggleAdminNavbar}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-xl transition-colors"
        >
          {isAdminNavbar ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

     
      <div className="flex items-center gap-4 ml-auto">
        
        {/* Theme Toggler Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-xl transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="text-yellow-500 animate-pulse" size={24} />
          ) : (
            <Moon className="text-gray-600" size={24} />
          )}
        </button>

        {/* Action Dropdown Trigger Wrapper */}
        <div className="relative">
          <button
            onClick={() => setIsDropDown(!isDropDown)}
            className={`flex items-center gap-2 font-medium text-sm transition-all duration-300 rounded-xl h-10 px-4 shadow-sm border ${
              isDropDown 
                ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/10' 
                : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500 shadow-blue-500/5'
            }`}
          >
            <Plus size={20} className={`transition-transform duration-300 ${isDropDown ? 'rotate-45' : ''}`} />
            <span className="hidden sm:inline">Upload Content</span>
            <span className="sm:hidden">Upload</span>
            <ChevronDown size={20} className="opacity-70" />
          </button>

          {/* upload dropdown wrapper */}
          {isDropDown && (
            <DropDownUpload 
              setIsDropDown={setIsDropDown} 
              setIsAdminProjectCreateModal={setIsAdminProjectCreateModal} 
            />
          )}
        </div>

        {/* User Profile Avatar Frame */}
        <div className="flex lg:hidden items-center justify-center h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <img
            src={profile?.image ? `${BASE_IMAGE_URL}/${profile.image}` : `https://dicebear.com{profile?.first_name || 'admin'}.svg`}
            alt="Profile Avatar"
            className="h-full w-full object-cover"
          />
        </div>

      </div>

    </div>
  );
};

export default AdminNavbar;
