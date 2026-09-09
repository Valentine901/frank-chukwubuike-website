import { useState, useEffect, useCallback, useContext, createContext } from "react";
import { api } from "../constants/Api";


const QueryContext = createContext();

const QueryContextProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [orderedProjects, setOrderedProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [testimonials, setTestimonals] = useState([]);
    const [project, setProject] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAxiosError = (error, fallbackMessage) => {
        if (error.response) {
            setErrorMessage(error?.response?.data?.detail);
        } else if (error.request) {
            setErrorMessage("No response from server, Check your network");
        } else {
            setErrorMessage(fallbackMessage);
        }
    }

    const handleFetchProjects = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.get("/project/projects");
            setProjects(response.data);

        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }

    const handleFetchOrderedProjects = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.get("/project/projects/ordered-by-created");
            setOrderedProjects(response.data);

        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }



    const handleFetchProject = async (id) => {
        setLoading(true);
        setErrorMessage("");

        try {
            console.log("ID: ", id)
            const response = await api.get(`/project/${id}`);
            setProject(response.data);

        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleFetchProjects();
        handleFetchOrderedProjects();
    }, [])

    return (
        <QueryContext.Provider value={{ projects, project, setProject, skills, errorMessage, loading, handleFetchProject, handleFetchOrderedProjects, orderedProjects, handleFetchProjects }}>
            {children}
        </QueryContext.Provider>
    )
}

export default QueryContextProvider;

export const useQueryContext = () => useContext(QueryContext);