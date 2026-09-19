// import { useContext, createContext, useState, useEffect, useCallback } from "react";
// import { api } from "../constants/Api";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {

//     const [userData, setUserData] = useState(() => {
//         const savedUser = localStorage.getItem("user");
//         if (savedUser) {
//             try {
//                 return JSON.parse(savedUser);
//             } catch (error) {
//                 return null;
//             }
//         } else {
//             return null;
//         }
//     });
//     const [profile, setProfile] = useState(null);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [adminProfile, setAdminProfile] = useState(() => {
//         const savedAdminProfile = localStorage.getItem("adminProfile");
//         if (savedAdminProfile) {
//             try {
//                 return JSON.parse(savedAdminProfile);
//             } catch (error) {
//                 return null;
//             }
//         } else {
//             return null;
//         }
//     });

//     const [user, setUser] = useState(() => {
//         const savedUserVisitor = localStorage.getItem("userVisitor");
//         if (savedUserVisitor) {
//             try {
//                 return JSON.parse(savedUserVisitor);
//             } catch (error) {
//                 return null;
//             }
//         } else {
//             return null;
//         }
//     });

//     const [loading, setLoading] = useState(true);

//     const localLogout = useCallback(() => {
//         localStorage.removeItem("user");
//         setUserData(null);
//         setProfile(null);
//         setLoading(false);
//     }, []);

//     const RefreshToken = useCallback(async () => {
//         setLoading(true);
//         try {

//             const response = await api.post("/auth/refresh-token");

//             if (userData) {
//                 const updatedUser = {
//                     ...userData,
//                     access_token_expires_at: response.data.access_token_expires_at
//                 };
//                 SaveUserData(updatedUser);
//                 setUserData(updatedUser);
//             }
//             return response.data;
//         } catch (error) {
//             // If refresh token fails, log user out
//             localLogout();
//             throw error;
//         } finally{
//             setLoading(false);
//         }
//     }, [userData, localLogout])

//     const SaveUserData = (data) => {
//         localStorage.setItem("user", JSON.stringify(data));
//     }

//     const handleAxiosError = (error, fallbackMessage) => {
//         if (error.response?.data?.detail) {
//             setErrorMessage(error.response.data.detail);
//         } else if (error.request) {
//             setErrorMessage("No response from server, Check your network")
//         } else {
//             setErrorMessage(fallbackMessage);
//         }
//     }

//     const getAdminVisitorProfile = async () => {
//         setErrorMessage("");
//         setLoading(true);

//         try{
//             const response = await api.get("/admin/profile/portfolio-visitors");
//             setAdminProfile(response.data);
//             localStorage.setItem("adminProfile", JSON.stringify(response.data));
//         } catch(error) {
//             handleAxiosError(error);
//         } finally{
//             setLoading(false);
//         }
//     }


//     const getCurrentUser = useCallback(async () => {
//         setErrorMessage("");
//         setLoading(true);
//         try {
//             const response = await api.get("/auth/me");
//             SaveUserData(response.data);
//             setUserData(response.data);
//             return response.data;

//         } catch (error) {
//             handleAxiosError(error, "Failed to authenticate session");
//             localLogout();
//         }finally{
//             setLoading(false);
//         }
//     }, [localLogout]);

//     const getUserProfileData = useCallback(async () => {
//         setErrorMessage("");
//         setLoading(true);

//         try {
//             const response = await api.get("/admin/profile/");
//             setProfile(response.data);
//         } catch (error) {
//             handleAxiosError(error, "Error fetching profile details");
//         } finally{
//             setLoading(false);
//         }
//     }, [])

//     const logout = async () => {
//         setLoading(true);
//         try {
//             await api.post("/auth/logout");
//         } catch (error) {
//             handleAxiosError(error, "Failed to log you out");
//         } finally {
//             localLogout();
//         } 
//     }

//     const fetchUserVisitor = async () =>{
//         setErrorMessage("");
//         setLoading(true);

//         try {
//             const response = await api.get("/auth/me-visitors");
//             setUser(response.data);
//             localStorage.setItem("userVisitor", JSON.stringify(response.data));
//         } catch (error) {
//             handleAxiosError(error, "Error fetching profile details");
//         } finally{
//             setLoading(false);
//         }
//     }

    

//     useEffect(() => {
//         const responseInterceptor = api.interceptors.response.use(
//             // if success, continue smoothly with app
//             (response) => response,

//             // if error, check and know if token expires
//             async (error) => {
//                 const originalRequest = error.config;
//                 // copy the original request and check if error is 401 or  user already tried the original request
//                 if (error.response?.status === 401 && !originalRequest._retry) {
//                     // check if user was tryimg to access loginor refresh-token endpint unauthorized
//                     if (originalRequest.url.includes("/auth/login") || originalRequest.url.includes("/auth/refresh-token")) {
//                         // send them normal 401 error not authorized
//                         return Promise.reject(error);
//                     }
//                     // if user haven't tried original request, let them try
//                     originalRequest._retry = true;
//                     originalRequest.baseURL = api.defaults.baseURL;
//                     try {
//                         // create new access toke
//                         await RefreshToken();
//                         // retry their original request
//                         return api(originalRequest);
//                     } catch (refreshError) {
//                         return Promise.reject(refreshError);
//                     }
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             api.interceptors.response.eject(responseInterceptor)
//         }
//     }, [RefreshToken])

