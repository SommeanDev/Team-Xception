import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log(`http://localhost:8000/posts/${id}`)
        const response = await fetch(`http://localhost:8000/posts/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const postData = await response.json();
        setPost(postData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
      <section className="bg-gray-900 text-white p-10 min-h-screen">
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-300">{post.content}</p>
          <p className="text-gray-400 mt-4">Author: {post.author || "Unknown"}</p>
        </div>
      </section>
  );
};

export default ViewPost;
