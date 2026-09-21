// import { Calendar, Mail, Pencil } from 'lucide-react';
// import { useAuth } from '../../Context/AuthContext';
// import { BASE_IMAGE_URL } from '../../constants/Api';
// import AdminProfileEditModal from './AdminProfileEditModal';

// const AdminProfile = ({ isAdminProfileEditModal, setIsAdminProfileEditModal, handleProfileEditModalChange }) => {
//     const { profile, userData, loading } = useAuth();

//     if (loading) {
//         return <div className="flex flex-col min-h-screen w-70 animate-pulse bg-gray-100 p-4 " />
//     }

//     return (
//         <div className="bg-gray-50 dark:bg-gray-900 w-full min-h-screen transition-all duration-300 flex flex-col gap-5 p-4 md:p-8 font-body">

//             {/* Desktop screen */}
//             {/* header block */}
//             <div className='flex flex-col gap-8'>
//                 <div className="header  text-left md:text-left text-gray-600 dark:text-gray-100 space-x-3 hidden lg:flex flex-col">
//                     <span className="font-bold text-2xl md:text-3xl lg:text-4xl">My Profile</span>
//                     <span className="text-md md:text-lg text-gray-500 dark:text-gray-400 mt-1 ">
//                         Manage your profile information and account settings.
//                     </span>
//                 </div>

//                 {/* profile edit modal */}
//                 {isAdminProfileEditModal && <AdminProfileEditModal
//                     isAdminProfileEditModal={isAdminProfileEditModal}
//                     setIsAdminProfileEditModal={setIsAdminProfileEditModal}

//                 />}

//                 {/* profile block */}
//                 <div className="hidden lg:flex justify-between w-full p-4 md:p-6 bg-gray-200 dark:bg-gray-800/30 rounded-xl border border-gray-500/20 shadow-sm transition-all duration-300">
//                     {/* profile image and detail block */}
//                     <div className='flex gap-5'>
//                         {/* profile image block */}
//                         <div className="image-block rounded-full items-center flex">
//                             <img
//                                 src={profile?.image}
//                                 alt="Profile Avatar"
//                                 className="rounded-full object-cover border border-gray-300 dark:border-gray-600 bg-white w-40 h-40"
//                             />
//                         </div>

//                         {/* profile details block */}
//                         <div className="flex flex-col gap-4">
//                             <span className="text-4xl text-gray-700 dark:text-gray-100 font-bold capitalize ">
//                                 {userData.first_name} {userData.last_name || "Admin"}
//                             </span>
//                             <span className="text-blue-600 text-xl capitalize ">Admin</span>
//                             <div className="flex gap-3 text-gray-700 dark:text-gray-100 text-xl">
//                                 <Mail size={30} />
//                                 <span>{userData.email}</span>
//                             </div>
//                             <div className="flex gap-3 text-gray-700 dark:text-gray-100 text-xl capitalize ">
//                                 <Calendar size={30} />
//                                 <span>Joined September 3rd, &nbsp; 2026</span>
//                             </div>

//                         </div>
//                     </div>

//                     {/* edit button block */}
//                     <div className='flex items-center '>
//                         <button
//                             onClick={handleProfileEditModalChange}
//                             className='bg-blue-600 hover:bg-blue-700 px-6  text-gray-100 rounded-xl text-lg md:text-xl font-semibold transition-all duration-300 flex py-4'
//                         >
//                             <Pencil size={30} className='mr-3' />
//                             Edit Profile</button>
//                     </div>
//                 </div>

//                 {/* profile main detail block */}
//                 <div className="hidden lg:flex flex-col justify-between w-full p-4 md:p-6 bg-gray-200 dark:bg-gray-800/30 rounded-xl border border-gray-500/20 shadow-sm transition-all duration-300">
//                     <div>
//                         <span className="text-2xl font-semibold text-gray-700 dark:text-gray-100  text-left capitalize">Account Information</span>
//                     </div>

//                     <div className='mt-3 ml-[5%] gap-8 space-x-3 grid grid-cols-3'>

