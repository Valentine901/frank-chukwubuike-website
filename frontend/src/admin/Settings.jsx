import React from 'react'
import Skills from './skill/Skills'

const Settings = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 w-full h-auto lg:h-[calc(100vh-4rem)] lg:overflow-hidden transition-all duration-300 p-4 md:p-8 flex flex-col">
            <div className="flex justify-between rounded-lg">

                <div className='hidden md:flex'>
                    <h2 className='font-body font-bold text-2xl lg:text-3xl'>Settings</h2>
                </div>
            </div>
{/* skills block */}
            <div className="flex w-full rounded-xl shadow.lg p-4">
                <Skills />
            </div>
        </div>
    )
}

export default Settings