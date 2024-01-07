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
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-200">
			<div className="p-8 bg-white rounded-lg shadow-2xl w-96">
				<h1 className="text-3xl font-bold mb-4 text-purple-800">
					Sign Up
				</h1>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
				/>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
				/>
				<button
					onClick={handleSignUp}
					className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-300"
				>
					Sign Up
				</button>
			</div>
		</div>
	);
};

export default SignUp;
