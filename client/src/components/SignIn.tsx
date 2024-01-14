import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { ToastContainer, toast, UpdateOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notifyConfig from "./notifyConfig";
import { Kbd } from "flowbite-react";

interface SignInProps {
	setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<SignInProps> = ({ setLogIn }) => {
	// const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = async (event: React.FormEvent) => {
		event.preventDefault();
		const SignInToast = toast("Signing In...", {
			autoClose: 3000,
		});
		try {
			const response = await fetch(`${API_BASE_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			const data = await response.json();
			console.log(data);
			if (response.status === 200) {
				localStorage.setItem(
					"token",
					data.user.authentication.sessionToken
				);
				localStorage.setItem("user", JSON.stringify(data.user));
				toast.update(SignInToast, {
					render: "Signed In Successfully!",
					type: "success",
					...notifyConfig,
				} as UpdateOptions<unknown>);
				setLogIn(true);
				setTimeout(() => {
					window.location.href = "/";
				}, 1000);
			} else {
				toast.update(SignInToast, {
					render: `${data.message}!`,
					type: "error",
					...notifyConfig,
				} as UpdateOptions<unknown>);
			}
		} catch (error) {
			toast.update(SignInToast, {
				render: "Sign In Failed!",
				type: "error",
				...notifyConfig,
			} as UpdateOptions<unknown>);
			console.error(error);
		}
	};

	return (
		<div className="bg-[url('https://i.pinimg.com/originals/43/fc/01/43fc016f861af30e156c4d7844922917.jpg')] bg-no-repeat bg-cover">
			<div className="flex flex-col items-center justify-center h-screen dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-5">
				<form
					className="p-8 bg-white rounded-lg shadow-2xl w-96 dark:bg-slate-900"
					onSubmit={handleSignIn}
				>
					<h1 className="text-3xl font-bold mb-4 text-purple-800 dark:text-purple-400">
						Sign In
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
					{/* <input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-slate-900 dark:text-white dark:border-gray-800"
					/> */}
					<button
						onClick={handleSignIn}
						className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-300"
					>
						Sign In
					</button>

					<div className="mt-4 text-center">
						<span className="text-gray-600 dark:text-gray-400">
							Don't have an account?
						</span>
						<button
							onClick={() => {
								setLogIn(false);
							}}
							// type="submit"
							className="text-purple-500 hover:text-purple-600 dark:text-purple-400 ml-2 font-bold underline"
						>
							Sign Up
						</button>
					</div>
				</form>
				<ToastContainer />
				<div className="text-slate-200 my-2">
					You can press{" "}
					<Kbd className="bg-purple-500 text-white dark:bg-purple-500">
						enter
					</Kbd>{" "}
					to attempt sign in.
				</div>
			</div>
		</div>
	);
};

export default SignIn;
