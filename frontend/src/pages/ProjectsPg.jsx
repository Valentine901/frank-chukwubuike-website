import { useQueryContext } from "../Context/GeneralQueryContext";
import { BASE_IMAGE_URL } from "../constants/Api";
import ProjectDetail from "../components/ProjectDetail";
import { useState } from "react";

const ProjectsPg = () => {
    const { projects, handleFetchProject } = useQueryContext();
    const [isProjectDetail, setIsProjectDetail] = useState(false);

    if (projects === null) return;

    return (
        <section
            id="projects"
            className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-white px-4 md:px-8 lg:px-12 py-24 transition-colors duration-300 font-body"
        >
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="max-w-2xl mb-12">

                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        My Work
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Selected{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                            Projects
                        </span>
                    </h2>

                    <p className="mt-4 text-sm md:text-base leading-7 text-gray-600 dark:text-gray-400">
                        A collection of projects that showcase my creativity,
                        design process, and visual experience.
                    </p>
                </div>

                {/* project detail modal */}
                {isProjectDetail && <ProjectDetail setIsProjectDetail={setIsProjectDetail} handleFetchProject={handleFetchProject} />}

                {/* PROJECTS */}
                {projects.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">

                        {projects.map((project) => (
                            <article
                                key={project.id}
                                onClick={() => {
                                    handleFetchProject(project.id);
                                    setIsProjectDetail(true);
                                }}
                                className="group overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500/40 dark:hover:border-blue-400/40 shadow-sm hover:shadow-lg transition-all duration-300"
                            >

                                {/* IMAGE */}
                                <div className="relative w-full h-36 sm:h-40 md:h-44 overflow-hidden bg-gray-200 dark:bg-gray-700">

                                    <img
                                        src={`${BASE_IMAGE_URL}/${project.image}`}
                                        alt={project.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                </div>

                                {/* CONTENT */}
                                <div className="p-4">

                                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate">
                                        {project.name}
                                    </h3>

                                    <p className="mt-2 text-xs md:text-sm leading-5 text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between">

                                        <span className="text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400">
                                            View Project
                                        </span>

                                        <span className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                            →
                                        </span>

                                    </div>

                                </div>

                            </article>
                        ))}

                    </div>
                ) : (
                    <div className="py-16 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            No projects available yet.
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default ProjectsPg;