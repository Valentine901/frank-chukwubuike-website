import { useQueryContext } from '../Context/GeneralQueryContext';
import { Layers, Lightbulb, MessageSquareQuote } from 'lucide-react';

const DropDownUpload = ({ setIsDropDown, setIsAdminProjectCreateModal }) => {
    const {setIsTestimonialCreateModal, setIsSkillUploadModal} = useQueryContext();
   
    const menuItems = [
        { 
            view: "Upload project", 
            description: "Add a new work to your portfolio",
            icon: <Layers className="w-5 h-5 text-blue-500" />,
            action: () => {
                setIsAdminProjectCreateModal(true);
                setIsDropDown(false);
            }
        },
        { 
            view: "Upload skill", 
            description: "Display a new core technology",
            icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
            action: () => {
                setIsSkillUploadModal(true);
                setIsDropDown(false);
            }
        },
        { 
            view: "Upload testimonial", 
            description: "Add reviews or client feedback",
            icon: <MessageSquareQuote className="w-5 h-5 text-emerald-500" />,
            action: () => {
                setIsTestimonialCreateModal(true);
                setIsDropDown(false);
            }
        },
    ];

    return (
        <div className="absolute top-20 right-3 z-50 w-78 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 shadow-xl ring-1 ring-black/5 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Quick Actions
            </div>
            
            <div className="flex flex-col gap-1 mt-1">
                {menuItems.map((item, index) => (
                    <button 
                        onClick={item.action}
                        className="flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
                        key={index}
                    >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors group-hover:bg-white dark:group-hover:bg-gray-700 border border-transparent dark:border-gray-700 shadow-sm">
                            {item.icon}
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {item.view}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">
                                {item.description}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DropDownUpload;
