import React, { useContext } from 'react'
import { User } from 'lucide-react'
import PostBtn from './PostBtn';
import logo from "../assets/Logo.png"
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

  const navigate = useNavigate()
  const {setShowLogin} = useContext(AppContext);

  return (
    <nav className="bg-gray-800">
      <div className=" mx-auto px-3 md:px-10">
        <div className="flex items-center  justify-between h-16">

          <div className="flex-shrink-0 flex  text-white" >
            <img 
            src={logo}
             alt="logo" 
             className='w-25 md:w-32 lg:w-40 cursor-pointer hover:scale-95 duration-300'
             onClick={()=>navigate("/")}
             />
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <img src="/Search.svg" alt="Brainwave Logo" className="h-5 w-5 mr-2 hidden sm:block" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="pl-16 py-1.5 hidden sm:block  md:w-md lg:w-xl  border border-gray-600 rounded-full text-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span onClick={()=>navigate("/posts/create")}>
            <PostBtn/>
            </span>
            <button type="button" onClick={()=> setShowLogin(true)} className="p-1 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white cursor-pointer hover:scale-105 duration-200">
              <User className="h-6 w-6 " />
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar;