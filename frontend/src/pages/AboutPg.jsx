import Counter from "../components/Counter";
import {useAuth} from "../Context/AuthContext";

const AboutPg = () => {
    const { user } = useAuth();
    if (user === null) return;
    return (
        <section
            id="about"
            className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-white px-4 md:px-8 py-24 transition-colors duration-300 font-body"
        >

            <div className="max-w-7xl mx-auto">

                {/* Section Heading */}
                <div className="text-center mb-16">

                    <span className="inline-block px-4 py-2 rounded-full bg-blue-700/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                        About Me
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        Turning Ideas Into
                        <span className="text-blue-600"> Visual Experiences</span>
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
                        I am a creative designer passionate about transforming
                        ideas into meaningful and memorable digital experiences.
                    </p>

                </div>


                {/* Main About Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                    {/* Left Side */}
                    <div className="relative">

                        {/* Decorative Background */}
                        <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl dark:hidden"></div>

                        <div className="relative bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 md:p-10 border border-gray-200 dark:border-gray-700">

                            <div className="flex items-center gap-4 mb-8">

                                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                                    F
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {user.first_name}
                                    </h3>

                                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                                        Graphic Designer
                                    </p>
                                </div>

                            </div>


                            <p className="text-gray-600 dark:text-gray-300 leading-8 mb-6">
                                I specialize in creating visual identities, digital
                                interfaces, social media graphics, and other
                                creative designs that help ideas communicate
                                clearly.
                            </p>

                            <p className="text-gray-600 dark:text-gray-300 leading-8">
                                My design approach combines creativity,
                                simplicity, and functionality. I believe that
                                good design should not only look beautiful but
                                should also communicate a clear message and
                                create a memorable experience.
                            </p>


                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">

                                <div>
                                    <h4 className="text-4xl font-heading font-bold text-blue-600">
                                        <Counter target={6} />+
                                    </h4>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Years Experience
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-4xl font-heading font-bold text-blue-600">
                                        <Counter target={50} />+
                                    </h4>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Projects
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-4xl font-heading font-bold text-blue-600">
                                        <Counter target={20} />+
                                    </h4>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Happy Clients
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Right Side */}
                    <div className="flex flex-col gap-8">

                        <div>
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                My Journey
                            </span>

                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
                                Creativity With
                                <span className="text-blue-600"> Purpose</span>
                            </h3>
                        </div>


                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-8">
                            My journey in design started with a simple curiosity
                            about how visuals influence the way people understand
                            information. Over time, that curiosity developed into
                            a passion for creating meaningful visual experiences.
                        </p>


                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-8">
                            Today, I work on projects ranging from brand identity
                            and marketing materials to digital interfaces and
                            creative content. Every project gives me an opportunity
                            to learn something new and improve my craft.
                        </p>


                        {/* What I Do */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="p-5 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">

                                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-4">
                                    ✦
                                </div>

                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    Visual Identity
                                </h4>

                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">
                                    Creating memorable visual identities that
                                    represent brands clearly.
                                </p>

                            </div>


                            <div className="p-5 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">

                                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-4">
                                    ◇
                                </div>

                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    Digital Design
                                </h4>

                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">
                                    Designing clean and engaging digital
                                    experiences for modern platforms.
                                </p>

                            </div>

                        </div>


                        {/* Button */}
                        <div className="pt-2">

                            <a href="#contact" className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-sm">
                                Let's Work Together
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default AboutPg;