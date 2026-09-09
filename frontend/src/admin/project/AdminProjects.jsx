import React, { useState } from 'react'
import { Search, Loader2, AlertCircle } from 'lucide-react';
import ProjectCard from './AdminProjectCard';
import { useQueryContext } from '../../Context/GeneralQueryContext';

const AdminProjects = () => {
  const { projects, loading, errorMessage } = useQueryContext(); 
  const [search, setSearch] = useState("");

  const filteredProject = projects.filter(project => project.name.toLowerCase().includes(search.toLowerCase()));


  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-transparent">
        <div className="text-blue-500 animate-spin">
          <Loader2 size={64} />
        </div>
      </div>
    );
  }




  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full p-12 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20 ">
        <FolderGit2 className="w-12 h-12 text-gray-400 dark:text-gray-600 stroke-[1.5]" />
        <h3 className="mt-4 text-base font-semibold text-gray-800 dark:text-gray-200">No projects found</h3>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500 max-w-xs">
          Get started by uploading your very first project using the upload tool in the navbar above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 w-full h-full lg:h-[calc(100vh-4rem)] lg:overflow-hidden transition-all duration-300 p-4 md:p-8 flex flex-col ">

      {/* header block */}
      <div className="flex justify-between rounded-lg">

        <div className='hidden md:flex'>
          <h2 className='font-body font-bold text-2xl lg:text-3xl'>All projects</h2>
        </div>

        {/* search project block */}
        <div className="group relative flex items-center w-full max-w-sm lg:max-w-lg h-14 px-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-all duration-200 focus-within:bg-white dark:focus-within:bg-gray-950 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-gray-950">


          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200 shrink-0" />


          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-full bg-transparent border-0 outline-none pl-3 font-body font-normal text-md text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-0"
          />
        </div>
      </div>

      {/* project list block */}
      <div className='flex flex-col gap-4 p-4 w-full h-full mt-8  rounded-2xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-900/40 shadow-sm overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all duration-300 '>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
          {filteredProject.length === 0 ? (
            <div className="col-span-full rounded-xl text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700/20 text-xl font-body text-center flex py-24 max-w-xl w-full mx-auto justify-center items-center ">
            <span>No result match your search.</span>
          </div>)
            :
            (filteredProject.map((project) => <ProjectCard key={project.id} project={project} />))}
        </div>
      </div>




    </div>
  )
}

export default AdminProjects