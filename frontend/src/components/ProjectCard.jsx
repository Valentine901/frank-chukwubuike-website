// import { BASE_IMAGE_URL } from "../constants/Api"

// const ProjectCard = ({ project }) => {
//   return (
//     <div>
//       <span>{project.name}</span>
//       {project.description && <p>{project.description}</p>}
//       <img src={`${BASE_IMAGE_URL}/${project.image}`} alt="" />
//     </div>
//   )
// }

// export default ProjectCard



import React from 'react';
import { Layers, Calendar, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { BASE_IMAGE_URL } from "../constants/Api";

const ProjectCard = ({ project }) => {
  // Safe date parsing fallback if created_at exists from your FastAPI backend
  const formattedDate = project.created_at 
    ? new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null;

  return (
    <div className="group relative flex flex-col w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/30 dark:hover:border-blue-400/30">
      
      {/* 1. Image Header Container with Fixed Aspect Ratio */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {project.image ? (
          <img 
            src={`${BASE_IMAGE_URL}/${project.image}`} 
            alt={project.name} 
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* Sleek fallback illustration frame if no file is linked */
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
            <FolderGit2 className="w-10 h-10 stroke-[1.5]" />
            <span className="text-xs font-medium">No preview available</span>
          </div>
        )}
        
        {/* Subtle top overlay badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase shadow-sm">
          <Layers className="w-3 h-3" />
          Project
        </div>
      </div>

      {/* 2. Text Content Framework */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Title Block with Interactive Icon Anchor */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {project.name}
          </h3>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Description Segment */}
        <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[40px]">
          {project.description || (
            <span className="italic text-gray-400 dark:text-gray-600">No project description provided.</span>
          )}
        </p>

        {/* 3. Footer Metadata Layer */}
        {formattedDate && (
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created {formattedDate}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectCard;
