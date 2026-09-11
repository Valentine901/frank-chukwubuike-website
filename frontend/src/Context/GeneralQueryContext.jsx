import { useState, useEffect, useCallback, useContext, createContext } from "react";
import { api } from "../constants/Api";


const QueryContext = createContext();

const QueryContextProvider = ({ children }) => {

    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [orderedProjects, setOrderedProjects] = useState([]);
    const [isDeleteProjectModal, setIsDeleteProjectModal] = useState(false);
    const [isEditProjectModal, setIsEditProjectModal] = useState(false);
    const [isProjectDetailModal, setIsProjectDetailModal] = useState(false);

    const [totalUploadedProjects, setTotalUploadedProjects] = useState(() => {
        const saved = localStorage.getItem("totalLifetimeProjects");
        return saved !== null ? JSON.parse(saved) : 0
    });


    const [skills, setSkills] = useState([]);
    const [isSkillUploadModal, setIsSkillUploadModal] = useState(false);



    const [testimonials, setTestimonials] = useState([]);
    const [isTestimonialCreateModal, setIsTestimonialCreateModal] = useState(false);
    const [isTestimonialEditModal, setIsTestimonialEditModal] = useState(false);
    const [isTestimonialDeleteModal, setIsTestimonialDeleteModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // error function handler 
    const handleAxiosError = (error, fallbackMessage) => {
        if (error.response) {
            setErrorMessage(error?.response?.data?.detail);
        } else if (error.request) {
            setErrorMessage("No response from server, Check your network");
        } else {
            setErrorMessage(fallbackMessage);
        }
    }

    const saveToLocalStorage = (key, value) => {
        try {
            const stringifiedValue = JSON.stringify(value);
            localStorage.setItem(`${key}`, stringifiedValue);
        } catch (error) {
            console.log("Your name was not saved")
        }

    }

    const getFromLocalStorage = (key) => {
        try {
            const saved = localStorage.getItem(JSON.parse(key));
            return saved;

        } catch (error) {
           console.log("Wrong keyword");
        }
    }


    // SKILLS LOGIC SECTION
    const handleFetchSkills = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.get("/skill/skills");
            setSkills(response.data);

        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }


    const handleDeleteSkill = async (id) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.delete(`skill/delete/${id}`);
            handleFetchSkills()
            return true;

        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }



    // TESTIMONIALS LOGIC SECTION

    const handleFetchTestimonials = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.get("/testimonial/testimonials");
            setTestimonials(response.data);
            console.log("testimonial", response.data);
        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }

    // const handleFetchTestimonial = async (id) => {
    //     setLoading(true);
    //     setErrorMessage("");

    //     try {
    //         const response = await api.get(`testimonial/${id}`);
    //         setTestimonial(response.data);
    //     } catch (error) {
    //         handleAxiosError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const handleDeleteTestimonial = async (id) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.delete(`testimonial/delete/${id}`);
            handleFetchTestimonials()
            return true;

        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }


    // PROJECTS LOGIC SECTION

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
        handleFetchTestimonials();
        handleFetchSkills();
        handleFetchProjects();
        handleFetchOrderedProjects();
    }, [])

    return (
        <QueryContext.Provider value={{
            projects, project, setProject, errorMessage, loading, handleFetchProject, handleFetchOrderedProjects, orderedProjects, handleFetchProjects, handleDeleteProject, handleDeleteSkill, isDeleteProjectModal, setIsDeleteProjectModal, isProjectDetailModal, setIsProjectDetailModal,  setTotalUploadedProjects, isEditProjectModal, setIsEditProjectModal, isSkillUploadModal, setIsSkillUploadModal, isTestimonialCreateModal, setIsTestimonialCreateModal, handleFetchTestimonials, testimonials,
            handleFetchSkills, skills
        }}>
            {children}
        </QueryContext.Provider>
    )
}

export default QueryContextProvider;

export const useQueryContext = () => useContext(QueryContext);