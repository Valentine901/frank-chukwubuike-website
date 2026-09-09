import { X, FolderGit2, Pencil } from 'lucide-react'
import { useQueryContext } from '../../Context/GeneralQueryContext'
import { BASE_IMAGE_URL } from '../../constants/Api';
import { FaTrashAlt } from 'react-icons/fa';

const ProjectDetailModal = () => {
    const { project, setProject } = useQueryContext();

    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 md:p-6 animate-fade-in">

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-5xl w-full max-h-[85vh] md:max-h-[75vh] flex flex-col shadow-2xl relative transform transition-all duration-300 overflow-hidden">

                {/* Action buttons */}
                <div  className="flex gap-5 absolute top-4 right-4 z-10 p-4 transition-all duration-300">
                    <button className="cursor-pointer hover:text-gray-300">
                        <FaTrashAlt size={24} />
                    </button>
                    <button className="cursor-pointer hover:text-gray-300">
                        <Pencil size={24} />
                    </button>

                    {/* Close Button */}
                    <button className="cursor-pointer hover:text-gray-300"
                        onClick={() => setProject(null)}
                    >
                        <X size={24} />
                    </button>
                </div>
                {/* Main Content Split Frame */}
                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full overflow-y-auto">

                    {/* Left Column: Image Wrapper */}
                    <div className="relative w-full aspect-video md:aspect-auto md:h-full min-h-[260px] md:min-h-[400px] bg-gray-50 dark:bg-gray-950 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800/60 overflow-hidden">
                        {project.image ? (
                            <img
                                src={`${BASE_IMAGE_URL}/${project.image}`}
                                className="w-full h-full object-cover"
                                alt={project.name || "Project Preview"}
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                                <FolderGit2 className="w-12 h-12 stroke-[1.2]" />
                                <span className="text-xs font-medium">No preview available</span>
                            </div>
                        )}
                    </div>
                    

                    {/* Right Column: Typography & Text details */}
                    <div className="p-6 md:p-8 flex flex-col justify-center gap-3">
                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                            {project.name}
                        </h2>

                        {project.description && (
                            <p className="font-body text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                {project.description}
                            </p>
                        )}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProjectDetailModal