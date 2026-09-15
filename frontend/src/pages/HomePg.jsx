// import { useAuth } from "../Context/AuthContext";
// import { BASE_IMAGE_URL } from "../constants/Api";

// const HomePg = () => {
//   const { adminProfile, loading } = useAuth();

//   if (adminProfile === null) return;
//   return (
//     <section id="#home" className='w-full min-h-screen flex justify-between  bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white px-4 md:px-8 pt-30 pb-20 shadow-sm transition-colors duration-300'>

//       <div className="grid grid-cols-1 md:flex justify-around p-6 font-body items-center mx-auto">
//         {/* self description section */}
//         <div className="flex flex-col gap-8 p-2 w-full">
//           <span className="p-2.5 rounded-full max-w-48 bg-blue-700/20 text-blue-600 text-xl">Graphics Designer</span>

//           <h1 className="text-5xl font-bold">Hi, I'm <span className="text-blue-600"> Franklin 👋</span></h1>

//           <p className="text-lg text-gray-700/50 dark:text-gray-200/50 w-full max-w-4xl">
//             As a graphic designer specializing in visual identity and digital design, I transform complex concepts into clean, functional, and striking visual solutions. I believe that great design doesn't just look spectacular, it communicates seamlessly and drives real results.
//           </p>
//           <div className="flex space-x-6">
//             <button className="px-6 py-3.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-lg font-semibold max-h-16">View My Projects</button>

//             <button className="px-6 py-3.5 rounded-full  border border-gray-700/50 dark:border-gray-200 hover:bg-gray-700/50 hover:text-gray-50 text-gray-700/60 dark:text-gray-200/50 transition-all duration-300 text-lg font-semibold max-h-16">Get In Touch</button>
//           </div>
//         </div>

//         {/* profile image section */}
//         <div className="w-full h-auto md:w-1/2 lg:w-1/3 p-4 mt-15 md:mt-0 items-center flex justify-center animate-slide-up-fade">
//         <img 
//         className="w-full max-w-md rounded-full"
//         src={`${BASE_IMAGE_URL}/${adminProfile.image}`} alt={"frank"}  />
//         </div>

//       </div>
//     </section>
//   )
// }

// export default HomePg





import { useAuth } from "../Context/AuthContext";
import { BASE_IMAGE_URL } from "../constants/Api";

const HomePg = () => {
  const { adminProfile, loading } = useAuth();

  if (adminProfile === null) return;
  return (
    <section id="#home" className='w-full min-h-screen flex justify-between  bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white px-4 md:px-8 pt-30 pb-20 shadow-sm transition-colors duration-300'>

      <div className="grid grid-cols-1 md:flex justify-around p-6 font-body items-center mx-auto">
        {/* self description section */}
        <div className="flex flex-col gap-8 p-2 w-full">
          <span className="p-2.5 rounded-full max-w-48 bg-blue-700/20 text-blue-600 text-xl">Graphics Designer</span>

          <h1 className="text-5xl font-bold">Hi, I'm <span className="text-blue-600"> Franklin 👋</span></h1>

          <p className="text-lg text-gray-700/50 dark:text-gray-200/50 w-full max-w-4xl">
            As a graphic designer specializing in visual identity and digital design, I transform complex concepts into clean, functional, and striking visual solutions. I believe that great design doesn't just look spectacular, it communicates seamlessly and drives real results.
          </p>
          <div className="flex space-x-6">
            <button className="px-6 py-3.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-lg font-semibold max-h-16">View My Projects</button>

            <button className="px-6 py-3.5 rounded-full  border border-gray-700/50 dark:border-gray-200 hover:bg-gray-700/50 hover:text-gray-50 text-gray-700/60 dark:text-gray-200/50 transition-all duration-300 text-lg font-semibold max-h-16">Get In Touch</button>
          </div>
        </div>

        {/* ai bouncing box image section */}
        <div className="perspective-container w-full h-auto md:w-3/4 p-4 mt-40 md:mt-0 items-center flex flex-col justify-center relative">
          
          {/* Main 3D Box Graphic */}
          <img 
            className="w-full max-w-md animate-bounce box-3d-tilt z-10"
            src="src/assets/box.png" 
            alt="frank"  
          />

          {/* Optimized Realistic 3D Blur Floor Shadow */}
          <div className="shadow-3d-floor absolute bottom-0 w-[60%] h-12 rounded-full transition-all duration-300"></div>
          
        </div>

        {/* Your absolute glowing card background layer upgraded with 3D rotation */}
        <div className="absolute top-100 right-20 w-[20%] p-16 rounded-3xl shadow-2xl bg-gradient-to-tr from-blue-600/10 to-purple-600/10 backdrop-blur-md transform rotate-12 -z-10"></div>

        {/* ai bouncing box image section */}
        {/* <div className="w-full h-auto md:w-3/4 p-4 mt-40 md:mt-0 items-center flex justify-center ">
        <img 
        className="w-full max-w-md animate-bounce"
        src="src/assets/box.png" alt={"frank"}  />
        </div>

        <div className="absolute top-100 right-20 w-[20%] p-16 rounded-3xl shadow-2xl"></div> */}

      </div>
    </section>
  )
}

export default HomePg


