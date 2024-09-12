import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://konnect-back.vercel.app/kt/me",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  if (!user) {
    return (
      <div className="bg-[#02060a] h-screen flex items-center justify-center">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#02060a] px-[200px] pt-[100px] pb-[100px] h-screen">
        <div className="flex gap-[40px] ">
          <div className="h-[400px] w-[200px] rounded-2xl">
            <img
              src="https://rb.gy/z7les0"
              alt="User Profile"
              className="rounded-2xl h-full w-full object-cover"
            />
          </div>
          <div className="flex justify-center p-[40px] bg-[#182532] h-[400px] w-full rounded-2xl">
            <div>
              <h1 className="text-[40px] text-white font-medium">
                {user.name}
              </h1>
              <p className="text-[25px] text-[#7e7d7c]">{user.role}</p>
              <p className="text-[#FFBE98] mt-[20px]">{user.email}</p>
              <p className="mt-[20px] text-white">{user.about}</p>
              <Link to={"/feed"}>
                <button className="mt-[30px] bg-white px-3 rounded-xl float-right">
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
