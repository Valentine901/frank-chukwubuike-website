import { useContext, createContext, useState, useEffect } from "react";
import { api } from "../constants/Api";

const AuthContext = createContext();

const ProtectedRoute = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

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
                setErrorMessage("Error occurred")
            }
        }
    }

    useEffect(() => {
        GetUserData();
        console.log("current_user ", userData);
        GetCurrentUser();
    }, [] )

    return (
        <AuthContext.Provider value={{errorMessage, userData}}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default ProtectedRoute;
export const useAuth = () => useContext(AuthContext);