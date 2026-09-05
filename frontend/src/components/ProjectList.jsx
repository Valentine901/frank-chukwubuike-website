import { FaCloudUploadAlt } from "react-icons/fa"
import ProjectCard from "./ProjectCard";
import { useState, useEffect } from "react";


const ProjectList = () => {
    const [projects, setProjects] = useState([1, 2, 4]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col border border-gray-300 dark:border-gray-700 p-2 rounded-xl">
        <div className="flex justify-between items-center ">
            <span className="text-2xl md:text-3xl text-gray-600 dark:text-gray-100 font-heading font-bold">Recent Projects</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-gray-100 rounded-xl p-4 space-x-2 flex transition-all duration-300">
                <FaCloudUploadAlt size={30} />
                <span className="text-lg font-semibold font-heading"> Upload New Project</span>
            </button>
        </div>
        <div className="mt-5">
        {projects.map((project, index) => (
            <ProjectCard key={index} />
        ) )}
        </div>
    </div>
  )
}

export default ProjectList
