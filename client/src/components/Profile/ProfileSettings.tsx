import React, { useEffect, useState } from "react";
import { Button, TextInput, FileInput, Label } from "flowbite-react";
import { API_BASE_URL } from "../../config";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import notifyConfig from "../notifyConfig";

const inputTheme = {
	field: {
		input: {
			colors: {
				purple: "border-purple-500 bg-purple-50 text-purple-900 placeholder-purple-700 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-400 dark:bg-purple-100 dark:focus:border-purple-500 dark:focus:ring-purple-500 ",
			},
		},
	},
};

interface User {
	_id: string;
	username: string;
	email: string;
	profile: {
		firstName: string;
		lastName: string;
		avatar: string;
		bio: string;
	};
	authentication: {
		password: string;
		sessionToken: string;
	};
}

const SettingsPage: React.FC = () => {
	const [user, setUser] = useState<User>({
		_id: "",
		username: "",
		email: "",
		profile: { firstName: "", lastName: "", avatar: "", bio: "" },
		authentication: { password: "", sessionToken: "" },
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		if (name === "firstName" || name === "lastName") {
			setUser((prevUser) => ({
				...prevUser,
				profile: {
					...prevUser.profile,
					[name]: value,
				},
			}));
		} else {
			setUser({
				...user,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const UpdateToast = toast.loading("Updating Profile...", {
			autoClose: 3000,
		});
		try {
			const response = await fetch(`${API_BASE_URL}/users/${user._id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: user.authentication.sessionToken,
				},
				body: JSON.stringify({
					...user,
				}),
			});
			const data = await response.json();
			if (response.status === 200) {
				toast.dismiss(UpdateToast);
				toast.success("Profile Updated Successfully!", {
					...notifyConfig,
				} as ToastOptions);
			} else {
				toast.dismiss(UpdateToast);
				toast.error("Profile Update Failed!", {
					...notifyConfig,
				} as ToastOptions);
			}
			console.log(data);
		} catch (error) {
			toast.error("Profile Update Failed!", {
				...notifyConfig,
			} as ToastOptions);
			console.error(error);
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();

			reader.onload = (e) => {
				setUser((prevUser) => ({
					...prevUser,
					profile: {
						...prevUser.profile,
						avatar: e.target?.result as string,
					},
				}));
			};

			reader.readAsDataURL(event.target.files[0]);
		}
	};

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
				if (data.user == null) {
					localStorage.removeItem("token");
					localStorage.removeItem("user");
					return;
				}
				setUser(data.user);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<div className="flex justify-center bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 py-10 ">
			<div className="w-full max-w-md ">
				<form
					onSubmit={handleSubmit}
					className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-700"
				>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
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
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
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
							className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="firstName"
						>
							First Name
						</label>
						<TextInput
							name="firstName"
							placeholder="First Name"
							type="text"
							defaultValue={user.profile.firstName}
							onChange={handleChange}
							theme={inputTheme}
							color={"purple"}
							className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="lastName"
						>
							Last Name
						</label>
						<TextInput
							name="lastName"
							placeholder="Last Name"
							type="text"
							defaultValue={user.profile.lastName}
							onChange={handleChange}
							theme={inputTheme}
							color={"purple"}
							className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="password"
						>
							Password
						</label>
						<TextInput
							name="password"
							placeholder="Password"
							type="password"
							//   value={user.authentication.password}
							onChange={handleChange}
							theme={inputTheme}
							color={"purple"}
							className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<div id="fileUpload" className="max-w-md">
							<div className="mb-2 block">
								<Label
									htmlFor="file"
									value="Profile Picture"
									className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
								/>
							</div>
							<FileInput
								id="file"
								theme={inputTheme}
								color={"purple"}
								accept="image/*"
								onChange={handleFileChange}
								// helperText="A profile picture is useful to confirm your are logged into your account"
							/>
						</div>

						{/* <div className="flex items-center justify-center w-full">
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
						</div> */}
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							htmlFor="bio"
						>
							Bio
						</label>
						<TextInput
							name="bio"
							placeholder="Bio"
							type="text"
							defaultValue={user.profile.bio}
							onChange={handleChange}
							theme={inputTheme}
							color={"purple"}
							className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="flex items-center justify-between">
						<Button
							type="submit"
							color="purple"
							className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  dark:text-white"
						>
							Save Changes
						</Button>
					</div>
				</form>
				<ToastContainer />
			</div>
		</div>
	);
};

export default SettingsPage;
