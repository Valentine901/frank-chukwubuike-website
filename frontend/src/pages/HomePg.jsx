// import { useAuth } from "../Context/AuthContext";
// import { BASE_IMAGE_URL } from "../constants/Api";
// import { BsFacebook, BsLinkedin, BsInstagram } from "react-icons/bs";
// import ScrollReveal from "../components/ScrollReveal";

// const HomePg = () => {
//     const { adminProfile, user } = useAuth();

//     if (!adminProfile && !user) {
//         return (
//             <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
//                 <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     return (

//         <section
//             id="home"
//             className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white px-5 md:px-8 lg:px-12 pt-28 pb-20 transition-colors duration-300"
//         >

//             <div className="max-w-7xl min-h-[calc(100vh-7rem)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//                 <ScrollReveal>

//                     <div className="flex flex-col items-start font-body">

//                         {/* Small Introduction */}
//                         <span className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-sm font-semibold">
//                             <span className="w-2 h-2 rounded-full bg-blue-600"></span>
//                             Graphics Designer
//                         </span>


//                         {/* Main Heading */}
//                         <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 dark:text-white">

//                             Hi, I'm{" "}

//                             <span className="text-blue-600 dark:text-blue-400">
//                                 {user.first_name}
//                             </span>


//                         </h1>


//                         {/* Short Description */}
//                         <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-400 font-body">
//                             I create clean, meaningful, and engaging visual
//                             experiences that help brands communicate their ideas
//                             clearly. From visual identity to digital design, I turn
//                             complex ideas into simple and memorable designs.
//                         </p>


//                         {/* Action Buttons */}
//                         <div className="mt-8 flex flex-wrap items-center gap-4">

//                             <a
//                                 href="#projects"
//                                 className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
//                             >
//                                 View My Projects
//                             </a>

//                             <a
//                                 href="#contact"
//                                 className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 font-semibold transition-all duration-300"
//                             >
//                                 Get In Touch
//                             </a>

//                         </div>


//                         {/* Social Links */}
//                         <div className="mt-10 flex items-center gap-3">

//                             <span className="mr-2 text-sm text-gray-500 dark:text-gray-500">
//                                 Follow me
//                             </span>

//                             {adminProfile.linkedin_link && (
//                                 <a
//                                     href={adminProfile.linkedin_link}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
//                                 >
//                                     <BsLinkedin size={18} />
//                                 </a>
//                             )}

//                             {adminProfile.instagram_link && (
//                                 <a
//                                     href={adminProfile.instagram_link}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
//                                 >
//                                     <BsInstagram size={18} />
//                                 </a>
//                             )}

//                             {adminProfile.facebook_link && (
//                                 <a
//                                     href={adminProfile.facebook_link}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
//                                 >
//                                     <BsFacebook size={18} />
//                                 </a>
//                             )}

//                         </div>

//                     </div>
//                 </ScrollReveal>

//                 <ScrollReveal>
//                     <div className="relative flex justify-center items-center">


//                         <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-blue-600/10 dark:bg-blue-500/5 blur-3xl"></div>



//                         <div className="relative">

//                             <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border-2 border-blue-600/30 dark:border-blue-400/20"></div>


//                             <div className="relative overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl">

//                                 <img
//                                     className="w-full max-w-md lg:max-w-lg object-cover"
//                                     src={`${BASE_IMAGE_URL}/${adminProfile.image}`}
//                                     alt="Franklin"
//                                 />

//                             </div>

//                         </div>

//                     </div>
//                 </ScrollReveal>
//             </div>

//         </section>
//     );
// };

// export default HomePg;




import { useAuth } from "../Context/AuthContext";
import { BASE_IMAGE_URL } from "../constants/Api";
import { BsFacebook, BsLinkedin, BsInstagram } from "react-icons/bs";
import ScrollReveal from "../components/ScrollReveal";

const HomePg = () => {
    const { adminProfile, user, loading } = useAuth(); 

    // Safe Loading fallback: Only display spinner while AuthContext is actively running its initial setup
    if (loading && !adminProfile && !user) {
        return (
            <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section
            id="home"
            className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white px-5 md:px-8 lg:px-12 pt-28 pb-20 transition-colors duration-300"
        >
            <div className="max-w-7xl min-h-[calc(100vh-7rem)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <ScrollReveal>
                    <div className="flex flex-col items-start font-body">
                        
                        {/* Small Introduction */}
                        <span className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            Graphics Designer
                        </span>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
                            Hi, I'm{" "}
                            <span className="text-blue-600 dark:text-blue-400">
                                {user?.first_name || "Admin"}
                            </span>
                        </h1>

                        {/* Short Description */}
                        <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-400 font-body">
                            I create clean, meaningful, and engaging visual
                            experiences that help brands communicate their ideas
                            clearly. From visual identity to digital design, I turn
                            complex ideas into simple and memorable designs.
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <a
                                href="#projects"
                                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                View My Projects
                            </a>
                            <a
                                href="#contact"
                                className="px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 font-semibold transition-all duration-300"
                            >
                                Get In Touch
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="mt-10 flex items-center gap-3">
                            <span className="mr-2 text-sm text-gray-500 dark:text-gray-500">
                                Follow me
                            </span>

                            {adminProfile?.linkedin_link && (
                                <a
                                    href={adminProfile.linkedin_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
                                >
                                    <BsLinkedin size={18} />
                                </a>
                            )}

                            {adminProfile?.instagram_link && (
                                <a
                                    href={adminProfile.instagram_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
                                >
                                    <BsInstagram size={18} />
                                </a>
                            )}

                            {adminProfile?.facebook_link && (
                                <a
                                    href={adminProfile.facebook_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
                                >
                                    <BsFacebook size={18} />
                                </a>
                            )}
                        </div>

                    </div>
                </ScrollReveal>

                <ScrollReveal>
                    <div className="relative flex justify-center items-center">
                        <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-blue-600/10 dark:bg-blue-500/5 blur-3xl"></div>

                        <div className="relative">
                            <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border-2 border-blue-600/30 dark:border-blue-400/20"></div>

                            <div className="relative overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl">
                                {adminProfile?.image && (
                                    <img
                                        className="w-full max-w-md lg:max-w-lg object-cover"
                                        src={adminProfile?.image.startsWith("http") ? adminProfile.image :`${BASE_IMAGE_URL}/${adminProfile?.image}`}
                                        alt="Franklin"
                                        
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default HomePg;

