import React, { useState } from "react";

const ContactForm: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission logic here
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto">
			<div className="mb-4">
				<label
					htmlFor="name"
					className="block mb-2 text-sm font-medium text-white"
				>
					Name
				</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full px-4 py-2 border border-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-900 dark:text-white dark:border-gray-300"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="email"
					className="block mb-2 text-sm font-medium text-white"
				>
					Email
				</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full px-4 py-2 border border-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-900 dark:text-white dark:border-gray-300"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="message"
					className="block mb-2 text-sm font-medium text-white"
				>
					Message
				</label>
				<textarea
					id="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="w-full px-4 py-2 border border-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-900 dark:text-white dark:border-gray-300"
					required
				></textarea>
			</div>
			<button
				type="submit"
				className="w-full px-4 py-2 text-white bg-purple-900 rounded-md hover:bg-purple-950 dark:bg-purple-500"
			>
				Submit
			</button>
		</form>
	);
};

export default ContactForm;
