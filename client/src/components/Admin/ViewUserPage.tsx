import { useEffect, useState } from "react";
import { Avatar } from "flowbite-react"; //Button, FileInput, Label, Dropdown,
import { API_BASE_URL } from "../../config";
// import { ToastContainer, ToastOptions, toast } from "react-toastify";
// import notifyConfig from "../notifyConfig";
import { useParams } from "react-router-dom";

interface UserProfile {
	firstName: string;
	lastName: string;
	avatar: string;
	bio: string;
}

interface UserAuthentication {
	password: string;
	sessionToken: string;
}

interface User {
	[key: string]: unknown;
	_id: string;
	username: string;
	email: string;
	profile: UserProfile;
	role: string;
	authentication: UserAuthentication;
}

const ViewUser = () => {
	const { id } = useParams();
	const [user, setUser] = useState<User>({
		_id: "",
		username: "",
		email: "",
		role: "",
		profile: { firstName: "", lastName: "", avatar: "", bio: "" },
		authentication: { password: "", sessionToken: "" },
	});

	useEffect(() => {
		const fetchUserData = async () => {
			const user = localStorage.getItem("user");
			const sessionToken = user
				? JSON.parse(user).authentication.sessionToken
				: null;

			try {
				const response = await fetch(`${API_BASE_URL}/users/${id}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `${sessionToken}`,
					},
				});

				const data = await response.json();

				if (data.user == null) {
					localStorage.removeItem("token");
					localStorage.removeItem("user");
					return;
				}
				setUser(data.user);
				console.log(data.user);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<div className="flex justify-center bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 py-10 ">
			<div className="w-full max-w-sm ">
				<form className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-700">
					<div className="mb-4 ">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="username"
						>
							Profile Picture
						</label>
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="username"
						>
							<Avatar
								alt="User settings"
								img={user.profile.avatar}
								rounded
								size="lg"
								className="block"
							/>
						</label>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="username"
						>
							Username
						</label>
						<div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
							{user.username}
						</div>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="email"
						>
							Email
						</label>
						<div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
							{user.email}
						</div>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="firstName"
						>
							First Name
						</label>
						<div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
							{user.profile.firstName}
						</div>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="lastName"
						>
							Last Name
						</label>
						<div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
							{user.profile.lastName}
						</div>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="bio"
						>
							Bio
						</label>
						<div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
							{user.profile.bio}
						</div>
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white mt-4"
							htmlFor="role"
						>
							Role
						</label>
						<div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
							{user.role}
						</div>
					</div>
					<div className="flex items-center justify-between">
						{/* Remove the Button component if not needed */}
						{/* <Button
              type="submit"
              color="purple"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  dark:text-white"
            >
              Save Changes
            </Button> */}
					</div>
				</form>
				{/*<ToastContainer />*/}
			</div>
		</div>
	);
};

export default ViewUser;
