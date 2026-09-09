import { FolderGit2, Loader2 } from "lucide-react";
import ProjectCard from "./AdminProjectCard";
import { useQueryContext } from "../../Context/GeneralQueryContext";

const ProjectList = () => {
    const { projects, loading, orderedProjects } = useQueryContext();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full w-full bg-transparent">
                <div className="text-blue-500 animate-spin text-xl lg:text-4xl ">
                    <Loader2 />
                </div>
            </div>
        );
    }


    if (!projects || projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center h-full p-12 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20 ">
                <FolderGit2 className="w-12 h-12 text-gray-400 dark:text-gray-600 stroke-[1.5]" />
                <h3 className="mt-4 text-base font-semibold text-gray-800 dark:text-gray-200">No projects found</h3>
                <p className="mt-1 text-sm text-gray-400 dark:text-gray-500 max-w-xs">
                    Get started by uploading your very first project using the upload tool in the navbar above.
                </p>
            </div>
        );
    }

    return (
       
        <div className="flex flex-col gap-4 p-4 w-full h-full rounded-2xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-900/40 shadow-sm overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all duration-300">
            
            <div className='flex px-3 py-2 bg-gray-200 dark:bg-gray-500 rounded-xl max-w-40'>
                <span className='text-md md:text-lg text-gray-500 dark:text-gray-100 font-heading font-semibold'>Latest Projects</span>
            </div>
            {/* Gallery Grid Structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
                {orderedProjects && orderedProjects.map((project, index) => (
                    <ProjectCard key={project.id || index} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
