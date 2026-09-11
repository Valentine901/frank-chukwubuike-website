import React from 'react'
import { Briefcase } from "lucide-react";

// const SkillCard = ({ skill }) => {
//   return (
//     <div className="shadow-lg bg-gray-200 dark:bg-gray-600/20 p-2 rounded-xl border border-gray-600 dark:border-gray-600 w-60 h-30 items-center justify-center flex flex-col gap-4">
//         <div className='text-center text-blue-600  text-gray-700 dark:text-gray-400/30'>
//             <Briefcase size={48} />
//         </div>

//         <span className="text font-heading text-xl font-semibold text-gray-700 dark:text-gray-100">
//             {skill.name}
//         </span>
//     </div>
//   )
// }

// export default SkillCard


const SkillCard = ({ skill }) => {
  return (
    <div className="group relative flex items-center justify-center p-6 w-full max-w-[240px] aspect-[4/3] rounded-2xl bg-white dark:bg-gray-700/10 border border-gray-100 dark:border-gray-800/60 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-blue-500/30 dark:hover:border-blue-500/30">
      

      <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 transition-colors duration-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50">
        <Briefcase size={26} className="transition-transform duration-300 group-hover:scale-110" />
      </div>

      
      <span className="w-full text-center font-heading text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100 line-clamp-2 px-1">
        {skill.name}
      </span>
    </div>
  );
};

export default SkillCard;