//                         <div className="flex flex-col space-y-1">
//                             <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Full Name</label>
//                             <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">{userData.first_name} {userData.last_name}</span>
//                         </div>

//                         <div className="flex flex-col space-y-1">
//                             <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Email Address</label>
//                             <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">{userData.email}</span>
//                         </div>

//                         <div className="flex flex-col space-y-1">
//                             <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Role</label>
//                             <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">Admin</span>
//                         </div>

//                         <div className="flex flex-col space-y-1">
//                             <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Bio</label>
//                             <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">{profile.bio}</span>
//                         </div>

//                         <div className="flex flex-col space-y-1">
//                             <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Residence Address</label>
//                             <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">{profile.address}</span>
//                         </div>

//                         <div className="flex flex-col space-y-1">
//                             <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Phone</label>
//                             <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">{profile.phone}</span>
//                         </div>


//                         <div className="flex flex-col space-y-1 bg-gray-200 py-6 px-4 rounded-2xl dark:bg-gray-800/30 shadow-md transition-all duration-300">

//                             <label
//                                 htmlFor="social-media"
//                                 className="text-lg text-gray-700 dark:text-gray-300 font-bold"
//                             >
//                                 Social Media
//                             </label>

//                             <div
//                                 id="social-media"
//                                 className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3"
//                             >

//                                 <a
//                                     href={profile.instagram_link}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     aria-label="Visit my Instagram profile"
//                                     className="w-full text-center px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700/40 text-base sm:text-lg font-semibold text-blue-600 hover:underline break-words"
//                                 >
//                                     Instagram
//                                 </a>

//                                 <a
//                                     href={profile.linkedin_link}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     aria-label="Visit my LinkedIn profile"
//                                     className="w-full text-center px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700/40 text-base sm:text-lg font-semibold text-blue-600 hover:underline break-words"
//                                 >
//                                     LinkedIn
//                                 </a>

//                                 <a
//                                     href={profile.facebook_link}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     aria-label="Visit my Facebook profile"
//                                     className="w-full text-center px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700/40 text-base sm:text-lg font-semibold text-blue-600 hover:underline break-words"
//                                 >
//                                     Facebook
//                                 </a>

//                             </div>
//                         </div>



//                         <div className="flex flex-col space-y-1">
//                             <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Joined Since</label>
//                             <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">September 3rd, &nbsp; 2026</span>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Profile Screen */}
//             <div className="flex flex-col lg:hidden gap-8 px-6 md:px-12 w-full mx-auto">
//                 <div className="header  text-gray-600 dark:text-gray-100 space-x-3 flex w-full items-center ">
//                     <span className="font-bold text-2xl md:text-3xl lg:text-4xl">My Profile</span>
//                 </div>

//                 {/* header profile block  */}
//                 <div className="w-full image-block mx-auto items-center flex flex-col justify-center gap-4 bg-gray-200 py-6 rounded-2xl dark:bg-gray-800/30 shadow-md transition-all duration-300">
//                     <img
//                         src={profile?.image ? `${BASE_IMAGE_URL}/${profile.image}` : `https://dicebear.com{userData?.first_name || 'admin'}`}
//                         alt="Profile Avatar"
//                         className="rounded-full object-cover border border-gray-300 dark:border-gray-600 bg-white w-65 h-65 md:h-75 md:w-75"
//                     />

//                     {/* profile detail block */}
//                     <div className="flex flex-col gap-3  font-semibold text-lg md:text-xl text-center">
//                         <span className="text-gray-700 dark:text-gray-100 text-2xl md:text-3xl">
//                             {userData.first_name} {userData.last_name}
//                         </span>
//                         <span className="text-gray-400 dark:text-gray-500">
//                             {userData.email}
//                         </span>
//                         <span className="text-gray-400 dark:text-gray-500">
//                             {profile.phone}
//                         </span>

