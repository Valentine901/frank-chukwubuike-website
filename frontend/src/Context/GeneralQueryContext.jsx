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

    const [totalDelProjects, setTotalDelProjects] = useState(() => {
        const saved = localStorage.getItem("totalDeletedItems");
        return saved !== null ? JSON.parse(saved) : 0;
    });
    const [totalUploadedProjects, setTotalUploadedProjects] = useState(() => {
        const saved = localStorage.getItem("totalLifetimeProjects");
        return saved !== null ? JSON.parse(saved) : 0
    });


    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState(null);
    const [isSkillEditModal, setIsSkillEditModal] = useState(false);
    const [isSkillUploadModal, setIsSkillUploadModal] = useState(false);
    const [isSkillDetailModal, setIsSkillDetailModal] = useState(false);
    const [isSkillDeleteModal, setIsSkillDeleteModal] = useState(false);
    const [totalSkills, setTotalSkill] = useState(() => {
        const saved = localStorage.getItem("totalSkills");
        return saved !== null ? JSON.parse(saved) : 0;
    })


    const [testimonials, setTestimonials] = useState([]);
    const [testimonial, setTestimonial] = useState(null);
    const [isTestimonialEditModal, setIsTestimonialEditModal] = useState(false);
    const [isTestimonialDeleteModal, setIsTestimonialDeleteModal] = useState(false);
    const [totalTestimonials, setTotalTestimonials] = useState(() => {
        const saved = localStorage.getItem("totalTestimonials");
        return saved !== null ? JSON.parse(saved) : 0;
    })

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

// SKILLS LOGIC SECTION
    const handleFetchSkills = async () => {
        setLoading(true);
        setErrorMessage("");
        
        try{
            const response = await api.get("/skill/skills");
            setSkills(response.data);
            console.log("skills", response.data);

        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }

    const handleFetchSkill = async (id) => {
        setLoading(true);
        setErrorMessage("");

        try{
            const response = await api.get(`single-skill/${id}`);
            setSkill(response.data);
        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteSKill = async (id) => {
        setLoading(true);
        setErrorMessage("");

        try{
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
        
        try{
            const response = await api.get("/testimonial/testimonials");
            setTestimonials(response.data);
        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }

    const handleFetchTestimonial = async (id) => {
        setLoading(true);
        setErrorMessage("");

        try{
            const response = await api.get(`testimonial/${id}`);
            setTestimonial(response.data);
        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteTestimonial = async (id) => {
        setLoading(true);
        setErrorMessage("");

        try{
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
        handleFetchSkills();
        handleFetchProjects();
        handleFetchOrderedProjects();
    }, [])

    return (
        <QueryContext.Provider value={{
            projects, project, setProject, totalDelProjects, errorMessage, loading, handleFetchProject, handleFetchOrderedProjects, orderedProjects, handleFetchProjects, handleDeleteProject, isDeleteProjectModal, setIsDeleteProjectModal, isProjectDetailModal, setIsProjectDetailModal, totalUploadedProjects, setTotalUploadedProjects, isEditProjectModal, setIsEditProjectModal, isSkillUploadModal, setIsSkillUploadModal,
            handleFetchSkills, skills, skill
        }}>
            {children}
        </QueryContext.Provider>
    )
}

export default QueryContextProvider;

export const useQueryContext = () => useContext(QueryContext);