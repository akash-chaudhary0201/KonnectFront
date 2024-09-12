import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7500/kt/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      const message = data.message;
      console.log(message);
      const role = data.user.role;
      console.log(role);

      if (data.success) {
        const token = data.token;
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/feed");
        }, 500);
        toast.success(message);
      } else {
        setError(
          toast.error(
            data.message || "Login failed. Please check your credentials."
          )
        );
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const serverMessage = error.response.data.message;
        toast.error(
          serverMessage || "Login failed. Please check your credentials."
        );
      } else {
        setError("An error occurred while logging in. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center px-[100px] h-screen bg-[#FFFBE6]">
      <ToastContainer />
      <div className="flex bg-white rounded-3xl h-[500px] p-6">
        <div className="w-[500px] bg-[#D1E9F6] p-6 rounded-3xl">
          <h1 className="text-[40px] font-medium">
            Join KonnectTeachers Now!!
          </h1>
          <p className="text-[#3795BD] text-[18px]">
            Connect, Learn and Share Knowledge
          </p>
          <p className="bg-[#818b7d] p-2 text-white rounded-3xl mt-[30px]">
            Our platform allows teachers to share their research and
            accomplishments while engaging students through posts, likes, and
            comments. Students can stay updated on the latest departmental
            research and participate in academic discussions.
          </p>
          <p className="mt-[20px] text-[#982B1C]">
            Login with the credentials given by the system admin
          </p>
        </div>
        <div className="w-[400px] p-6">
          <div>
            <h1 className="text-[30px] font-medium">Get Started</h1>
            <p className="text-gray-800 font-medium">Login Now</p>
            <form onSubmit={handleSubmit} className="mt-[20px]">
              <label htmlFor="email" className="text-[16px] text-gray-400">
                KIET email id
              </label>{" "}
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 focus:outline-none p-2 w-full rounded-xl text-black"
                placeholder="Your Email"
              />{" "}
              <br /> <br />
              <label htmlFor="password" className="text-[16px] text-gray-400">
                Password
              </label>{" "}
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 focus:outline-none p-2 w-full rounded-xl text-black"
                placeholder="Your Password"
              />{" "}
              <br />
              <input
                className="bg-[#818b7d] w-full mt-[20px] p-2 rounded-xl text-white cursor-pointer"
                type="submit"
                value={"Login"}
              />
            </form>
            {error && <p className="mt-[25px] text-red-500">{error}</p>}
            <p className="mt-[25px]">
              Having Trouble?{" "}
              <span className="text-[#982B1C] cursor-pointer">Contact</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
