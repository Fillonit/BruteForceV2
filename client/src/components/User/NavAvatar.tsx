import React, { useEffect, useState } from "react";
import { Avatar, Dropdown } from "flowbite-react";
import { API_BASE_URL } from "../../config";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notifyConfig from "../notifyConfig";

interface UserData {
	username: string;
	email: string;
	profile: {
		avatar: string;
	};
}

function NavAvatar() {
	const [userData, setUserData] = useState<UserData | null>(null);

	function handleSignOut() {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		toast.success("Signed out successfully!", notifyConfig as ToastOptions);
		setTimeout(() => {
			window.location.href = "/login";
		}, 1000);
	}

	useEffect(() => {
		const fetchUserData = async () => {
			const user = localStorage.getItem("user");
			const sessionToken = user
				? JSON.parse(user).authentication.sessionToken
				: null;

			try {
				const response = await fetch(`${API_BASE_URL}/users/me`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${sessionToken}`,
					},
				});

				const data = await response.json();
				console.log(data);
				setUserData(data.user);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData();
	}, []);

	if (!userData) {
		return null;
	}

	return (
		<div>
			<Dropdown
				label={
					<Avatar
						alt="User settings"
						img={userData.profile.avatar}
						rounded
					/>
				}
				arrowIcon={false}
				inline
			>
				<Dropdown.Header>
					<span className="block text-sm">{userData.username}</span>
					<span className="block truncate text-sm font-medium">
						{userData.email}
					</span>
				</Dropdown.Header>
				<Dropdown.Item>Dashboard</Dropdown.Item>
				<Dropdown.Item>Settings</Dropdown.Item>
				{/* <Dropdown.Item>Posts</Dropdown.Item> */}
				<Dropdown.Divider />
				<Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
			</Dropdown>
			<ToastContainer />
		</div>
	);
}

export default NavAvatar;
