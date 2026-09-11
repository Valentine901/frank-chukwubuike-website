import React from 'react'
import { Briefcase, Trash2 } from "lucide-react";
import { useQueryContext } from '../../Context/GeneralQueryContext';



const SkillCard = ({ skill }) => {
  const { handleDeleteSkill } = useQueryContext();
  return (
    <div className="group relative flex items-center justify-center p-6 w-full max-w-[300px] aspect-[4/3] rounded-2xl bg-white dark:bg-gray-700/10 border border-gray-100 dark:border-gray-800/60 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-blue-500/30 dark:hover:border-blue-500/30">


      <div
        onClick={() => handleDeleteSkill(skill.id)}
        className="absolute top-3 right-3 group inline-block">

        <button className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
          <Trash2 size={18} />
        </button>

        {/* The Custom Styled Tooltip Box */}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-0 group-hover:scale-100 transition-all duration-150 origin-bottom pointer-events-none whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white shadow-md dark:bg-gray-100 dark:text-gray-900">
          Delete Skill

          {/* Optional Little Arrow Tip */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
        </span>

      </div>

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
