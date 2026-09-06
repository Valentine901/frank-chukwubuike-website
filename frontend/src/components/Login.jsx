import { useState, useEffect } from "react";
import { api } from "../constants/Api";
import { Mail, Lock, Eye, EyeClosed, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { getCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmitLoginForm = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Fill the login fields");
            return;
        }
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.post("/auth/login", { email: email, password: password });
            await getCurrentUser();
            navigate("/auth/admin-dashboard");
            return response;
            
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
        }, 4000); 
        return () => clearTimeout(timer)
    }, [errorMessage])

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-all duration-300 p-4 sm:p-6 md:p-12">
            
            {/* container wrapper  */}
            <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-8 lg:gap-16 xl:gap-24 my-auto">
                
                {/* Left Screen and Welcome Text */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 max-w-xl">
                    <div className="flex flex-wrap justify-center lg:justify-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl gap-2 sm:gap-3">
                        <span className="text-gray-600 dark:text-gray-100 font-heading font-bold">Admin</span>
                        <span className="text-blue-600 font-heading font-bold">Login</span>
                    </div>

                    <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-500 font-heading mt-3 sm:mt-4 font-semibold max-w-md lg:max-w-none">
                        <p>Welcome back! Please sign in to your admin account.</p>
                    </div>
                </div>

                {/* Right screen Form Container */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <form 
                        className="flex flex-col border-gray-500 border rounded-2xl px-4 py-6 sm:py-8 bg-gray-100 dark:bg-gray-700 w-full max-w-md shadow-md" 
                        onSubmit={handleSubmitLoginForm}
                    >
                        {errorMessage && (
                            <p className="text-center font-heading text-sm sm:text-base pb-3 transition-all duration-300 text-red-600 font-semibold">
                                {errorMessage}
                            </p>
                        )}

                       {/* Email Address input */}
                        <div className="flex flex-col space-y-2 w-full">
                            <label
                                htmlFor="email"
                                className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-300 font-heading"
                            >
                                Email Address
                            </label>

                            <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-600 px-3 py-1.5 sm:py-2.5 rounded-xl w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                                <Mail className="text-gray-400 dark:text-gray-500 shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 py-1 sm:py-2 dark:placeholder-gray-500 focus:outline-none text-base sm:text-lg"
                                    required
                                />
                            </div>
                        </div>

                        
                        <div className="flex flex-col space-y-2 w-full mt-4">
                            <label
                                htmlFor="password"
                                className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-300 font-heading"
                            >
                                Password
                            </label>

                            <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-600 px-3 py-1.5 sm:py-2.5 rounded-xl w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                                <Lock className="text-gray-400 dark:text-gray-500 shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your password"
                                    className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 py-1 sm:py-2 dark:placeholder-gray-500 focus:outline-none text-base sm:text-lg"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="focus:outline-none text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 shrink-0"
                                >
                                    {showPassword ? <EyeClosed className="w-5 h-5 sm:w-6 sm:h-6" /> : <Eye className="w-5 h-5 sm:w-6 sm:h-6" />}
                                </button>
                            </div>
                        </div>

                        
                        <div className="flex my-2">
                            <a href="/auth/forgot-password" className="text-gray-600 dark:text-gray-100 font-heading font-semibold py-3 hover:underline text-lg">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button 
                            className="w-full flex items-center justify-center rounded-full px-4 py-3 font-bold bg-blue-600 hover:bg-blue-700 font-heading text-base sm:text-lg text-gray-100 transition-all duration-300 cursor-pointer" 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6" /> : "Sign In"}
                        </button>

                        {/* Decorative Splitter Line */}
                        <div className="flex items-center justify-between mt-6 w-full">
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                            <span className="px-3 text-gray-400 dark:text-gray-500 font-heading text-sm">or</span>
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                        </div>
                        
                        {/* Footer Subtext and Redirection Links */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-center">
                            <span className="text-gray-600 dark:text-gray-300 font-heading text-sm sm:text-base font-medium">
                                Not an admin?
                            </span>
                            <a href="/" className="text-blue-600 font-heading text-sm sm:text-base font-bold hover:underline cursor-pointer">
                                Go back to site
                            </a>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login;
