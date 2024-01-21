import React from "react";
import ContactForm from "../components/Contact/ContactForm";
import { Card } from "flowbite-react";

const Contact: React.FC = () => {
	return (
		<Card className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 py-12 px-4 sm:px-6 lg:px-8 rounded-none">
			<div className="max-w-md w-full space-y-8 dark:bg-slate-900 p-6 rounded-md bg-purple-50 text-black">
				<div className="">
					<h2 className="mt-6 text-center text-3xl font-extrabold dark:text-white text-black">
						Contact Us
					</h2>
					<p className="mt-2 text-center text-sm dark:text-gray-300 text-black">
						Please fill out the form below and we will get back to
						you as soon as possible.
					</p>
				</div>
				<ContactForm />
			</div>
		</Card>
	);
};

export default Contact;
