import { useState, useEffect } from "react";
import { api } from "../constants/Api";
import { useTheme } from "../Context/ThemeContext";
import { Moon, Sun, Mail, Lock, Eye, EyeClosed, ArrowRightIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleSubmitLoginForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");


        try {

            if (password !== confirmPassword) {
                setErrorMessage("Password does not match.");
                setLoading(false);
                return;
            }

            const response = await api.put("/auth/change-password", { email: email, password: password });
            setPassword("");
            setEmail("");
            navigate("/auth/admin-dashboard")
        } catch (error) {
            if (error.response) {
                const detail = error.response.data.detail;
                const message = typeof detail === "string" ? detail : "Invalid input parameters.";
                setErrorMessage(message);
            } else {
                setErrorMessage("Network error: Password reset failed.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 4000);
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
                        <span className="text-gray-600 dark:text-gray-100 font-heading font-bold">Reset</span>
                        <span className="text-blue-600 font-heading font-bold">Password</span>
                    </div>

                    <div className="text-md md:text-xl text-gray-600 dark:text-gray-500 font-heading mt-2 font-semibold">
                        <p>Create a new password for your account to keep your account secure.</p>
                    </div>
                </div>

                {/* Right Screen Form Container */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <form className="flex flex-col border-gray-500 border rounded-2xl px-4 py-8 bg-gray-100 dark:bg-gray-700 w-full max-w-md" onSubmit={handleSubmitLoginForm}>

                        <div className="flex justify-center items-center mx-auto p-1 h-14 w-14 text-center">
                            <Lock className="text-blue-600 mx-auto" size={48} />
                        </div>

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
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
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

                        {/* confirm password */}
                        <div className="flex flex-col space-y-2 w-full mt-3">
                            <label
                                htmlFor="confirm password"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 font-heading"
                            >
                                Confirm Password
                            </label>

                            <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-600 px-3 py-2.5 rounded-xl w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                                <Lock size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
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

                        <button
                            className="w-full flex items-center justify-center gap-4 rounded-md p-2 mt-5 bg-blue-600 hover:bg-blue-700 font-heading text-lg text-gray-100 transition-all duration-300 cursor-pointer" type="submit" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Reset Password"}
                        </button>
                        <div className="flex space-x-4 items-center justify-center py-4">
                            <span className="text-gray-600 dark:text-gray-300 font-heading text-md">Remembered your password?</span>
                            <a href="/auth/login" className="text-blue-600 font-heading text-md cursor-pointer hover:underline">Sign In</a>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default PasswordReset;
