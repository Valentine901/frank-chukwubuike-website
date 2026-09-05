import { useState, useEffect } from "react";
import { api } from "../constants/Api";
import { Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitResetPasswordForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.post("/auth/reset-password", { email: email });
            setEmail("");

            if(response.status === 200){
                navigate("/auth/verify-otp")
            }
        } catch (error) {
            if (error.response) {
                const detail = error.response.data.detail;
                const message = typeof detail === "string" ? detail : "Invalid input parameters.";
                setErrorMessage(message);
            } else {
                setErrorMessage("Network error: OTP request failed.");
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
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-all duration-300 p-4 sm:p-6 md:p-12">

            {/* container wrapper  */}
            <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-8 lg:gap-16 xl:gap-24 my-auto">

                {/* Left Screen  and Welcome Text */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 max-w-xl">
                    <div className="flex flex-wrap justify-center lg:justify-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl gap-2 sm:gap-3">
                        <span className="text-gray-600 dark:text-gray-100 font-heading font-bold">Forgot</span>
                        <span className="text-blue-600 font-heading font-bold">Password</span>
                    </div>

                    <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-500 font-heading mt-3 sm:mt-4 font-semibold max-w-md lg:max-w-none">
                        <p>No worries? Enter your email address and we'll send you an OTP to reset your password.</p>
                    </div>
                </div>

                {/* Right screen Form Container */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <form 
                        className="flex flex-col border-gray-500 border rounded-2xl px-4 py-6 sm:py-8 bg-gray-100 dark:bg-gray-700 w-full max-w-md shadow-md" 
                        onSubmit={handleSubmitResetPasswordForm}
                    >
                        <div className="flex justify-center items-center mx-auto p-1 h-12 w-12 sm:h-14 sm:w-14 text-center text-blue-600">
                            <Mail size={40} className="sm:w-12 sm:h-12" />
                        </div>

                        {errorMessage && (
                            <p className="text-center font-heading text-sm sm:text-base pb-2 transition-all duration-300 text-red-600 font-semibold">
                                {errorMessage}
                            </p>
                        )}

                        <div className="flex flex-col space-y-2 w-full">
                            <label
                                htmlFor="email"
                                className="text-base sm:text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300 font-heading"
                            >
                                Email Address
                            </label>

                            <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-600 px-3 py-1.5 sm:py-2.5 rounded-xl w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                                <Mail size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 py-1 sm:py-2 md:py-3 dark:placeholder-gray-500 focus:outline-none text-base sm:text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            className="w-full flex items-center justify-center gap-3 rounded-full px-4 py-3 bg-blue-600 hover:bg-blue-700 font-heading text-base sm:text-lg font-bold text-gray-100 transition-all duration-300 cursor-pointer mt-5" 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Reset OTP code"}
                        </button>

                        <div className="flex items-center justify-between mt-6 w-full">
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                            <span className="px-3 text-gray-400 dark:text-gray-500 font-heading text-sm">or</span>
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                        </div>

                      
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-center">
                            <span className="text-gray-600 dark:text-gray-300 font-heading text-lg sm:text-md font-medium">
                                Remember your password?
                            </span>
                            <a href="/auth/login" className="text-blue-600 font-heading text-lg sm:text-md font-bold hover:underline cursor-pointer">
                                Sign In
                            </a>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default ForgotPassword;
