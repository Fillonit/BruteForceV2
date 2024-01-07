import React, { useState } from "react";

const SignUp: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const handleSignUp = async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/auth/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
						username,
					}),
				}
			);
			// Handle response here
			const data = await response.json();
			console.log(data);
		} catch (error) {
			// Handle error here
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-3xl font-bold mb-4">Sign Up</h1>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-64 px-4 py-2 mb-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="w-64 px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
			/>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className="w-64 px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
			/>
			<button
				onClick={handleSignUp}
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			>
				Sign Up
			</button>
		</div>
	);
};

export default SignUp;
