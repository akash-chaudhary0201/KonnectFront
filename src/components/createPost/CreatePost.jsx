import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("Token on create post page :- ", token);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://konnect-back.vercel.app/kt/teacher/createPost",
        { title, content },
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/feed");
      } else {
        setError(response.data.message || "Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    }
  };

  return (
    <div className="flex justify-center items-center px-[100px] h-screen bg-[#FFFBE6]">
      <div className="flex bg-white rounded-3xl h-[500px] p-6">
        <div className="w-[400px] p-6">
          <h1 className="text-[30px] font-medium">Create a Post</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="text-[16px] text-gray-400">
              Post Title
            </label>{" "}
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-400 focus:outline-none p-2 w-full rounded-xl text-black"
              placeholder="Enter post title"
            />{" "}
            <br /> <br />
            <label htmlFor="content" className="text-[16px] text-gray-400">
              Post Content
            </label>{" "}
            <br />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-400 focus:outline-none p-2 w-full rounded-xl text-black"
              placeholder="Enter post content"
            />{" "}
            <br />
            <input
              className="bg-[#818b7d] w-full mt-[20px] p-2 rounded-xl text-white cursor-pointer"
              type="submit"
              value="Create Post"
            />
          </form>
          {error && <p className="mt-[25px] text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
