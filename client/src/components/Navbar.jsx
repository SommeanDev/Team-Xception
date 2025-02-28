import React from 'react'
import { Search, Plus, User } from 'lucide-react'
const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-16">

          <div className="flex-shrink-0 flex items-center text-white">
            Brainwave
          </div>
          

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <img src="/Search.svg" alt="Brainwave Logo" className="h-5 w-5 mr-2" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="pl-15 pr-3 py-1.5 w-2xl  border border-gray-600 rounded-full text-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button type="button" className="inline-flex flex-row-reverse items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-500 focus:ring-indigo-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </button>
            <button type="button" className="p-1 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;