// import React from "react";
// import ReactIcon from "../assets/react.svg";
import {
	FaUser,
	FaInfoCircle,
	FaEnvelope,
	FaBook,
	FaGamepad,
} from "react-icons/fa";

const Navbar = () => {
	const navItems = [
		{
			label: "Blog",
			icon: <FaBook className="inline-block mr-1 ml-4 text-lg" />,
			link: "/blog",
		},
		{
			label: "About",
			icon: <FaInfoCircle className="inline-block mr-1 ml-4 text-lg" />,
			link: "/about",
		},
		{
			label: "Contact",
			icon: <FaEnvelope className="inline-block mr-1 ml-4 text-lg" />,
			link: "/contact",
		},
		{
			label: "Games",
			icon: <FaGamepad className="inline-block mr-1 ml-4 text-lg" />,
			link: "/games",
		},
		{
			label: "Profile",
			icon: <FaUser className="inline-block mr-1 ml-4 text-lg" />,
			link: `/users/me`,
		},
	];

	return (
		<nav className="bg-white text-gray-800 shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<div className="flex-shrink-0 text-2xl font-semibold text-white bg-purple-400 px-2 rounded pb-1 hover:bg-purple-200 cursor-pointer">
							{/* <img
								className="h-8 w-8"
								src={ReactIcon}
								alt="Icon"
							/> */}
							BruteForce
						</div>
						<div className="ml-10 flex items-baseline space-x-2">
							{navItems.map((item, index) => (
								<a
									key={index}
									href={`${item.link}`}
									className="text-gray-800 hover:text-purple-600 hover:bg-purple-200 transition-colors duration-300 px-2 pr-6 py-2 rounded-md text-sm font-medium"
								>
									{item.icon} {item.label}
								</a>
							))}
						</div>
					</div>
					<div className="hidden md:block">
						<div className="ml-4 flex items-center md:ml-6">
							<a
								href="/login"
								className="text-gray-800 bg-purple-200 hover:bg-purple-400 hover:text-purple-600 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
							>
								Login
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
