import { useState, useEffect, useCallback, useContext, createContext } from "react";
import { api } from "../constants/Api";


const QueryContext = createContext();

const QueryContextProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [orderedProjects, setOrderedProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [isDeleteProjectModal, setIsDeleteProjectModal] = useState(false);
    const [isEditProjectModal, setIsEditProjectModal] = useState(false); 
    const [isProjectDetailModal, setIsProjectDetailModal] = useState(false);
    const [totalDelProjects, setTotalDelProjects] = useState(() => {
        const saved = localStorage.getItem("totalDeletedItems");
        return saved !== null ? JSON.parse(saved) : 0;
    });
    const [totalUploadedProjects, setTotalUploadedProjects] = useState(() => {
        const saved = localStorage.getItem("totalLifetimeProjects");
        return saved !== null ? JSON.parse(saved) : 0
    });


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



    const handleDeleteProject = async (id) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.delete(`/project/delete/${id}`);
            handleFetchProjects();
            handleFetchOrderedProjects();
            localStorage.setItem("totalDeletedItems", JSON.stringify(totalDelProjects + 1))
            setIsDeleteProjectModal(false);
            setIsProjectDetailModal(false);

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
        <QueryContext.Provider value={{
            projects, project, setProject, totalDelProjects, errorMessage, loading, handleFetchProject, handleFetchOrderedProjects, orderedProjects, handleFetchProjects, handleDeleteProject, isDeleteProjectModal, setIsDeleteProjectModal, isProjectDetailModal, setIsProjectDetailModal, totalUploadedProjects, setTotalUploadedProjects, isEditProjectModal, setIsEditProjectModal
        }}>
            {children}
        </QueryContext.Provider>
    )
}

export default QueryContextProvider;

export const useQueryContext = () => useContext(QueryContext);