import { api } from "../constants/Api";
import { useState, useEffect } from "react";
import ScrollReveal from "../components/ScrollReveal"

const SkillsPg = () => {
    const [skills, setSkills] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Error function handler
    const handleAxiosError = (error, fallbackMessage) => {
        if (error.response) {
            setErrorMessage(error?.response?.data?.detail);
        } else if (error.request) {
            setErrorMessage("No response from server, Check your network");
        } else {
            setErrorMessage(fallbackMessage);
        }
    };

    const handleFetchSkills = async () => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await api.get("/skill/skills");
            setSkills(response.data.slice(0, 6));
        } catch (error) {
            handleAxiosError(error, "Something went wrong while fetching skills");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchSkills();
    }, []);

    if (skills === null) return;

    return (
        <section
            id="skills"
            className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white px-5 md:px-8 lg:px-12 py-24 transition-colors duration-300 font-body"
        >
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="max-w-2xl mb-14">
                    <ScrollReveal>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-5">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            My Expertise
                        </span>
                    </ScrollReveal>
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            Skills &{" "}
                            <span className="text-blue-600 dark:text-blue-400">
                                Technologies
                            </span>
                        </h2>
                    </ScrollReveal>


                    <ScrollReveal>
                        <p className="mt-5 text-base md:text-lg leading-8 text-gray-600 dark:text-gray-400">
                            A collection of the tools and technologies I use to
                            transform ideas into clean, functional, and engaging
                            digital experiences.
                        </p>
                    </ScrollReveal>
                </div>

                {/* LOADING */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="h-28 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 animate-pulse"
                            ></div>
                        ))}
                    </div>
                )}

                {/* SKILLS */}
                {!loading && skills.length > 0 && (
                    <ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="group relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-400/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >

                                    {/* Decorative background */}
                                    <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-blue-600/5 group-hover:bg-blue-600/10 transition-all duration-300"></div>

                                    <div className="relative flex items-center gap-4">

                                        {/* Skill icon / initial Letter */}
                                        <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                            {skill.name?.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Skill name */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {skill.name}
                                            </h3>

                                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                                Technology
                                            </p>
                                        </div>

                                    </div>

                                    {/* Bottom accent */}
                                    <div className="mt-5 w-10 h-1 rounded-full bg-blue-600 group-hover:w-20 transition-all duration-300"></div>

                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                )}

                {/* EMPTY STATE */}
                {!loading && skills.length === 0 && !errorMessage && (
                    <div className="py-16 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            No skills available yet.
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default SkillsPg;