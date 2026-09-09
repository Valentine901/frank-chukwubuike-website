import { useAuth } from '../Context/AuthContext';
import { useQueryContext } from '../Context/GeneralQueryContext';
import { FaFolderOpen, FaCloudUploadAlt, FaEye, FaTrashAlt} from 'react-icons/fa';
import ProjectList from './project/AdminProjectList';
import { Smile } from 'lucide-react';

const AdminContent = () => {
    const { userData } = useAuth();
    const { projects, totalDelProjects, totalUploadedProjects } = useQueryContext();

    return (
       
        <div className="bg-gray-50 dark:bg-gray-900 w-full h-auto lg:h-[calc(100vh-4rem)] lg:overflow-hidden transition-all duration-300 p-4 md:p-8 flex flex-col">

           
            <div className="shrink-0">
                <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl flex flex-wrap gap-2 items-center">
                    <span className="text-gray-700 dark:text-gray-100">Welcome back,</span>
                    <span className="text-blue-600 capitalize">{userData?.first_name || "Admin"}
                    </span>
                    <Smile className='text-blue-300 dark:text-yellow-300' size={32} />
                </h1>
                <p className="text-md md:text-lg text-gray-500 dark:text-gray-400 mt-1 font-heading">
                    Here's an overview of your projects and system status.
                </p>
            </div>

 
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 shrink-0">
    {/* Total Projects Card */}
    <div className="p-3 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 min-w-0">
        <div className="p-2.5 sm:p-4 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl sm:rounded-2xl shrink-0 text-xl sm:text-2xl">
            <FaFolderOpen size={24} />
        </div>
        <div className="flex flex-col min-w-0 w-full">
            <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading truncate">
                Total Projects
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mt-0.5 sm:mt-1 font-sans tracking-tighter tabular-nums sm:mx-0 mx-auto">
                {projects?.length || 0}
            </span>
        </div>
    </div>

    {/* Uploaded card */}
    <div className="p-3 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 min-w-0">
        <div className="p-2.5 sm:p-4 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl sm:rounded-2xl shrink-0 text-xl sm:text-2xl">
            <FaCloudUploadAlt size={24} />
        </div>
        <div className="flex flex-col min-w-0 w-full">
            <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading truncate">
                Lifetime Uploads
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mt-0.5 sm:mt-1 font-sans tracking-tighter tabular-nums sm:mx-0 mx-auto">
                {totalUploadedProjects}
            </span>
        </div>
    </div>

    {/* Total Views Card */}
    <div className="p-3 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 min-w-0">
        <div className="p-2.5 sm:p-4 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl sm:rounded-2xl shrink-0 text-xl sm:text-2xl">
            <FaEye size={24} />
        </div>
        <div className="flex flex-col min-w-0 w-full">
            <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading truncate">
                Total Views
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mt-0.5 sm:mt-1 font-sans tracking-tighter tabular-nums sm:mx-0 mx-auto">
                4.2k
            </span>
        </div>
    </div>

    {/* Total Deleted Card */}
    <div className="p-3 sm:p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 min-w-0">
        <div className="p-2.5 sm:p-4 bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl sm:rounded-2xl shrink-0 text-xl sm:text-2xl">
            <FaTrashAlt size={24} />
        </div>
        <div className="flex flex-col min-w-0 w-full">
            <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading truncate">
                Total Deleted
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mt-0.5 sm:mt-1 font-sans tracking-tighter tabular-nums sm:mx-0 mx-auto">
                {totalDelProjects}
            </span>
        </div>
    </div>
</div>


            {/* FIX: This wrapper container stretches dynamically to fill remaining height on screen */}
            <div className="mt-8 flex-1 min-h-0 pb-4">
                <ProjectList />
            </div>

        </div>
    );
};

export default AdminContent;
