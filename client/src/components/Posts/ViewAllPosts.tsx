/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
// import { API_BASE_URL } from "../../config";
import PostsCard from "./PostsCard";
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
	content: string;
	tags: string[];
	author: Author;
	createdAt: Date;
	updatedAt: string;
	likes: number;
	views: number;
}

const ViewAllPosts: React.FC<{ postsList: Post[] }> = ({ postsList }) => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900">
			<main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
				<h2 className="text-2xl font-bold mb-4 text-white dark:text-white">
					All Posts
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{postsList.map((post: Post) => (
						<PostsCard {...post} />
					))}
				</div>
			</main>
		</div>
	);
};

export default ViewAllPosts;
