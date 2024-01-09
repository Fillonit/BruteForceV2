// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import NotFound from "./components/notFound";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import Game from "./pages/Games";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
function App() {
  // const [userId, setUserId] = useState(localStorage.getItem("userId"));
  return (
    <Router>
      <Flowbite>
        <div className="min-h-screen flex flex-col ">
          {!window.location.pathname.includes("/dashboard") && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Game />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {!window.location.pathname.includes("/dashboard") && <Footer />}
        </div>
        <DarkThemeToggle className="fixed bottom-2 right-2 text-white dark:text-white" />
      </Flowbite>
    </Router>
  );
}

export default App;
