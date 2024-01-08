"use client";

import { Avatar, Dropdown } from "flowbite-react";

function NavAvatar() {
	const user = localStorage.getItem("user");

	const username = user ? JSON.parse(user).username : null;
	const email = user ? JSON.parse(user).email : null;
	const avatar = user ? JSON.parse(user).profile.avatar : null;

	console.log(
		`user: ${user}, username: ${username}, email: ${email}, avatar: ${avatar}`
	);
	return (
		<Dropdown
			label={<Avatar alt="User settings" img={avatar} rounded />}
			arrowIcon={false}
			inline
		>
			<Dropdown.Header>
				<span className="block text-sm">{username}</span>
				<span className="block truncate text-sm font-medium">
					{email}
				</span>
			</Dropdown.Header>
			<Dropdown.Item>Dashboard</Dropdown.Item>
			<Dropdown.Item>Settings</Dropdown.Item>
			<Dropdown.Item>Posts</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item>Sign out</Dropdown.Item>
		</Dropdown>
	);
}

export default NavAvatar;
