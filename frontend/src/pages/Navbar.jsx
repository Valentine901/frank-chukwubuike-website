import { Moon, Sun } from "lucide-react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";
import { useState } from "react";

const Navbar = () => {
    const [toggleBar, setToggleBar] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const handleMenuToggle = () => {
        setToggleBar(!toggleBar);
    };

    return (
        <nav className='w-full h-16 flex justify-between items-center bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white px-4 md:px-8 fixed top-0 left-0 z-50 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300'>
            {/* Logo Section */}
            <div className="logo">
                <h2 className="text-xl md:text-2xl font-bold whitespace-nowrap font-heading">Frank Dinyelu</h2>
            </div>

            {/* Right Action container */}
            <div className="flex items-center space-x-4">
                
                {/* Desktop Navigation Menu */}
                <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 list-none">
                    <li>
                        <a href="#home" className="text-sm md:text-md lg:text-lg text-gray-600 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Home</a>
                    </li>
                    <li>
                        <a href="#about" className="text-sm md:text-md lg:text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">About Me</a>
                    </li>
                    <li>
                        <a href="#projects" className="text-sm md:text-md lg:text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Projects</a>
                    </li>
                    <li>
                        <a href="#skills" className="text-sm md:text-md lg:text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Skills</a>
                    </li>
                    <li>
                        <a href="#testimonials" className="text-sm md:text-md lg:text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Testimonials</a>
                    </li>
                    <li>
                        <a href="#login" className="text-sm md:text-md lg:text-lg text-blue-700 dark:text-blue-400 hover:text-blue-600 font-semibold rounded-2xl border border-blue-700 dark:border-blue-400 px-4 py-2 transition-all font-heading">Get In Touch</a>
                    </li>
                    <li>
                        <a href="/auth/login" className="text-sm md:text-md lg:text-lg text-blue-700 dark:text-blue-400 hover:text-blue-600 font-semibold rounded-2xl border border-blue-700 dark:border-blue-400 px-4 py-2 transition-all font-heading">Login</a>
                    </li>
                </ul>

                {/* Theme Toggle Button  */}
                <button 
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-yellow-400 hover:scale-105 shadow-sm border border-gray-200 dark:border-gray-700 transition-all focus:outline-none cursor-pointer"
                    aria-label="Toggle Theme"
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Hamburger / Close Icon for Mobile Only */}
                <button 
                    onClick={handleMenuToggle} 
                    className="md:hidden p-2 text-xl focus:outline-none text-gray-700 dark:text-white cursor-pointer z-50"
                    aria-label="Toggle Menu"
                >
                    {toggleBar ? <FaTimes /> : <FaBars />}
                </button>
            </div>

          {/* mobile navbar */}
            <div className={`md:hidden fixed inset-y-0 right-0 w-64 bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-start space-y-6 pt-24 shadow-2xl transition-transform duration-300 ease-in-out transform ${toggleBar ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className="flex flex-col space-y-4 list-none">
                    <li>
                        <a href="#home" onClick={handleMenuToggle} className="block text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600">Home</a>
                    </li>
                    <li>
                        <a href="#about" onClick={handleMenuToggle} className="block text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600">About Me</a>
                    </li>
                    <li>
                        <a href="#projects" onClick={handleMenuToggle} className="block text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600">Projects</a>
                    </li>
                    <li>
                        <a href="#skills" onClick={handleMenuToggle} className="block text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600">Skills</a>
                    </li>
                    <li>
                        <a href="#testimonials" onClick={handleMenuToggle} className="block text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600">Testimonials</a>
                    </li>
                    <li>
                        <a href="#contact" onClick={handleMenuToggle} className="block text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600">Contact</a>
                    </li>
                    <li className="pt-4">
                        <a href="/auth/login" onClick={handleMenuToggle} className="block text-center text-lg font-semibold text-white bg-blue-700 hover:bg-blue-600 rounded-xl py-2 shadow">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    );

};

export default Navbar;
