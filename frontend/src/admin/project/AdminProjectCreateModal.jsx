import React, { useState } from 'react';
import { api } from '../../constants/Api';
import { UploadCloud, X , TextCursor} from "lucide-react";
import { useQueryContext } from '../../Context/GeneralQueryContext';

const AdminProjectCreateModal = ({ setIsAdminProjectCreateModal}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const { handleFetchOrderedProjects, handleFetchProjects } = useQueryContext();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        try {
            const response = await api.post("/project/create-project", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            setIsAdminProjectCreateModal(false);
            handleFetchOrderedProjects();
            handleFetchProjects();

        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.detail);
            } else if (error.request) {
                setErrorMessage(error.request);
            } else {
                setErrorMessage("No response from server, Check your network");
            }
        } finally {
            setLoading(false);
        }
    }



    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">

      {/* Modal Card Frame */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh] ">

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAdminProjectCreateModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer z-10"
        >
          <X size={30} />
        </button>

        {/* Header Title */}
        <div className="mb-4 shrink-0">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-heading">
            Upload Project
          </h3> 
        </div>

        {/* Form Wrapper */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1">

          {/* Scrollable Inputs Container: Keeps layout responsive on small/short screens */}
          <div className="flex-1  pr-1 space-y-4 max-h-[50vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

            {/* Avatar Upload Slot */}
            <div className="flex flex-col items-center justify-center gap-3 p-6 pb-2">
              <div className="relative group w-100 h-100 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800">
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
                Click square grid zone to upload project image
              </span>
            </div>

            {/* Name Field */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="firstName" className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-heading">
                Project Name
              </label>
              <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 mx-1 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                {/* <User size={30} className="text-gray-400 dark:text-gray-500 shrink-0" /> */}
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=""
                  className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2"
                  required
                />
              </div>
            </div>

            
            {/* Description Field */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="bio" className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-heading">
                Description
              </label>
              <div className="flex items-start space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 m-1 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                <TextCursor size={30} className="text-gray-400 dark:text-gray-500 shrink-0 mt-1" />
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project..."
                  className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2 resize-none"
                />
              </div>
            </div>

          </div>


          <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 shrink-0 w-full bg-white dark:bg-gray-900">
            <button
              type="button"
              disabled={loading}
              onClick={() => setIsAdminProjectCreateModal(false)}
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
                "Upload"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
    )
}

export default AdminProjectCreateModal