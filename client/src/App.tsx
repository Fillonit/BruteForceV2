// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import NotFound from "./components/notFound";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
function App() {
	// const [userId, setUserId] = useState(localStorage.getItem("userId"));
	return (
		<Router>
			<div className="min-h-screen flex flex-col">
				{!window.location.pathname.includes("/dashboard") && <Navbar />}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				{!window.location.pathname.includes("/dashboard") && <Footer />}
			</div>
		</Router>
	);
}

export default App;
