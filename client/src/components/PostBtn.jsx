import { Plus } from 'lucide-react'
import React from 'react'

const PostBtn = () => {
    return (
        <>
            <div
                className="relative inline-block  font-semibold leading-6 text-white bg-neutral-950 shadow-2xl cursor-pointer rounded-2xl shadow-emerald-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-emerald-600 py-2 px-3"
            >
                <span
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600  opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                ></span>
                <span className="relative z-10 block   rounded-2xl ">
                    <div className="relative z-10 flex items-center space-x-3">
                        <span
                            className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300 flex gap-2"
                        >
                            <p className='hidden md:block'>Create</p>
                        <Plus/>
                        </span>


                    </div>
                </span>
            </div>

        </>
    )
}

export default PostBtn