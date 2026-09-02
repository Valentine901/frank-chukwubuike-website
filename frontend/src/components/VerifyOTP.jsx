import { useState, useEffect, useRef } from "react";
import { api } from "../constants/Api";
import { useTheme } from "../Context/ThemeContext";
import { Moon, Sun, ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    // Create an array of references for each input field box
    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        // Strip out non-numeric entries if you only want numbers
        const numericValue = value.replace(/[^0-9]/g, "");
        if (!numericValue) return;

        const newCode = [...code];
        // Only grab the last character typed (handles replacements smoothly)
        newCode[index] = numericValue.substring(numericValue.length - 1);
        setCode(newCode);

        // Move to the next input box automatically if it exists
        if (index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // If pressing backspace on an empty field, shift focus backward
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
            // Focus on the very last box after filling
            if (inputRefs.current[5]) {
                inputRefs.current[5].focus();
            }
        }
    };

    const handleSubmitVerificationCodeForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        // Combine the array into a single 6-digit string for your API payload
        const otpString = code.join("");
        if (otpString.length < 6) {
            setErrorMessage("Please enter all 6 digits of the OTP code.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post("/auth/verify-otp", { code: otpString });
            setCode(["", "", "", "", "", ""]);
            // navigate("/auth/reset-password"); // Example redirection target
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
                        <span className="text-gray-600 dark:text-gray-100 font-heading font-bold">Verify</span>
                        <span className="text-blue-600 font-heading font-bold">OTP Code</span>
                    </div>

                    <div className="text-md md:text-xl text-gray-600 dark:text-gray-500 font-heading mt-2 font-semibold space-y-1">
                        <p>We've sent a 6-digit verification code to your email address.</p>
                        <p>Enter the code below to reset your password.</p>
                    </div>
                </div>

                {/* Right Screen Form Container */}
                <div className="w-full md:w-1/2 justify-center flex flex-col">
                    <form className="flex flex-col border-gray-500 border rounded-2xl px-4 py-8 bg-gray-100 dark:bg-gray-700 w-full max-w-md" onSubmit={handleSubmitVerificationCodeForm}>

                        {errorMessage && <p className="text-center font-heading text-lg pb-2 transition-all duration-300" style={{ color: "red" }}>{errorMessage}</p>}

                        <div className="flex flex-col space-y-3 w-full">
                            <label
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 font-heading text-center md:text-left"
                            >
                                Secure Verification Code
                            </label>

                            {/* 6-Digit Code Input Row */}
                            <div className="flex justify-between gap-2 md:gap-3 w-full" onPaste={handlePaste}>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-bold bg-transparent text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        required
                                    />
                                ))}
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-4 rounded-md p-2 bg-blue-600 hover:bg-blue-700 font-heading text-lg text-gray-100 transition-all duration-300 cursor-pointer mt-6" type="submit" disabled={loading}>
                            {loading ? "Verifying..." : "Verify OTP Code"}
                            <ArrowRightIcon size={20} />
                        </button>

                        <div className="flex items-center justify-between mt-4 w-full">
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                            <span className="px-3 text-gray-500 dark:text-gray-400 font-heading text-sm">or</span>
                            <hr className="w-full border-gray-300 dark:border-gray-600" />
                        </div>

                        <div className="flex space-x-4 items-center justify-center py-4">
                            <span className="text-gray-600 dark:text-gray-300 font-heading text-md">Remember your password?</span>
                            <a href="/auth/login" className="text-blue-600 font-heading text-md cursor-pointer hover:underline">Sign In</a>
                        </div>
                        <div>
                            <a onClick={() => navigate(-1)}  className="text-blue-600 font-heading text-md cursor-pointer hover:underline">Back</a>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default VerifyOTP;
