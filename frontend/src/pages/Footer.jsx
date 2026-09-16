import {
    ArrowUp,
    ArrowUpRight,
    Mail,
} from "lucide-react";
import {
    BsFacebook,
    BsInstagram,
    BsLinkedin,
} from "react-icons/bs";

import { useAuth } from "../Context/AuthContext";

const Footer = () => {

    const { adminProfile, user } = useAuth();

    if (adminProfile === null || user === null) return;

    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-white border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 font-body">

            {/* MAIN FOOTER */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">


                    <div className="lg:col-span-2">

                        <a
                            href="#home"
                            className="inline-flex items-center gap-2"
                        >
                            <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg">
                                {user.first_name.charAt(0).toUpperCase()}
                                {user.last_name.charAt(0).toUpperCase()}
                            </span>

                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                Franklin Chukwubuikem
                            </span>
                        </a>

                        <p className="mt-5 max-w-md text-sm md:text-base leading-7 text-gray-600 dark:text-gray-400">
                            I create clean, meaningful, and engaging visual
                            experiences that help brands communicate their
                            ideas clearly and effectively.
                        </p>

                        {/* SOCIAL LINKS */}
                        <div className="mt-6 flex items-center gap-3">

                            {adminProfile.linkedin_link && (
                                <a
                                    href={adminProfile.linkedin_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
                                >
                                    <BsLinkedin size={18} />
                                </a>
                            )}

                            {adminProfile.instagram_link && (
                                <a
                                    href={adminProfile.instagram_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
                                >
                                    <BsInstagram size={18} />
                                </a>
                            )}

                            {adminProfile.facebook_link && (
                                <a
                                    href={adminProfile.facebook_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
                                >
                                    <BsFacebook size={18} />
                                </a>
                            )}
                        </div>

                    </div>

                    {/* QUICK LINKS */}
                    <div>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3">

                            <li>
                                <a
                                    href="#home"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#about"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    About
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#skills"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    Skills
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#projects"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    Projects
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#testimonials"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                >
                                    Testimonials
                                </a>
                            </li>

                        </ul>

                    </div>

                    {/* CONTACT */}
                    <div>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                            Let's Connect
                        </h3>

                        <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-400">
                            Have a project or idea you'd like to discuss?
                            Let's create something meaningful together.
                        </p>

                        <a
                            href="#contact"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all duration-300"
                        >
                            Get In Touch
                            <ArrowUpRight size={16} />
                        </a>

                    </div>

                </div>

                {/* CTA */}
                <div className="mt-12 p-5 md:p-6 rounded-2xl bg-blue-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

                    <div>
                        <h3 className="text-lg font-bold text-white">
                            Ready to work together?
                        </h3>

                        <p className="mt-1 text-sm text-blue-100">
                            Let's turn your ideas into something great.
                        </p>
                    </div>

                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-all duration-300"
                    >
                        <Mail size={17} />
                        Contact Me
                    </a>

                </div>

                {/* BOTTOM */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500 text-center sm:text-left">
                        © {new Date().getFullYear()} Franklin. All rights reserved.
                    </p>

                    <button
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                        aria-label="Back to top"
                    >
                        <ArrowUp size={18} />
                    </button>

                </div>

            </div>

        </footer>
    );
};

export default Footer;