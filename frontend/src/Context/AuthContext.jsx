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

    const localLogout = useCallback(() => {
        localStorage.removeItem("user");
        setUserData(null);
        setProfile(null);
    }, []);

    const RefreshToken = useCallback(async () => {
        try {

            const response = await api.post("/auth/refresh-token");

            if (userData) {
                const updatedUser = {
                    ...userData,
                    access_token_expires_at: response.data.access_token_expires_at
                };
                SaveUserData(updatedUser);
                setUserData(updatedUser);
            }
            return response.data;
        } catch (error) {
            // If refresh token fails, log user out
            localLogout();
            throw error;
        }
    }, [userData, localLogout])

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
            localLogout();
        }
    }, [localLogout]);

    const getUserProfileData = useCallback(async () => {
        setErrorMessage("");

        try {
            const response = await api.get("/admin/profile/");
            setProfile(response.data);
        } catch (error) {
            handleAxiosError(error, "Error fetching profile details");
        }
    }, [])

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            handleAxiosError(error, "Failed to log you out");
        } finally {
            localLogout();
        }
    }

    

    useEffect(() => {
        const responseInterceptor = api.interceptors.response.use(
            // if success, continue smoothly with app
            (response) => response,

            // if error, check and know if token expires
            async (error) => {
                const originalRequest = error.config;
                // copy the original request and check if error is 401 or  user already tried the original request
                if (error.response?.status === 401 && !originalRequest._retry) {
                    // check if user was tryimg to access loginor refresh-token endpint unauthorized
                    if (originalRequest.url.includes("/auth/login") || originalRequest.url.includes("/auth/refesh-token")) {
                        // send them normal 401 error not authorized
                        return Promise.reject(error);
                    }
                    // if user haven't tried original request, let them try
                    originalRequest._retry = true;

                    try {
                        // create new access toke
                        await RefreshToken();
                        // retry their original request
                        return api(originalRequest);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [RefreshToken])

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