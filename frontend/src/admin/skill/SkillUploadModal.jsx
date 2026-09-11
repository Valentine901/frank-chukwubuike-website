import React, { useState } from 'react'
import { X, Wrench } from 'lucide-react';
import { useQueryContext } from '../../Context/GeneralQueryContext';
import { api } from '../../constants/Api';

const SkillUploadModal = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {setIsSkillUploadModal, handleFetchSkills} = useQueryContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try{
            const response = await api.post("/skill/create-skill", {name: name});
            setIsSkillUploadModal(false);
            handleFetchSkills();
            return response;
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.detail);
            } else if (error.request){
                setErrorMessage(error.request);
            }else {
                setErrorMessage("Network error, check your network");
            }
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh] ">
        
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsSkillUploadModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer z-10"
                >
                  <X size={30} />
                </button>
        
                {/* Header Title */}
                <div className="flex flex-col mb-4 shrink-0 text-center mt-4 items-center">
                    <Wrench size={48} className='text-blue-600' />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-heading">
                   Add Skill
                  </h3>
                </div>
        
               
                <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        
                 
                  <div className="flex-1  pr-1 space-y-4 max-h-[50vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        
                    {/* Name Field */}
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="firstName" className="text-lg font-semibold text-gray-700 dark:text-gray-300 font-heading">
                        Skill Name
                      </label>
                      <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-700 px-3 py-2 mx-1 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-transparent">
                        {/* <User size={30} className="text-gray-400 dark:text-gray-500 shrink-0" /> */}
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="name"
                          className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-lg py-2"
                          required
                        />
                      </div>
                    </div>
        

        
        
                  <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 shrink-0 w-full bg-white dark:bg-gray-900">
                    {/* <button
                      type="button"
                      disabled={loading}
                      onClick={() => setIsSkillUploadModal(false)}
                      className="flex-1 py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 font-heading text-md font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button> */}
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
                        "Save"
                      )}
                    </button>
                  </div>
                  </div>
        
                </form>
              </div>
    </div>
  )
}

export default SkillUploadModal