import { FolderGit2 } from 'lucide-react';
import { BASE_IMAGE_URL } from "../../constants/Api";
import { useQueryContext } from '../../Context/GeneralQueryContext';


const ProjectCard = ({ project }) => {
      const { handleFetchProject } = useQueryContext();

  return (
    <div onClick={() => handleFetchProject(project.id)} className="group relative w-full h-100 rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl dark:shadow-black/40">
      
     
      {project.image ? (
        <img 
          src={`${BASE_IMAGE_URL}/${project.image}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
          alt={project.name || "Project Preview"} 
          loading="lazy"
        />
      ) : (
      
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-400 dark:text-gray-500">
          <FolderGit2 className="w-10 h-10 stroke-[1.5]" />
          <span className="text-xs font-medium">No preview available</span>
        </div>
      )}


      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />


      <div className="absolute top-5 left-4">
        <span className="inline-block text-base font-semibold font-body py-2.5 px-4 rounded-2xl bg-white/80 dark:bg-gray-950/80 backdrop-blur-md text-gray-900 dark:text-gray-100 border border-white/20 dark:border-gray-800/40 shadow-lg shadow-black/5 transition-colors duration-300 group-hover:border-blue-500/30">
          {project.name}
        </span>
      </div>

    </div>
  );
};

export default ProjectCard;