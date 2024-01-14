import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { ToastContainer, UpdateOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notifyConfig from "./notifyConfig";
import { Kbd } from "flowbite-react";

interface SignUpProps {
	setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setLogIn }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	console.log(notifyConfig);

	const handleSignUp = async () => {
		const SignUpToast = toast.loading("Signing Up...", {
			autoClose: 3000,
		});
		try {
			const response = await fetch(`${API_BASE_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
					username,
				}),
			});
			const data = await response.json();
			if (response.status === 201) {
				toast.update(SignUpToast, {
					render: "Signed Up Successfully!",
					type: "success",
					...notifyConfig,
				} as UpdateOptions<unknown>);
				setLogIn(true);
			} else {
				toast.update(SignUpToast, {
					render: "Sign Up Failed!",
					type: "error",
					...notifyConfig,
				} as UpdateOptions<unknown>);
			}
			console.log(data);
		} catch (error) {
			toast.update(SignUpToast, {
				render: "Sign Up Failed!",
				type: "error",
				...notifyConfig,
			} as UpdateOptions<unknown>);
			console.error(error);
		}
	};

	return (
		<div className="bg-[url('https://wallpapers.com/images/hd/elden-ring-celestial-background-nwzkksz174zlnmtj.jpg')]">
			<div className="flex flex-col items-center justify-center h-screen dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-5">
				<div className="p-8 bg-white rounded-lg shadow-2xl w-96 dark:bg-slate-900">
					<h1 className="text-3xl font-bold mb-4 text-purple-800 dark:text-purple-400">
						Sign Up
					</h1>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-slate-900 dark:text-white dark:border-gray-800"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-slate-900 dark:text-white dark:border-gray-800"
					/>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-slate-900 dark:text-white dark:border-gray-800"
					/>
					<button
						onClick={handleSignUp}
						className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-300"
					>
						Sign Up
					</button>
					<div className="mt-4 text-center">
						<span className="text-gray-600 dark:text-gray-400">
							Already have an account?
						</span>
						<button
							onClick={() => {
								setLogIn(true);
							}}
							className="text-purple-500 hover:text-purple-600 dark:text-purple-400 ml-2 font-bold underline"
						>
							Sign In
						</button>
					</div>
				</div>
				<ToastContainer />
				<div className="text-slate-200 my-2">
					You can press{" "}
					<Kbd className="bg-purple-500 text-white dark:bg-purple-500">
						enter
					</Kbd>{" "}
					to attempt sign up.
				</div>
			</div>
		</div>
	);
};

export default SignUp;
