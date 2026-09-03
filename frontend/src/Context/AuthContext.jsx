import { useContext, createContext, useState, useEffect } from "react";
import { api } from "../constants/Api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    function SaveUserData(data){
        localStorage.setItem("user", data);
    }

    function GetUserData(){
        const user = localStorage.getItem("user");
        setUserData(user);
    }

    const GetCurrentUser = async () => {
        setErrorMessage("");

        try{
            const response = await api.get("/auth/me");
            SaveUserData(response.data);
            console.log("current_user ", response.data);

        } catch (error) {
            if(error.response){
                setErrorMessage(error.response.data.detail);
            } else if (error.request) {
                setErrorMessage(error.request)
            }
             else{
                setErrorMessage("Error occurred");
            }
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        GetUserData();
        console.log("current_user ", userData);
        GetCurrentUser();
    }, [] )

    return (
        <AuthContext.Provider value={{errorMessage, loading, userData}}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);