/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";
// import { API_BASE_URL } from "../../config";
// import PostsCard from "./PostsCard";
// import PostByCard from "./PostsByTagCard";
import PostByTag from "./PostsByTag";
// interface Author {
// 	_id: string;
// 	username: string;
// 	email: string;
// 	profile: {
// 		firstName: string;
// 		lastName: string;
// 		bio: string;
// 		avatar: string;
// 	};
// }

// interface Post {
// 	_id: string;
// 	title: string;
// 	imageURL: string;
// 	content: string[];
// 	tags: string[];
// 	author: Author;
// 	createdAt: Date;
// 	updatedAt: string;
// 	likes: number;
// 	views: number;
// }

const PostsListByTag = () => {
	return (
		<div className="min-h-screen bg-gradient-to-bl from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900">
			<main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
				<h2 className="text-2xl font-bold mb-4 text-white dark:text-white">
					Posts By Tag
				</h2>
				<PostByTag />
			</main>
		</div>
	);
};

export default PostsListByTag;
