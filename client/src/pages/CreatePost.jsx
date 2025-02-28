import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"; // Import Firebase auth

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null) // Store logged-in user ID
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid) // Set user ID when logged in
      } else {
        setUserId(null) // Reset if not logged in
      }
    })
    return () => unsubscribe()
  }, [])

  const createPost = async (e) => {
    e.preventDefault()

    if (!title || !description || !imageUrl) {
      alert("All fields are required!")
      return
    }
    if (!userId) {
      alert("You must be logged in to create a post!")
      return
    }

    const postData = {
      title,
      content: description,
      imageUrl,
      time: { _seconds: Math.floor(Date.now() / 1000), _nanoseconds: 0 },
      userId, // Use logged-in user ID
      categories: ["c1", "c2"],
    }

    try {
      setLoading(true)
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })

      if (!response.ok) throw new Error("Failed to create post")

      const data = await response.json()
      console.log("Post created:", data)

      setTitle("")
      setDescription("")
      setImageUrl("")

      alert("Post created successfully!")
      navigate("/") // Navigate after creating post
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
<<<<<<< Updated upstream
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
=======
      <form onSubmit={createPost} className="max-w-lg mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg my-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700">Title</label>
          <input
              type="text"
              id="title"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
              placeholder="Enter post title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
>>>>>>> Stashed changes
          />
        </div>

        <div className="mb-4">
<<<<<<< Updated upstream
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
=======
          <label htmlFor="image" className="block mb-2 font-medium text-gray-700">Image Url</label>
          <input
              type="url"
              id="image"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
              placeholder="Enter image url"
              required
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-medium text-gray-700">Content</label>
          <textarea
              id="content"
              rows="6"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
              placeholder="Write your post content here..."
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
          />
        </div>

        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
            onClick={navigate('/')}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
>>>>>>> Stashed changes
  )
}

export default CreatePost
