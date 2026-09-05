import { useState, useEffect } from "react";
import { api } from "../constants/Api";
import { useTheme } from "../Context/ThemeContext";
import { Moon, Sun, Mail, Lock, Eye, EyeClosed, ArrowRightIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { getCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmitLoginForm = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Fill the login fields")
        }
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.post("/auth/login", { email: email, password: password });
            // setPassword("");
            // setEmail("");
            await getCurrentUser();
            navigate("/auth/admin-dashboard")
            
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.detail);
            } else {
                setErrorMessage("Network error: Login failed.");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errorMessage) setErrorMessage("");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errorMessage) setErrorMessage("");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 4000); // Fixed dependency array bracket issue inside setTimeout
        return () => clearTimeout(timer)
    }, [errorMessage])

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-all duration-300 p-6 md:p-12">
            <div className="absolute top-10 right-10 p-2 bg-gray-200 dark:bg-gray-600 rounded-full transition-all duration-300 z-50">
                {theme === "dark" ? <Sun onClick={toggleTheme} className="text-orange-200 cursor-pointer" size={24} /> :
                    <Moon onClick={toggleTheme} className="cursor-pointer" size={24} />
                }
            </div>

            
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-md md:max-w-4xl gap-8 md:gap-16 mt-12 md:mt-0">
                
                {/* Left Screen Header and Welcome Text */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2">
                    <div className="flex text-2xl md:text-3xl lg:text-4xl gap-3">
                        <span className="text-gray-600 dark:text-gray-100 font-heading font-bold">Admin</span>
                        <span className="text-blue-600 font-heading font-bold">Login</span>
                    </div>

                    <div className="text-md md:text-xl text-gray-600 dark:text-gray-500 font-heading mt-2 font-semibold">
                        <p>Welcome back! Please sign in to your admin account.</p>
                    </div>
                </div>

                {/* Right Screen Form Container */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <form className="flex flex-col border-gray-500 border rounded-2xl px-4 py-8 bg-gray-100 dark:bg-gray-700 w-full max-w-md" onSubmit={handleSubmitLoginForm}>

                        {errorMessage && <p className="text-center font-heading text-lg pb-2 transition-all duration-300" style={{ color: "red" }}>{errorMessage}</p>}

                        <div className="flex flex-col space-y-2 w-full">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 font-heading"
                            >
                                Email Address
                            </label>

                            <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-600 px-3 py-2.5 rounded-xl w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                                <Mail size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 w-full mt-3">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 font-heading"
                            >
                                Password
                            </label>

                            <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-600 px-3 py-2.5 rounded-xl w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                                <Lock size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your password"
                                    className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="focus:outline-none text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex my-2">
                            <a href="/auth/forgot-password" className="text-blue-600 font-heading font-normal py-3 hover:underline text-sm ">Forgot password?</a>
                        </div>

                        <button 
                        className="w-full flex items-center justify-center rounded-md p-2 bg-blue-600 hover:bg-blue-700 font-heading text-lg text-gray-100 transition-all duration-300 cursor-pointer" type="submit" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
                        </button>

                        <div className="flex items-center justify-between mt-4 w-full">
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                            <span className="px-3 text-gray-500 dark:text-gray-400 font-heading text-sm">or</span>
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                        </div>
                        
                        <div className="flex space-x-4 items-center justify-center py-4">
                            <span className="text-gray-600 dark:text-gray-300 font-heading text-md">Not an admin?</span>
                            <a href="/" className="text-blue-600 font-heading text-md">Go back to site</a>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login;
