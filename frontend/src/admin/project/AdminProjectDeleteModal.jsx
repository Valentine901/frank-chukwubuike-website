import React from 'react'
import { X, Trash2, Loader2 } from 'lucide-react';
import { useQueryContext } from '../../Context/GeneralQueryContext';

const AdminProjectDeleteModal = () => {
    const { project, loading, handleDeleteProject, setIsDeleteProjectModal } = useQueryContext();

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative transform transition-all duration-300 scale-100">


                <button
                    onClick={() => setIsDeleteProjectModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>


                <div className="flex flex-col items-center text-center mt-2">
                    <div className="p-3 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full mb-4 shadow-inner">
                        <Trash2 size={28} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading">
                        Confirm Delete
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-heading max-w-xs">
                        Are you sure you want to delete {project.name}
                    </p>
                </div>


                <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
                    <button
                        onClick={() => setIsDeleteProjectModal(false)}
                        className="flex-1 order-2 sm:order-1 py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 font-heading text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700/50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        onClick={
                            () => handleDeleteProject(project.id)
                        }
                        className="flex-1 order-1 sm:order-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 font-heading text-sm font-semibold text-white transition-colors shadow-lg items-center justify-center shadow-red-600/20 cursor-pointer"
                    >
                        {loading ? <Loader2 size={24} className="animate-spin text-center mx-auto" /> :
                            "Confirm"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AdminProjectDeleteModal