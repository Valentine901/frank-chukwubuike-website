import { useState } from "react";
import { User, UploadCloud, Phone, MapPin, TextCursor, X, Loader2 } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { api } from "../constants/Api"
import { preview } from "vite";

const AdminProfileEditModal = ({
  isAdminProfileEditModal,
  setIsAdminProfileEditModal
}) => {
  const { profile, userData } = useAuth();
  // user update data
  const [firstName, setFirstName] = useState(userData.first_name || "");
  const [lastName, setLastName] = useState(userData.last_name || "");
  const [email, setEmail] = useState(userData.email || "");
  // profile update data
  const [bio, setBio] = useState(profile.bio || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [address, setAddress] = useState(profile.address || "");
  const [linkedin, setLinkedin] = useState(profile.linkedin_link || "");
  const [facebook, setFacebook] = useState(profile.facebook_link || "");
  const [instagram, setInstagram] = useState(profile.instagram_link || "");
  const [erorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);


  if (!isAdminProfileEditModal) return null;

  // Handle temporary local image upload preview selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await Promise.all([
        api.put("/auth/admin-update-user", { first_name: firstName, last_name: lastName, email: email }),

        api.put("/admin/profile/update", { bio: bio, address: address, phone: phone, facebook_link: facebook, linkedin_link: linkedin, instagram_link: instagram }),
        
        api.post("/admin/profile/update-image", {image: imagePreview})
      ]);
      setIsAdminProfileEditModal(false);

    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.detail);
      } else if (error.request) {
        setErrorMessage(error.request);
      } else {
        setErrorMessage("Could not update profile");
      }
    } finally {
      setLoading(false);
    }


  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">

      {/* Modal Card Frame */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]">

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAdminProfileEditModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer z-10"
        >
          <X size={30} />
        </button>

        {/* Header Title */}
        <div className="mb-4 shrink-0">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-heading">
            Edit Profile Details
          </h3>
          <p className="text-md font-semibold text-gray-600 mt-1 font-heading">
            Update your administrator account identity parameters.
          </p>
        </div>

        {/* Form Wrapper */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">

          {/* Scrollable Inputs Container: Keeps layout responsive on small/short screens */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 max-h-[50vh] custom-scrollbar">

            {/* Avatar Upload Slot */}
            <div className="flex flex-col items-center justify-center gap-3 p-6 pb-2">
              <div className="relative group w-64 h-64 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <UploadCloud size={28} className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-md font-semibold text-gray-500 dark:text-gray-400 font-heading text-center">
                Click circular grid zone to upload avatar image
              </span>
            </div>

            {/* First Name Field */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="firstName" className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-heading">
                First Name
              </label>
              <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                <User size={30} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2"
                  required
                />
              </div>
            </div>

            {/* Last Name Field */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="lastName" className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-heading">
                Last Name
              </label>
              <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                <User size={30} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="phone" className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-heading">
                Phone Number
              </label>
              <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                <Phone size={30} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2"
                />
              </div>
            </div>

            {/* Address Field */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="address" className="font-semibold text-gray-700 dark:text-gray-300 font-heading text-lg">
                Address Of Residence
              </label>
              <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                <MapPin size={30} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter office address"
                  className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2"
                />
              </div>
            </div>
                        {/* Bio Field */}
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="bio" className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-heading">
                                Professional Bio
                            </label>
                            <div className="flex items-start space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                                <TextCursor size={30} className="text-gray-400 dark:text-gray-500 shrink-0 mt-1" />
                                <textarea
                                    id="bio"
                                    rows={3}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us about yourself..."
                                    className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2 resize-none"
                                />
                            </div>
                        </div>

                       
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="linkedin" className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-heading">
                                LinkedIn Profile Link
                            </label>
                            <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                                <span className="text-gray-400 dark:text-gray-500 shrink-0 font-bold text-lg font-mono">in</span>
                                <input
                                    id="linkedin"
                                    type="url"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                    placeholder="https://linkedin.com"
                                    className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2"
                                />
                            </div>
                        </div>

                        
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="facebook" className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-heading">
                                Facebook Profile Link
                            </label>
                            <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                                <span className="text-gray-400 dark:text-gray-500 shrink-0 font-bold text-lg font-mono">fb</span>
                                <input
                                    id="facebook"
                                    type="url"
                                    value={facebook}
                                    onChange={(e) => setFacebook(e.target.value)}
                                    placeholder="https://facebook.com"
                                    className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2"
                                />
                            </div>
                        </div>

                        
                        <div className="flex flex-col space-y-1.5 pb-2">
                            <label htmlFor="instagram" className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-heading">
                                Instagram Profile Link
                            </label>
                            <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                                <span className="text-gray-400 dark:text-gray-500 shrink-0 font-bold text-lg font-mono">Instagram</span>
                                <input
                                    id="instagram"
                                    type="url"
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)}
                                    placeholder="https://instagram.com"
                                    className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2"
                                />
                            </div>
                        </div>

                    </div>

                    
                    <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 shrink-0 w-full bg-white dark:bg-gray-900">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => setIsAdminProfileEditModal(false)}
                            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 font-heading text-md font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-heading text-md font-semibold text-white transition-all shadow-lg shadow-blue-600/20 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AdminProfileEditModal;
