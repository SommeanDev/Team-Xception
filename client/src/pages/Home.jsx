import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Post from "../components/Post";

const Home = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:8000/posts")
                if (!response.ok) throw new Error("Failed to fetch posts")
                const postData = await response.json()

                setPosts(postData)

                // Extract unique user IDs from posts
                const userIds = [...new Set(postData.map(post => post.userId))]

                // Fetch user details for each user ID
                const userPromises = userIds.map(async (userId) => {
                    const res = await fetch(`http://localhost:8000/users/${userId}`)
                    if (!res.ok) return { userId, username: "Unknown" } // Handle missing users
                    const userData = await res.json()
                    return { userId, username: userData.username }
                })

                const userList = await Promise.all(userPromises)
                const userMap = userList.reduce((acc, user) => {
                    acc[user.userId] = user.username
                    return acc
                }, {})

                setUsers(userMap)
            } catch (error) {
                console.error("Error fetching posts or users:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])
  return (
    <section className="bg-gradient-to-br h-full from-gray-950 to-gray-900 py-10 min-h-screen">
        <div>
      <h1>Home</h1> 
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 h-full p-4 py-10" >
        {posts.map((post,i) => (
        <div key={post.id} onClick={() => {
            setSelectedPost(post);
            navigate(`/posts/${post.id}`);
        }} >
          <Post post={post}/>
        </div>
      ))}
        </div>

      {selectedPost && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "white", padding: "20px", borderRadius: "8px" }}>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
    </section>
  );
};

export default Home;
