// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900">
			<div className="text-6xl text-white">
				<FontAwesomeIcon icon={faGamepad} />
			</div>
			<h1 className="text-4xl text-white font-bold my-4">
				Uh-oh! Page Not Found
			</h1>
			<p className="text-lg text-white">
				We're sorry, but the page you're looking for does not exist.
				Please check the URL or try another page.
			</p>
			<a
				onClick={() => navigate(-1)}
				className="mt-6 px-6 py-3 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-transparent hover:border-2 hover:text-white transition-colors cursor-pointer"
			>
				Go Back!
			</a>
		</div>
	);
};

export default NotFound;
