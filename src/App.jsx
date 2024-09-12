import "./App.css";
import CreatePost from "./components/createPost/CreatePost";
import LoginPage from "./components/login/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProfile from "./components/userProfile/UserProfile";
import FeedPage from "./components/feed/FeedPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/me" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
