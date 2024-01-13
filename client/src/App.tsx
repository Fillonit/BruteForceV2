// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import NotFound from "./components/notFound";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProfileSettings from "./components/Profile/ProfileSettings";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
// import Game from "./pages/Games";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
function App() {
	// const [userId, setUserId] = useState(localStorage.getItem("userId"));
	return (
		<Router>
			<Flowbite>
				<div className="min-h-screen flex flex-col ">
					{!window.location.pathname.includes("/dashboard") && (
						<Navbar />
					)}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/post/:id" element={<Post />} />
						<Route path="/posts/" element={<Posts />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/settings" element={<ProfileSettings />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
					{!window.location.pathname.includes("/dashboard") && (
						<Footer />
					)}
				</div>
				<DarkThemeToggle className="fixed bottom-2 right-2 text-white dark:text-white bg-purple-400 hover:bg-purple-600 dark:hover:bg-purple-600 ring-0 focus:ring-0 dark:focus:ring-0 dark:ring-0" />
			</Flowbite>
		</Router>
	);
}
export default App;
