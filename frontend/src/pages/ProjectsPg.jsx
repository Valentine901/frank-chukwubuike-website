import { useQueryContext } from "../Context/GeneralQueryContext";
import { BASE_IMAGE_URL } from "../constants/Api";
import ProjectDetail from "../components/ProjectDetail";
import { useState, useEffect } from "react";
import { api } from "../constants/Api";
import ScrollReveal  from "../components/ScrollReveal"

const ProjectsPg = () => {
    const [projects, setProjects] = useState([]);
    const [limit, setLimit] = useState(10);
    const [totalProjects, setTotalProjects] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isProjectDetail, setIsProjectDetail] = useState(false);


    const { handleFetchProject, handleAxiosError, setErrorMessage, setLoading, loading } = useQueryContext();


    // screen width listener
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1024) {
                // for desktop and laptop screen(lg)
                setLimit(8);
            } else if (width >= 768) {
                // for  tablet screen (md)
                setLimit(6);
            } else {
                // for mobile screen (sm)
                setLimit(4);
            }
        }
        // when the component mount initialize
        handleResize();
        // when screen resizes it should call the handleResize and display grid
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, [])


    const handleFetchProjects = async () => {
        setLoading(true);
        setErrorMessage("");

        const calculatedOffset = (currentPage - 1) * limit;

        try {
            const response = await api.get("/project/paginated/projects", {
                params: { offset: calculatedOffset, limit: limit }
            });
            setTotalProjects(response.data.total);
            setProjects(response.data.items);

        } catch (error) {
            handleAxiosError(error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        handleFetchProjects();
    }, [currentPage, limit])

    const totalPages = Math.ceil(totalProjects / limit) || 1;

    if (projects === null) return;


    return (
        <section
            id="projects"
            className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-white px-4 md:px-8 lg:px-12 py-24 transition-colors duration-300 font-body"
        >
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <ScrollReveal>
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
                </ScrollReveal>

                {/* project detail modal */}
                {isProjectDetail && <ProjectDetail setIsProjectDetail={setIsProjectDetail} handleFetchProject={handleFetchProject} />}


                {/* Loading state */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="w-full h-36 sm:h-40 md:h-44 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 animate-pulse"
                            ></div>
                        ))}
                    </div>
                )}
                {/* PROJECTS */}
                {!loading && projects.length > 0 ? (
                    <ScrollReveal>
                        <div>
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


                                        <div className="relative w-full h-36 sm:h-40 md:h-44 overflow-hidden bg-gray-200 dark:bg-gray-700">

                                            <img
                                                src={`${BASE_IMAGE_URL}/${project.image}`}
                                                alt={project.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />

                                        </div>


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
                            <div className="flex justify-center items-center mt-12 space-x-4">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                >
                                    Previous
                                </button>

                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Page <strong className="text-gray-900 dark:text-white">{currentPage}</strong> of {totalPages}
                                </span>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => prev + 1)} // This will change to addition
                                    className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>
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




