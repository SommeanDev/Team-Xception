import React from 'react'

const CreatePost = () => {
  return (
    <form className="max-w-lg mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg my-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>
        
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700">Image Url</label>
          <input
            type="url"
            id="image"
            name="image"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter image url"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            name="content"
            rows="6"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:gray-blue-500"
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
  )
}

export default CreatePost