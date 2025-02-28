import React, { useState } from 'react'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false) // Ensure setLoading exists

  const createPost = async (e) => {
    e.preventDefault() // Prevent form submission from reloading the page

    if (!title || !description || !imageUrl) {
      alert("All fields are required!")
      return
    }

    const postData = {
      title,
      content: description,
      imageUrl,
      time: { _seconds: Math.floor(Date.now() / 1000), _nanoseconds: 0 },
      userId: "User123", // Replace with dynamic user ID if available
      categories: ["c1", "c2"], // Make this dynamic if needed
    }

    try {
      setLoading(true)
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })

      if (!response.ok) throw new Error("Failed to create post")

      const data = await response.json() // Add await here
      console.log("Post created:", data)

      // Clear form after successful submission
      setTitle("")
      setDescription("")
      setImageUrl("")

      alert("Post created successfully!")
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
      <form onSubmit={createPost} className="max-w-lg mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg my-8">
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block mb-2 font-medium text-gray-700">Image Url</label>
            <input
                type="url"
                id="image"
                name="image"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                name="content"
                rows="6"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Write your post content here..."
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
          </div>

          <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
  )
}

export default CreatePost