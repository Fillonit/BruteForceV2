"use client";

import { Button, Navbar } from "flowbite-react";
// import { FaUser } from "react-icons/fa";
import NavAvatar from "./User/NavAvatar";

function NavbarComponent() {
	const NavItems = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "About",
			path: "/about",
		},
		{
			name: "Blog",
			path: "/blog",
		},
		{
			name: "Games",
			path: "/games",
		},
		{
			name: "Contact",
			path: "/contact",
		},
	];

	const user = localStorage.getItem("user");
	const username = user ? JSON.parse(user).username : null;
	return (
		<div>
			<Navbar fluid className="font-tektur">
				<Navbar.Brand href="/">
					<span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
						BruteForce
					</span>
				</Navbar.Brand>
				<div className="flex md:order-2">
					{username ? (
						// <a
						// 	href="/profile"
						// 	className="bg-purple-500 dark:bg-purple-800 p-2 rounded-md"
						// >
						// 	<span className="flex items-center self-center whitespace-nowrap text-xl font-semibold text-white">
						// 		{username} <FaUser className="ml-2" />
						// 	</span>
						// </a>
						<NavAvatar />
					) : (
						<Button
							href="/login"
							className="bg-purple-700 dark:bg-purple-500 text-2xl font-bold"
						>
							Login
						</Button>
					)}
					<Navbar.Toggle />
				</div>
				<Navbar.Collapse>
					{NavItems.map((item) => (
						<Navbar.Link
							href={item.path}
							active={window.location.pathname === item.path}
							className={
								window.location.pathname === item.path
									? "text-purple-500 hover:text-purple-500 active:text-purple-500 bg-purple-700 dark:text-white md:bg-transparent md:text-purple-700 font-bold"
									: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-white font-bold"
							}
						>
							{item.name}
						</Navbar.Link>
					))}
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default NavbarComponent;
