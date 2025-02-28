import React, {useEffect, useState} from "react";
import Post from "../components/Post";

const Home = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    window.history.pushState({}, "", `/posts/${post.id}`);
  };

  const closeModal = () => {
    setSelectedPost(null);
    window.history.pushState({}, "", "/");
  };

  const [posts, setPosts] = useState([]);
  
      useEffect(() => {
          const getPosts = async () => {
              try {
                  const response = await fetch("http://localhost:8000/posts", {
                      method: "GET",
                  });

                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }

                  const data = await response.json(); // ✅ Correctly await JSON parsing
                  setPosts(data); // ✅ Now setting `posts` as an array
              } catch (error) {
                  console.error("Error fetching posts:", error);
              }
          };

          getPosts();
      }, []);

  return (
    <section className="bg-gradient-to-br h-full from-gray-950 to-gray-900 py-10 ">
        <div>
      <h1>Home</h1> 
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 h-full p-4 py-10" >
        {posts.map((post,i) => (
        <div key={post.id} onClick={() => handlePostClick(post)} >
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
