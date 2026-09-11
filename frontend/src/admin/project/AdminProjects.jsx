import React, { useState } from 'react'
import { Search, Loader2, XCircle } from 'lucide-react';
import ProjectCard from './AdminProjectCard';
import { useQueryContext } from '../../Context/GeneralQueryContext';

const AdminProjects = () => {
  const { projects, loading } = useQueryContext();
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
     {/* Header & Search Bar Container */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="font-heading text-2xl font-bold lg:text-3xl text-gray-900 dark:text-white">
            All Projects
          </h2>
          <p className="text-sm text-gray-400 mt-1 font-body">Manage and view your projects history</p>
        </div>

        {/* Search Input block */}
        <div className="group relative flex h-12 w-full max-w-md items-center rounded-xl border border-gray-200 bg-white px-4 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-950 dark:focus-within:border-blue-400">
          <Search className="h-5 w-5 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-full w-full bg-transparent border-0 pl-3 font-body text-sm font-normal text-gray-900 placeholder:text-gray-400 outline-none focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
        </div>
      </div>


      {/* project list block */}
      <div className='mt-6 flex-1 overflow-y-auto rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 dark:bg-gray-950/40 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
          {filteredProject.length === 0 ? (
            <div className="flex min-h-[300px] w-full flex-col items-center justify-center text-center">
              <XCircle className="h-10 w-10 text-gray-300 dark:text-gray-600" />
              <p className="mt-4 font-body text-base font-medium text-gray-500 dark:text-gray-400">
                No results match "{search}"
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-2 text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Clear search query
              </button>
            </div>
          )
            :
            (filteredProject.map((project) => <ProjectCard key={project.id} project={project} />))}
        </div>
      </div>




    </div>
  )
}

export default AdminProjects