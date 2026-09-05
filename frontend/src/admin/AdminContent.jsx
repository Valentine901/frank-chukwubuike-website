import LogoutModal from '../components/LogoutModal';
import { useAuth } from '../Context/AuthContext';
import { FaFolderOpen, FaCloudUploadAlt, FaEye } from 'react-icons/fa';
import ProjectList from '../components/ProjectList';


const AdminContent = ({ isLogoutModal, setIsLogoutModal }) => {
    const { userData } = useAuth();

    return (
        <div className="bg-gray-50 dark:bg-gray-900 w-full min-h-screen transition-all duration-300">
            
            
            {isLogoutModal && <LogoutModal setIsLogoutModal={setIsLogoutModal} />}

            {/* Profile section */}
            <div className="p-6 md:p-8">
                <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl flex flex-wrap gap-2 items-center">
                    <span className="text-gray-700 dark:text-gray-100">Welcome back,</span>
                    <span className="text-blue-600 capitalize">{userData?.first_name || "Admin"}&nbsp;👋</span>
                </h1>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1 font-heading">
                    Here's an overview of your projects and system status.
                </p>
            </div>

   
            <div className="grid grid-cols-3 gap-6 p-4 md:px-8">
                
               
                <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-5">
                    <div className="p-4 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0">
                        <FaFolderOpen size={32} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading">
                            Total Projects
                        </span>
                        <span className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mt-1 font-mono tracking-tight">
                            105
                        </span>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-5">
                    <div className="p-4 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-2xl shrink-0">
                        <FaCloudUploadAlt size={32} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading">
                            Uploaded This Week
                        </span>
                        <span className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mt-1 font-mono tracking-tight">
                            12
                        </span>
                    </div>
                </div>

             
                <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-5">
                    <div className="p-4 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-2xl shrink-0">
                        <FaEye size={32} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider font-heading">
                            Total Views
                        </span>
                        <span className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mt-1 font-mono tracking-tight">
                            4.2k
                        </span>
                    </div>
                </div>

            </div>

            {/* Project List Section Block */}
            <div className="mt-8 px-4 md:px-8 pb-12">
                <ProjectList />
            </div>
            
        </div>
    );
};

export default AdminContent;
