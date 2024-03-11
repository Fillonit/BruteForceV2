// import React from "react";
import { Analytics } from "@vercel/analytics/react";
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
import EditUser from "./components/Admin/Users/EditUserPage";
import ViewUser from "./components/Admin/Users/ViewUserPage";
import EditGame from "./components/Admin/Games/EditGamePage";
import ViewGame from "./components/Admin/Games/ViewGamePage";
import EditPost from "./components/Admin/Posts/EditPostPage";
import ViewPost from "./components/Admin/Posts/ViewPostPage";
import ViewContact from "./components/Admin/Contacts/ViewContactPage";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import Games from "./pages/Games";
import GetStarted from "./pages/GetStarted";
import AllPosts from "./pages/AllPosts";
import PrivateRoute from "./utils/routeHandler";
import { PublicRoute } from "./utils/routeHandler";
import ViewPostsByTag from "./pages/ViewByTag";

function App() {
	// const [userId, setUserId] = useState(localStorage.getItem("userId"));
	return (
		<Router>
			<Flowbite>
				<div className="min-h-screen flex flex-col ">
					{/* {!window.location.pathname.includes("/dashboard") && ( */}
					<Navbar />
					{/* )} */}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/login"
							element={<PublicRoute element={<LoginPage />} />}
						/>
						<Route
							path="/dashboard/:table"
							element={<PrivateRoute element={<Dashboard />} />}
						/>
						<Route
							path="/dashboard/"
							element={<PrivateRoute element={<Dashboard />} />}
						/>
						<Route path="/createPost" element={<CreatePost />} />
						<Route path="/dashboard/" element={<Dashboard />} />
						<Route path="/post/:id" element={<Post />} />
						<Route path="/posts/" element={<Posts />} />
						<Route path="/allPosts" element={<AllPosts />} />
						<Route path="/games/" element={<Games />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/about" element={<About />} />
						<Route
							path="/postsByTag"
							element={<ViewPostsByTag />}
						/>
						<Route path="/settings" element={<ProfileSettings />} />
						<Route path="/contact" element={<Contact />} />
						<Route
							path="/edituser/:id"
							element={<PrivateRoute element={<EditUser />} />}
						/>
						<Route
							path="/viewuser/:id"
							element={<PrivateRoute element={<ViewUser />} />}
						/>
						<Route
							path="/editgame/:id"
							element={<PrivateRoute element={<EditGame />} />}
						/>
						<Route
							path="/viewgame/:id"
							element={<PrivateRoute element={<ViewGame />} />}
						/>

						<Route
							path="/editpost/:id"
							element={<PrivateRoute element={<EditPost />} />}
						/>
						<Route
							path="/viewpost/:id"
							element={<PrivateRoute element={<ViewPost />} />}
						/>
						<Route
							path="/viewcontact/:id"
							element={<PrivateRoute element={<ViewContact />} />}
						/>

						<Route path="/edituser/:id" element={<EditUser />} />
						<Route path="/viewuser/:id" element={<ViewUser />} />
						<Route path="/getStarted" element={<GetStarted />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
					{!window.location.pathname.includes("/dashboard") && (
						<Footer />
					)}
				</div>
				<DarkThemeToggle className="fixed bottom-2 right-2 text-white dark:text-white bg-purple-400 hover:bg-purple-600 dark:hover:bg-purple-600 ring-0 focus:ring-0 dark:focus:ring-0 dark:ring-0" />
			</Flowbite>
			<Analytics />
		</Router>
	);
}

export default App;
