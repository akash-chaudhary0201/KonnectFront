import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const ak = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(role);

  useEffect(() => {
    if (!ak) {
      navigate("/");
      return;
    }
    const fetchFeed = async () => {
      try {
        const response = await axios.get(
          "https://konnectback-1.onrender.com/kt/feed",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setPosts(response.data.posts);
        }
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    };
    fetchFeed();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://konnect-back.vercel.app/kt/logout",
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        localStorage.clear();
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <button onClick={handleLogout} className="bg-black text-white p-2">
        LogOut
      </button>
      {role == "teacher" ? (
        <Link to={"/createPost"}>
          <button>Create Post</button>
        </Link>
      ) : null}
      <Link to={"/me"}>
        <button className="ml-[10px] bg-red-300 p-[10px]">Show Profile</button>
      </Link>

      <div className="w-full max-w-md">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="border p-4 mb-2">
              <h2>{post.title}</h2>
              <p>{post.author.name}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
