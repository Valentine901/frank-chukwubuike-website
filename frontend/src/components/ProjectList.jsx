
// import React from 'react';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { AlertCircle, FolderGit2, Loader2 } from "lucide-react";
// import ProjectCard from "./ProjectCard";
// import { useQueryContext } from "../Context/GeneralQueryContext";

// const ProjectList = () => {
//     const { projects, errorMessage, loading, orderedProjects } = useQueryContext();

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
//                 <p className="text-gray-600 dark:text-gray-300 text-4xl font-heading animate-spin font-bold">
//                     <Loader2 size={110} />
//                 </p>
//             </div>
//         );
//     }


//     if (errorMessage) {
//         return (
//             <div className="flex items-center gap-3 p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400">
//                 <AlertCircle className="w-5 h-5 shrink-0" />
//                 <div className="text-sm font-medium">
//                     <span className="font-bold">Error:&nbsp;</span> {errorMessage}
//                 </div>
//             </div>
//         );
//     }


//     if (projects.length === 0) {
//         return (
//             <div className="flex flex-col items-center justify-center text-center p-12 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20 ">
//                 <FolderGit2 className="w-12 h-12 text-gray-400 dark:text-gray-600 stroke-[1.5]" />
//                 <h3 className="mt-4 text-base font-semibold text-gray-800 dark:text-gray-200">No projects found</h3>
//                 <p className="mt-1 text-sm text-gray-400 dark:text-gray-500 max-w-xs">
//                     Get started by uploading your very first project using the upload tool in the navbar above.
//                 </p>
//             </div>
//         );
//     }


//     return (
//         <div className="flex flex-col gap-6 p-4 w-full rounded-2xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-900/40 shadow-sm transition-all duration-300">
           
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max h-full scroll-auto">
//                 {orderedProjects.map((project, index) => (
//                     <ProjectCard key={index} project={project} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProjectList;




import React from 'react';
import { AlertCircle, FolderGit2, Loader2 } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { useQueryContext } from "../Context/GeneralQueryContext";

const ProjectList = () => {
    const { projects, errorMessage, loading, orderedProjects } = useQueryContext();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full w-full bg-transparent">
                <div className="text-blue-500 animate-spin">
                    <Loader2 size={64} />
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="flex items-center gap-3 p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <div className="text-sm font-medium">
                    <span className="font-bold">Error:&nbsp;</span> {errorMessage}
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
        /*  [&::-webkit-scrollbar]:hidden, [-ms-overflow-style:none], and [scrollbar-width:none] */
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
