import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import UserInfo from "./UserInfo";

interface UserData {
	username: string;
	email: string;
	profile: {
		avatar: string;
		firstName: string;
		lastName: string;
		bio: string;
	};
	authentication: {
		password: string;
		salt: string;
		sessionToken: string;
	};
	_id: string;
	firstName: string;
	lastName: string;
	bio: string;
	role: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

const ProfilePage = () => {
	const [userData, setUserData] = useState<UserData | null>(null);

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
		<div className="bg-gray-200 min-h-screen dark:bg-slate-700 bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900">
			<main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
				<UserInfo user={userData} />
			</main>
		</div>
	);
};

export default ProfilePage;
