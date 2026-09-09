import { X, FolderGit2, Pencil } from 'lucide-react';
import { useQueryContext } from '../../Context/GeneralQueryContext';
import { BASE_IMAGE_URL } from '../../constants/Api';
import { FaTrashAlt } from 'react-icons/fa';

const ProjectDetailModal = () => {
    const { setIsProjectDetailModal, project, setIsDeleteProjectModal, setIsEditProjectModal } = useQueryContext();

    if (!project) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 md:p-6 animate-fade-in">

            {/* Modal */}
            <div
                className="
                    relative
                    bg-white dark:bg-gray-900
                    border border-gray-200 dark:border-gray-800
                    rounded-2xl
                    w-full max-w-5xl
                    max-h-[90vh]
                    overflow-hidden
                    shadow-2xl
                    transform transition-all duration-300
                "
            >

                {/* Top Right Actions */}
                <div className="absolute top-5 right-5 z-30 flex items-center gap-2">

                    <button
                    onClick={() => setIsDeleteProjectModal(true)}
                        className="
                            cursor-pointer
                            p-2
                            rounded-full
                            text-gray-500 dark:text-gray-400
                            hover:text-red-500 dark:hover:text-red-400
                            hover:bg-gray-100 dark:hover:bg-gray-800
                            transition-all duration-200
                        "
                        aria-label="Delete project"
                    >
                        <FaTrashAlt size={17} />
                    </button>

                    <button
                    onClick={() => setIsEditProjectModal(true)}
                        className="
                            cursor-pointer
                            p-2
                            rounded-full
                            text-gray-500 dark:text-gray-400
                            hover:text-blue-500 dark:hover:text-blue-400
                            hover:bg-gray-100 dark:hover:bg-gray-800
                            transition-all duration-200
                        "
                        aria-label="Edit project"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        onClick={() => setIsProjectDetailModal(false)}
                        className="
                            cursor-pointer
                            p-2
                            rounded-full
                            text-gray-500 dark:text-gray-400
                            hover:text-gray-700 dark:hover:text-gray-200
                            hover:bg-gray-100 dark:hover:bg-gray-800
                            transition-all duration-200
                        "
                        aria-label="Close modal"
                    >
                        <X size={22} />
                    </button>

                </div>


                {/* main Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">


                    {/* project image */}
                    <div
                        className="
                            relative
                            w-full
                            min-h-[280px]
                            md:min-h-[520px]
                            bg-gray-50 dark:bg-gray-950
                            flex items-center justify-center
                            overflow-hidden
                            group
                        "
                    >

                        {project.image ? (
                            <img
                                src={`${BASE_IMAGE_URL}/${project.image}`}
                                alt={project.name || 'Project Preview'}
                                loading="lazy"
                                className="
                                    w-full
                                    h-full
                                    min-h-[280px]
                                    md:min-h-[520px]
                                    object-cover
                                    transition-transform
                                    duration-500
                                    group-hover:scale-[1.02]
                                "
                            />
                        ) : (
                            <div
                                className="
                                    flex flex-col
                                    items-center
                                    justify-center
                                    gap-3
                                    text-gray-400 dark:text-gray-600
                                "
                            >
                                <FolderGit2
                                    className="w-16 h-16 stroke-[1.2]"
                                />

                                <span className="text-xs font-semibold tracking-wider uppercase">
                                    No preview available
                                </span>
                            </div>
                        )}

                    </div>


                    {/* Project details */}
                    <div
                        className="
                            relative
                            flex flex-col
                            justify-center
                            p-7
                            md:p-10
                            lg:p-12
                            min-h-[350px]
                        "
                    >

                        {/* Small Label */}
                        <span
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-widest
                                text-blue-600 dark:text-blue-400
                                mb-3
                                block
                            "
                        >
                            Project Details
                        </span>


                        {/* Project Title */}
                        <h2
                            className="
                                font-heading
                                text-3xl
                                md:text-4xl
                                lg:text-5xl
                                font-extrabold
                                text-gray-900 dark:text-gray-100
                                tracking-tight
                                leading-tight
                                mb-6
                            "
                        >
                            {project.name}
                        </h2>


                        {/* Description */}
                        {project.description ? (
                            <p
                                className="
                                    font-body
                                    text-sm
                                    md:text-base
                                    lg:text-lg
                                    text-gray-600 dark:text-gray-400
                                    leading-relaxed
                                    font-normal
                                    max-w-xl
                                "
                            >
                                {project.description}
                            </p>
                        ) : (
                            <p
                                className="
                                    font-body
                                    text-sm
                                    text-gray-400 dark:text-gray-500
                                    italic
                                "
                            >
                                No description provided for this project.
                            </p>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProjectDetailModal;

