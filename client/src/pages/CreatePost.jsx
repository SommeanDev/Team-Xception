import React from 'react'

const CreatePost = () => {
  return (
    <div className="bg-gradient-to-br h-full from-gray-950 to-gray-900 py-10">
       <form className="max-w-lg mx-auto p-4 md:p-6 bg-gray-800 rounded-lg shadow-lg my-8 ">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create a New Post</h2>
        
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium text-white">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium text-white">Image Url</label>
          <input
            type="url"
            id="image"
            name="image"
            className="w-full p-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500"
            placeholder="Enter image url"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-medium text-white">Content</label>
          <textarea
            id="content"
            name="content"
            rows="6"
            className="w-full p-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:gray-blue-500 placeholder:text-gray-500"
            placeholder="Write your post content here..."
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Post
        </button>
      </div>
    </form>
    </div>
  )
}

export default CreatePost