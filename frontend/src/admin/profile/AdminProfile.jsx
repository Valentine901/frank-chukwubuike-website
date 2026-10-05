import { Calendar, Mail, Pencil } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import AdminProfileEditModal from './AdminProfileEditModal';

const AdminProfile = ({ isAdminProfileEditModal, setIsAdminProfileEditModal, handleProfileEditModalChange }) => {
    const { profile, userData, loading } = useAuth();


    if (loading) {
        return <div className="flex flex-col min-h-screen w-70 animate-pulse bg-gray-100 p-4"></div>
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 w-full min-h-screen transition-all duration-300 flex flex-col gap-5 p-4 md:p-8 font-body">
            <div className='flex flex-col gap-8'>
                <div className="header text-left text-gray-600 dark:text-gray-100 flex flex-col">
                    <span className="font-bold text-2xl md:text-3xl lg:text-4xl">My Profile</span>
                    <span className="text-base md:text-lg text-gray-500 dark:text-gray-400 mt-1">
                        Manage your profile information and account settings.
                    </span>
                </div>

                {isAdminProfileEditModal && (
                    <AdminProfileEditModal
                        isAdminProfileEditModal={isAdminProfileEditModal}
                        setIsAdminProfileEditModal={setIsAdminProfileEditModal}
                    />
                )}


                <div className="flex flex-col lg:flex-row lg:justify-between gap-5 w-full p-4 md:p-6 bg-gray-200 dark:bg-gray-800/30 rounded-xl border border-gray-500/20 shadow-sm transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                        <div className="image-block rounded-full flex items-center shrink-0">
                            <img
                                src={profile?.image}
                                alt="Profile Avatar"
                                className="rounded-full object-cover border border-gray-300 dark:border-gray-600 bg-white w-28 h-28 sm:w-40 sm:h-40"
                            />
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
                            <span className="text-2xl md:text-4xl text-gray-700 dark:text-gray-100 font-bold capitalize">
                                {userData?.first_name || "Admin"} {userData?.last_name || ""}
                            </span>
                            <span className="text-blue-600 text-lg md:text-xl capitalize">Admin</span>
                            <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-700 dark:text-gray-100 text-base md:text-xl">
                                <Mail size={24} className="shrink-0" />
                                <span className="break-all">{userData?.email || "No Email Stored"}</span>
                            </div>
                            <div className="flex items-center justify-center sm:justify-start gap-3 text-gray-700 dark:text-gray-100 text-base md:text-xl">
                                <Calendar size={24} className="shrink-0" />
                                <span>Joined September 3rd, 2026</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={handleProfileEditModalChange}
                            className="w-full lg:w-auto justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3 md:py-4 text-gray-100 rounded-xl text-lg md:text-xl font-semibold transition-all duration-300 flex items-center cursor-pointer"
                        >
                            <Pencil size={24} className="mr-3" />
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className="flex flex-col justify-between w-full p-4 md:p-6 bg-gray-200 dark:bg-gray-800/30 rounded-xl border border-gray-500/20 shadow-sm transition-all duration-300">
                    <div>
                        <span className="text-2xl font-semibold text-gray-700 dark:text-gray-100 text-left capitalize">Account Information</span>
                    </div>

                    <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:ml-[5%]'>
                        <div className="flex flex-col space-y-1">
                            <label className='text-lg font-normal text-gray-500 dark:text-gray-500'>Full Name</label>
                            <span className="text-xl font-semibold text-left text-gray-700 dark:text-gray-300">
                                {userData?.first_name} {userData?.last_name}
                            </span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className='text-lg font-normal text-gray-500 dark:text-gray-500'>Email Address</label>
                            <span className="text-xl font-semibold text-left text-gray-700 dark:text-gray-300">
                                {userData?.email}
                            </span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className='text-lg font-normal text-gray-500 dark:text-gray-500'>Role</label>
                            <span className="text-xl font-semibold text-left text-gray-700 dark:text-gray-300">Admin</span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className='text-lg font-normal text-gray-500 dark:text-gray-500'>Bio</label>
                            <span className="text-xl font-semibold text-left text-gray-700 dark:text-gray-300">
                                {profile?.bio || "No bio added yet"}
                            </span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className='text-lg font-normal text-gray-500 dark:text-gray-500'>Residence Address</label>
                            <span className="text-xl font-semibold text-left text-gray-700 dark:text-gray-300">
                                {profile?.address || "No address added yet"}
                            </span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className='text-lg font-normal text-gray-500 dark:text-gray-500'>Phone</label>
                            <span className="text-xl font-semibold text-left text-gray-700 dark:text-gray-300">
                                {profile?.phone || "No phone added yet"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;