import React, { useState } from "react";

interface Author {
	_id: string;
	username: string;
	email: string;
	profile: {
		firstName: string;
		lastName: string;
		bio: string;
		avatar: string;
	};
}
interface Post {
	_id: string;
	title: string;
	imageURL: string;
	content: string[];
	tags: string[];
	author: Author;
	createdAt: Date;
	updatedAt: string;
	likes: number;
	views: number;
}

interface PostCardProps {
	post: Post | null;
}

const PostComments: React.FC<PostCardProps> = ({ post }) => {
	const [comment, setComment] = useState("");
	const user = localStorage.getItem("user");

	if (!post) {
		return null;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await fetch("http://localhost:5000/comments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: comment,
					post: post._id,
					user: user ? JSON.parse(user)._id : null,
				}),
			});
			setComment("");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div key={post._id} className="relative font-tektur">
			<h4 className="text-white dark:text-white mb-4 text-lg">
				Comments:
			</h4>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-900 mb-3"
					placeholder="Add a comment"
				/>
				<button
					type="submit"
					className="bg-white mt-8 p-2 rounded-lg dark:bg-gray-900 dark:text-white text-black text-md"
				>
					Submit Comment
				</button>
			</form>
			{/* ... other code ... */}
		</div>
	);
};

export default PostComments;
