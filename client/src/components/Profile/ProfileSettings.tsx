import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";

const inputTheme = {
	field: {
		input: {
			colors: {
				purple: "border-purple-500 bg-purple-50 text-purple-900 placeholder-purple-700 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-400 dark:bg-purple-100 dark:focus:border-purple-500 dark:focus:ring-purple-500",
			},
		},
	},
};

interface User {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	profilePicture: string;
	bio: string;
}

const SettingsPage: React.FC = () => {
	const [user, setUser] = useState<User>({
		username: "",
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		profilePicture: "",
		bio: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Handle form submission here
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();

			reader.onload = (e) => {
				setUser({
					...user,
					profilePicture: e.target?.result as string,
				});
			};

			reader.readAsDataURL(event.target.files[0]);
		}
	};

	return (
		<div className="flex justify-center mt-6">
			<div className="w-full max-w-md">
				<form
					onSubmit={handleSubmit}
					className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4"
				>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<TextInput
							name="username"
							placeholder="Username"
							type="text"
							value={user.username}
							onChange={handleChange}
							theme={inputTheme}
							color={"purple"}
							// className="border-purple-500 bg-purple-50 text-purple-900 placeholder-purple-700 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-400 dark:bg-purple-100 dark:focus:border-purple-500 dark:focus:ring-purple-500"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<TextInput
							name="email"
							placeholder="Email"
							type="email"
							value={user.email}
							onChange={handleChange}
							theme={inputTheme}
							color={"purple"}
							className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="firstName"
						>
							First Name
						</label>
						<TextInput
							name="firstName"
							placeholder="First Name"
							type="text"
							value={user.firstName}
							onChange={handleChange}
							theme={inputTheme}
							color={"purple"}
							className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="lastName"
						>
							Last Name
						</label>
						<TextInput
							name="lastName"
							placeholder="Last Name"
							type="text"
							value={user.lastName}
							onChange={handleChange}
							theme={inputTheme}
							color={"purple"}
							className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<TextInput
							name="password"
							placeholder="Password"
							type="password"
							value={user.password}
							onChange={handleChange}
							theme={inputTheme}
							color={"purple"}
							className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Profile Picture
						</label>
						<div className="flex items-center justify-center w-full">
							<label
								htmlFor="dropzone-file"
								className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
							>
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<svg
										className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 20 16"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
										/>
									</svg>
									<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
										<span className="font-semibold">
											Click to upload
										</span>{" "}
										or drag and drop
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										SVG, PNG, JPG or GIF
									</p>
								</div>
								<input
									id="dropzone-file"
									type="file"
									className="hidden"
									onChange={handleFileChange}
								/>
							</label>
						</div>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="bio"
						>
							Bio
						</label>
						<TextInput
							name="bio"
							placeholder="Bio"
							type="text"
							value={user.bio}
							onChange={handleChange}
							theme={inputTheme}
							color={"purple"}
							className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="flex items-center justify-between">
						<Button
							type="submit"
							className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Save Changes
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SettingsPage;