//     useEffect(() => {
//         const initializeAuth = async () => {
//             setLoading(true);

//             const savedUser = localStorage.getItem("user");
//             if (!savedUser){
//                 setLoading(false);
//                 return;
//             }

//             try{
//                 await Promise.all([
//                 getUserProfileData(),
//                 getCurrentUser()
//             ]);
//             } catch (error) {
//                 setErrorMessage(error);
//             } finally{
//                 setLoading(false);
//             }

//     }

//     initializeAuth();
//     }, [getCurrentUser, getUserProfileData])

//     // 
//     useEffect(() => {
//         fetchUserVisitor();
//         getAdminVisitorProfile();
//     }, [])

//     return (
//         <AuthContext.Provider value={{ errorMessage, loading, userData, profile, logout, getCurrentUser, getUserProfileData, adminProfile, user }}>
//             {children}
//         </AuthContext.Provider>
//     )

// }


// export default AuthProvider;
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider")
//     }

//     return context;
// };




import { useContext, createContext, useState, useEffect, useCallback } from "react";
import { api } from "../constants/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try { return JSON.parse(savedUser); } catch { return null; }
        }
        return null;
    });
    
    const [profile, setProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    
    const [adminProfile, setAdminProfile] = useState(() => {
        const savedAdminProfile = localStorage.getItem("adminProfile");
        if (savedAdminProfile) {
            try { return JSON.parse(savedAdminProfile); } catch { return null; }
        }
        return null;
    });

    const [user, setUser] = useState(() => {
        const savedUserVisitor = localStorage.getItem("userVisitor");
        if (savedUserVisitor) {
            try { return JSON.parse(savedUserVisitor); } catch { return null; }
        }
        return null;
    });

    const [loading, setLoading] = useState(true);

    const localLogout = useCallback(() => {
        localStorage.removeItem("user");
        setUserData(null);
        setProfile(null);
        setLoading(false);
    }, []);

    const RefreshToken = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.post("/auth/refresh-token");
            if (userData) {
                const updatedUser = {
                    ...userData,
                    access_token_expires_at: response.data.access_token_expires_at
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUserData(updatedUser);
            }
            return response.data;
        } catch (error) {
            localLogout();
            throw error;
        } finally {
            setLoading(false);
        }
    }, [userData, localLogout]);

    const handleAxiosError = useCallback((error, fallbackMessage) => {
        if (error.response?.data?.detail) {
            setErrorMessage(error.response.data.detail);
        } else if (error.request) {
            setErrorMessage("No response from server, Check your network");
        } else {
            setErrorMessage(fallbackMessage || "An error occurred");
        }
    }, []);

    const getAdminVisitorProfile = useCallback(async () => {
        try {
            const response = await api.get("/admin/profile/portfolio-visitors");
            setAdminProfile(response.data);
            localStorage.setItem("adminProfile", JSON.stringify(response.data));
        } catch (error) {
            handleAxiosError(error, "Failed to load admin profile");
        }
    }, [handleAxiosError]);

    const getCurrentUser = useCallback(async () => {
        try {
            const response = await api.get("/auth/me");
            localStorage.setItem("user", JSON.stringify(response.data));
            setUserData(response.data);
            return response.data;
        } catch (error) {
            handleAxiosError(error, "Failed to authenticate session");
            localLogout();
        }
    }, [localLogout, handleAxiosError]);

    const getUserProfileData = useCallback(async () => {
        try {
            const response = await api.get("/admin/profile/");
            setProfile(response.data);
        } catch (error) {
            handleAxiosError(error, "Error fetching profile details");
        }
    }, [handleAxiosError]);

    const fetchUserVisitor = useCallback(async () => {
        try {
            const response = await api.get("/auth/me-visitors");
            setUser(response.data);
            localStorage.setItem("userVisitor", JSON.stringify(response.data));
        } catch (error) {
            handleAxiosError(error, "Error fetching visitor details");
        }
    }, [handleAxiosError]);

    const logout = async () => {
        setLoading(true);
        try {
            await api.post("/auth/logout");
        } catch (error) {
            handleAxiosError(error, "Failed to log you out");
        } finally {
            localLogout();
        } 
    };

    // Response Interceptor setup
    useEffect(() => {
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (originalRequest.url.includes("/auth/login") || originalRequest.url.includes("/auth/refresh-token")) {
                        return Promise.reject(error);
                    }
                    originalRequest._retry = true;
                    try {
                        await RefreshToken();
                        return api(originalRequest);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [RefreshToken]);

    // ✅ FIXED: Sequence fetches public data immediately and removes loading hold smoothly
    useEffect(() => {
        const initializeAuthAndData = async () => {
            setLoading(true);
            try {
                const savedUser = localStorage.getItem("user");
                
                // Fetch public visitor data sets 
                await Promise.allSettled([
                    fetchUserVisitor(),
                    getAdminVisitorProfile()
                ]);

                // Authenticate only if account credentials exist
                if (savedUser) {
                    await Promise.allSettled([
                        getUserProfileData(),
                        getCurrentUser()
                    ]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); 
            }
        };

        initializeAuthAndData();
    }, [getCurrentUser, getUserProfileData, fetchUserVisitor, getAdminVisitorProfile]);

    return (
        <AuthContext.Provider value={{ errorMessage, loading, userData, profile, logout, getCurrentUser, getUserProfileData, adminProfile, user, handleAxiosError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