//                     </div>
//                     {/* edit button block */}
//                     <div className='flex items-center '>
//                         <button
//                             onClick={handleProfileEditModalChange}
//                             className='bg-blue-600 hover:bg-blue-700 p-4  text-gray-100 rounded-full text-md  md:text-lg font-semibold transition-all duration-300 flex'
//                         >
//                             <Pencil size={24} className='mr-2' />
//                             Edit Profile</button>
//                     </div>
//                 </div>

//                 <div className='flex flex-col gap-5'>
//                     <div className=''>
//                         <span className="text-xl font-semibold text-gray-700 dark:text-gray-100  text-left capitalize ">Account Information</span>
//                     </div>

//                     <div className="flex flex-col space-y-1 bg-gray-200 py-6 px-3 rounded-2xl dark:bg-gray-800/30 shadow-md transition-all duration-300">

//                         <label htmlFor="name" className='text-lg  text-gray-700 dark:text-gray-300 font-bold'>Bio</label>
//                         <span className="text-lg font-semibold  px-3 text-gray-500 dark:text-gray-500 ">{profile.bio}</span>
//                     </div>

//                     <div className="flex flex-col space-y-1 bg-gray-200 py-6 px-3 rounded-2xl dark:bg-gray-800/30 shadow-md transition-all duration-300">

//                         <label htmlFor="name" className='text-lg  text-gray-700 dark:text-gray-300 font-bold'>Residential Address</label>
//                         <span className="text-lg font-semibold  text-gray-500 px-3 dark:text-gray-500 ">{profile.address}</span>
//                     </div>

//                     <div className="flex flex-col space-y-1 bg-gray-200 py-6 px-3 rounded-2xl dark:bg-gray-800/30 shadow-md transition-all duration-300">

//                         <label htmlFor="name" className='text-lg  text-gray-700 dark:text-gray-300 font-bold'>Social Media</label>
//                         <div className="flex flex-wrap justify-around">

//                             <div className="flex flex-col space-y-1">

//                                 <a
//                                     href={`${profile.instagram_link}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer" className="text-xl font-semibold  text-left text-blue-600 hover:underline">Instagram</a>
//                             </div>

//                             <div className="flex flex-col space-y-1">

//                                 <a
//                                     href={`${profile.linkedin_link}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer" className="text-xl font-semibold  text-left text-blue-600 hover:underline">Linkedin</a>
//                             </div>

//                             <div className="flex flex-col space-y-1">

//                                 <a
//                                     href={`${profile.facebook_link}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-xl font-semibold  text-left text-blue-600 hover:underline">Facebook</a>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AdminProfile



import { Calendar, Mail, Pencil } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import { BASE_IMAGE_URL } from '../../constants/Api';
import AdminProfileEditModal from './AdminProfileEditModal';

