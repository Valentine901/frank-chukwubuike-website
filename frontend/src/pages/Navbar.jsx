import { Moon, Sun } from "lucide-react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import {Link} from "react-router-dom"

const Navbar = () => {
    const [toggleBar, setToggleBar] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();

    const handleMenuToggle = () => {
        setToggleBar(!toggleBar);
    };

    if( user === null) return;

    return (
        <nav className="w-full h-16 flex items-center justify-between px-4 md:px-8 fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 font-body">

            {/*Real Logo */}
            <Link to="#home" className="flex-1 flex justify-start items-center">
                <h2 className="text-xl md:text-2xl font-bold whitespace-nowrap text-gray-800 dark:text-white capitalize">
                    {user.first_name} {user.last_name}
                </h2>
            </Link>

            {/* Desktop Navigation Menu */}
            <ul className="hidden lg:flex items-center justify-center gap-6 list-none font-body flex-1">
                <li>
                    <a href="#home" className="text-sm lg:text-base text-gray-600 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Home</a>
                </li>
                <li>
                    <a href="#about" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">About</a>
                </li>
                <li>
                    <a href="#projects" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Projects</a>
                </li>
                <li>
                    <a href="#skills" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Skills</a>
                </li>
                <li>
                    <a href="#testimonials" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Testimonials</a>
                </li>
                <li>
                    <a href="#contact" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
                        Get In Touch
                    </a>
                </li>
            </ul>


            <div className="flex items-center justify-end gap-4 flex-1">

                <Link to="/auth/login" className="hidden sm:inline-block text-sm lg:text-base text-blue-700 dark:text-blue-400 hover:text-blue-600 font-semibold rounded-2xl border border-blue-700 dark:border-blue-400 px-4 py-2 transition-all">
                    Login
                </Link>

                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full bg-gray-50 dark:bg-gray-800 text-blue-600 dark:text-yellow-400 hover:scale-105 shadow-sm border border-gray-200 dark:border-gray-700 transition-all focus:outline-none cursor-pointer"
                    aria-label="Toggle Theme"
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Mobile Hamburger Menu Toggle */}
                <button
                    onClick={handleMenuToggle}
                    className="lg:hidden p-2 text-2xl focus:outline-none text-gray-700 dark:text-white cursor-pointer z-50"
                    aria-label="Toggle Menu"
                >
                    {toggleBar ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Sidebar Navbar Menu */}
            <div className={`lg:hidden fixed h-screen top-0 right-0 w-64 bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-start space-y-6 pt-24 shadow-2xl transition-transform duration-300 ease-in-out transform ${toggleBar ? 'translate-x-0' : 'translate-x-full'}`}>
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
