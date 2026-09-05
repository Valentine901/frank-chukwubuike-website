import { useState, useEffect, useRef } from "react";
import { api } from "../constants/Api";
import { useTheme } from "../Context/ThemeContext";
import { Moon, Sun, Loader2, BadgeCheck, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        const numericValue = value.replace(/[^0-9]/g, "");
        if (!numericValue) return;

        const newCode = [...code];
        newCode[index] = numericValue.substring(numericValue.length - 1);
        setCode(newCode);

        if (index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (code[index] === "") {
                if (index > 0 && inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1].focus();
                    const newCode = [...code];
                    newCode[index - 1] = "";
                    setCode(newCode);
                }
            } else {
                const newCode = [...code];
                newCode[index] = "";
                setCode(newCode);
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);

        if (pastedData.length === 6) {
            const pastedArray = pastedData.split("");
            setCode(pastedArray);
            if (inputRefs.current[5]) {
                inputRefs.current[5].focus();
            }
        }
    };

    const handleSubmitVerificationCodeForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const otpString = code.join("");
        if (otpString.length < 6) {
            setErrorMessage("Please enter all 6 digits of the OTP code.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post("/auth/verify-otp", { code: otpString });
            setCode(["", "", "", "", "", ""]);
            navigate("/auth/password-reset");
        } catch (error) {
            if (error.response) {
                const detail = error.response.data.detail;
                const message = typeof detail === "string" ? detail : "Invalid input parameters.";
                setErrorMessage(message);
            } else {
                setErrorMessage("Network error: OTP code verification failed.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 4000);
        return () => clearTimeout(timer);
    }, [errorMessage]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-all duration-300 p-4 sm:p-6 md:p-12 relative">

            {/* Main Wrapper Container  */}
            <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-8 lg:gap-16 xl:gap-24 my-auto">

                {/* Left Screen  and Welcome Text */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 max-w-xl">
                    <div className="flex flex-wrap justify-center lg:justify-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl gap-2 sm:gap-3">
                        <span className="text-gray-600 dark:text-gray-100 font-heading font-bold">Verify</span>
                        <span className="text-blue-600 font-heading font-bold">OTP Code</span>
                    </div>

                    <div className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 font-heading mt-3 sm:mt-4 font-semibold max-w-md lg:max-w-none">
                        <p>We've sent a 6-digit verification code to your email address.</p>
                        <p className="mt-1">Enter the code below to reset your password.</p>
                    </div>
                </div>

                {/* Right Screen form Container */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <form
                        className="flex flex-col border-gray-500 border rounded-2xl px-4 py-6 sm:py-8 bg-gray-100 dark:bg-gray-700 w-full max-w-md shadow-md"
                        onSubmit={handleSubmitVerificationCodeForm}
                    >
                        {errorMessage && (
                            <p className="text-center font-heading text-sm sm:text-base pb-3 transition-all duration-300 text-red-600 font-semibold">
                                {errorMessage}
                            </p>
                        )}

                        <div className="flex flex-col space-y-3 w-full">
                            <div className="flex justify-center items-center mx-auto text-center">
                                <ShieldCheck className="text-blue-600 mx-auto" size={56} />
                            </div>

                            <label className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-300 font-heading text-center lg:text-left">
                                Secure Verification Code
                            </label>

                            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-heading">
                                Enter 6-digit code
                            </span>

                            {/* 6-Digit Code Input Row */}
                            <div className="flex justify-between items-center gap-1 sm:gap-2 w-full pt-1" onPaste={handlePaste}>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl font-bold bg-transparent text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        required
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            className="w-full flex items-center justify-center gap-3 rounded-xl px-4 py-3 bg-blue-600 hover:bg-blue-700 font-heading text-base sm:text-lg font-bold text-gray-100 transition-all duration-300 cursor-pointer mt-6"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <Loader2 size={22} className="animate-spin" /> : "Verify OTP Code"}
                        </button>

                        <div className="flex items-center justify-between mt-6 w-full">
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                            <span className="px-3 text-gray-400 dark:text-gray-500 font-heading text-sm">or</span>
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                        </div>


                        <div className="flex space-x-4 items-center justify-center pt-4">

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
    );
};

export default VerifyOTP;
