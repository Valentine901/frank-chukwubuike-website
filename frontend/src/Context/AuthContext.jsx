import { useContext, createContext, useState, useEffect, useCallback } from "react";
import { api } from "../constants/Api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (error) {
                return null;
            }
        } else {
            return null;
        }
    });
    const [profile, setProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const SaveUserData = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
    }

    const handleAxiosError = (error, fallbackMessage) => {
        if (error.response?.data?.detail) {
            setErrorMessage(error.response.data.detail);
        } else if (error.request) {
            setErrorMessage("No response from server, Check your network")
        } else {
            setErrorMessage(fallbackMessage);
        }
    }


    const getCurrentUser = useCallback(async () => {
        setErrorMessage("");

        try {
            const response = await api.get("/auth/me");
            SaveUserData(response.data);
            setUserData(response.data);
            return response.data;

        } catch (error) {
            handleAxiosError(error, "Failed to authenticate session");
            localStorage.removeItem("user");
            setUserData(null);
        }
    }, []);

    const getUserProfileData = useCallback(async () => {
        setErrorMessage("");

        try {
            const response = await api.get("/admin/profile/");
            setProfile(response.data);
        } catch (error) {
            handleAxiosError(error, "Error fetching profile details");
        }
    }, [])

    const logout = async() => {
        try {
            await api.post("/auth/logout");
            setUserData(null);
            setProfile(null);
        } catch (error) {
            handleAxiosError(error, "Failed to log you out");
        }
    }

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);
            await getUserProfileData();
            await getCurrentUser();
            setLoading(false);
        }

        initializeAuth();
    }, [getCurrentUser, getUserProfileData])

    return (
        <AuthContext.Provider value={{ errorMessage, loading, userData, profile, logout, getCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
};