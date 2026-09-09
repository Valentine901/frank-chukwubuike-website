

const HomePg = () => {

  return (
    <section id="#home" className='w-full min-h-screen flex justify-between  bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white px-4 md:px-8 pt-30 pb-20 shadow-sm transition-colors duration-300'>
      <div className="wrapper grid grid-cols-1 lg:flex">
        {/* text block */}
        <div className="space-y-6">
          <span className="text-blue-600 font-heading font-semibold text-3xl md:text-4xl">
            Hi, I'm Frank Dinyelu
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-700 dark:text-gray-100">
            Graphics Designer & Visual Creative
          </h1>
        </div>
        <div>
          <h2>User Profile</h2>
        </div>
      </div>
    </section>
  )
}

export default HomePg