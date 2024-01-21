import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
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

const PostCard: React.FC<Post> = (post) => {
	const [posts, setPosts] = useState<Post[]>([]);
	console.log(posts);

	function formatNumber(num: number) {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + "M";
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + "K";
		} else {
			return num;
		}
	}

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`${API_BASE_URL}/posts`);
			const data = await response.json();
			setPosts(data.posts);
		};

		fetchPosts();
	}, []);

	return (
		<Link to={`/post/${post._id}`} className="block">
			<div
				key={post._id}
				className="bg-white rounded-lg overflow-hidden shadow-lg relative dark:bg-slate-900 font-tektur"
			>
				<img
					className="w-full h-64 object-cover"
					src={post.imageURL}
					alt={post.title}
				/>
				<div className="absolute top-0 right-0 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold mr-2 mt-2 text-white flex items-center text-md bg-gradient-to-r from-purple-500 to-purple-800">
					{formatNumber(post.views)}
					<FaEye className="ml-1 text-purple-50" />
				</div>
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2 dark:text-white truncate line-clamp-1">
						{post.title}
					</div>
					<p className="text-gray-700 text-base line-clamp-2 dark:text-gray-400">
						{post.content}
					</p>
				</div>
				<div className="px-6 pt-4 pb-2">
					{post.tags.slice(0, 4).map((tag) => (
						<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2 dark:bg-gray-800 dark:text-gray-200 cursor-pointer hover:scale-110 hover:bg-purple-400 hover:text-white dark:hover:bg-purple-800">
							#{tag}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
};

export default PostCard;