const AdminProfile = ({ isAdminProfileEditModal, setIsAdminProfileEditModal, handleProfileEditModalChange }) => {
    const { profile, userData, loading } = useAuth();


    const getProfileImage = (imagePath) => {
        // FIX: Safely fallback to a beautiful, functional avatar with proper string interpolation
        if (!imagePath) {
            const seed = userData?.first_name || "Admin";
            return `https://dicebear.com{seed}`;
        }

        // If it's a Cloudinary link, use it exactly as it is
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath.trim();
        }

        // Account configuration routing match for older static asset uploads
        return `${BASE_IMAGE_URL}/api/${imagePath}`;
    };

    if (loading) {
        return <div className="flex flex-col min-h-screen w-70 animate-pulse bg-gray-100 p-4 " />
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 w-full min-h-screen transition-all duration-300 flex flex-col gap-5 p-4 md:p-8 font-body">

            {/* Desktop screen */}
            {/* header block */}
            <div className='flex flex-col gap-8'>
                <div className="header  text-left md:text-left text-gray-600 dark:text-gray-100 space-x-3 hidden lg:flex flex-col">
                    <span className="font-bold text-2xl md:text-3xl lg:text-4xl">My Profile</span>
                    <span className="text-md md:text-lg text-gray-500 dark:text-gray-400 mt-1 ">
                        Manage your profile information and account settings.
                    </span>
                </div>

                {/* profile edit modal */}
                {isAdminProfileEditModal && <AdminProfileEditModal
                    isAdminProfileEditModal={isAdminProfileEditModal}
                    setIsAdminProfileEditModal={setIsAdminProfileEditModal}
                />}

                {/* profile block */}
                <div className="hidden lg:flex justify-between w-full p-4 md:p-6 bg-gray-200 dark:bg-gray-800/30 rounded-xl border border-gray-500/20 shadow-sm transition-all duration-300">
                    {/* profile image and detail block */}
                    <div className='flex gap-5'>
                        {/* profile image block */}
                        <div className="image-block rounded-full items-center flex">
                            {/* 🛠️ FIXED: Wrapped image source inside the safety handler function */}
                            <img
                                src={getProfileImage(profile?.image)}
                                alt="Profile Avatar"
                                className="rounded-full object-cover border border-gray-300 dark:border-gray-600 bg-white w-40 h-40"
                            />
                        </div>

                        {/* profile details block */}
                        <div className="flex flex-col gap-4">
                            <span className="text-4xl text-gray-700 dark:text-gray-100 font-bold capitalize ">
                                {userData.first_name} {userData.last_name || "Admin"}
                            </span>
                            <span className="text-blue-600 text-xl capitalize ">Admin</span>
                            <div className="flex gap-3 text-gray-700 dark:text-gray-100 text-xl">
                                <Mail size={30} />
                                <span>{userData.email}</span>
                            </div>
                            <div className="flex gap-3 text-gray-700 dark:text-gray-100 text-xl capitalize ">
                                <Calendar size={30} />
                                <span>Joined September 3rd, &nbsp; 2026</span>
                            </div>

                        </div>
                    </div>

                    {/* edit button block */}
                    <div className='flex items-center '>
                        <button
                            onClick={handleProfileEditModalChange}
                            className='bg-blue-600 hover:bg-blue-700 px-6  text-gray-100 rounded-xl text-lg md:text-xl font-semibold transition-all duration-300 flex py-4'
                        >
                            <Pencil size={30} className='mr-3' />
                            Edit Profile</button>
                    </div>
                </div>

                {/* profile main detail block */}
                <div className="hidden lg:flex flex-col justify-between w-full p-4 md:p-6 bg-gray-200 dark:bg-gray-800/30 rounded-xl border border-gray-500/20 shadow-sm transition-all duration-300">
                    <div>
                        <span className="text-2xl font-semibold text-gray-700 dark:text-gray-100  text-left capitalize">Account Information</span>
                    </div>

                    <div className='mt-3 ml-[5%] gap-8 space-x-3 grid grid-cols-3'>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Full Name</label>
                            <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">{userData.first_name} {userData.last_name}</span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Email Address</label>
                            <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">{userData.email}</span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Role</label>
                            <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">Admin</span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Bio</label>
                            <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">{profile.bio}</span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Residence Address</label>
                            <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">{profile.address}</span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className='text-lg font-normal  text-gray-500 dark:text-gray-500'>Phone</label>
                            <span className="text-xl font-semibold  text-left text-gray-700 dark:text-gray-300">{profile.phone}</span>
                        </div>


                        <div className="flex flex-col space-y-1 bg-gray-200 py-6 px-4 rounded-2xl dark:bg-gray-800/30 shadow-md transition-all duration-300">

                            <label
                                htmlFor="social-media"
                                className="text-lg text-gray-700 dark:text-gray-300 font-bold"
                            >
                                Social Media
                            </label>

                            <div
                                id="social-media"
                                className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3"
                            >

                                <a
                                    href={profile.instagram_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit my Instagram profile"
                                    className="w-full text-center px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700/40 text-base sm:text-lg font-semibold text-blue-600 hover:underline break-words"
                                >
                                    Instagram
                                </a>

                                <a
                                    href={profile.linkedin_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700/40 text-base sm:text-lg font-semibold text-blue-600 hover:underline break-words"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
