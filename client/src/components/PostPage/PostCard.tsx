import React, { useState } from "react";
import { FaEye, FaThumbsUp } from "react-icons/fa";
// import { BiSolidLike } from "react-icons/bi";
import AuthorTag from "./AuthorTag";
import { formatNumber } from "../../utils/formatNumber";
import { API_BASE_URL } from "../../config";

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

interface PostCardProps {
	post: Post | null;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
	const [likes, setLikes] = useState(post?.likes);
	const [hasLiked, setHasLiked] = useState(false);
	const user = localStorage.getItem("user");
	const userId = user ? JSON.parse(user)._id : null;
	function getTimeDifference(updatedAt: string): string {
		const now = new Date();
		const updatedTime = new Date(updatedAt);

		const timeDifference = now.getTime() - updatedTime.getTime();
		const seconds = Math.floor(timeDifference / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		if (days > 0) {
			return `${days} day${days > 1 ? "s" : ""} ago`;
		} else if (hours > 0) {
			return `${hours} hour${hours > 1 ? "s" : ""} ago`;
		} else if (minutes > 0) {
			return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
		} else {
			return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
		}
	}

	if (!post) {
		return null;
	}

	const handleLike = async () => {
		const response = await fetch(
			`${API_BASE_URL}/posts/likes/${post._id}/${userId}`,
			{
				method: "PATCH",
			}
		);

		if (response.ok) {
			setHasLiked(true);
			setLikes(likes ? likes : post?.likes + 1);
		}
	};

	return (
		<div
			key={post._id}
			className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg relative dark:bg-slate-900 font-tektur hover:shadow-2xl transition duration-300 ease-in-out transform"
		>
			<img
				className="w-full h-full object-cover"
				src={post.imageURL}
				alt={post.title}
			/>
			<div className="p-6 flex-grow">
				<div className="flex justify-between items-start">
					<div className="font-bold text-xl mb-2 dark:text-white">
						{post.title}
					</div>
					<AuthorTag author={post.author} />
					<div className="flex space-x-4">
						<div className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-white flex items-center text-md bg-gradient-to-r from-purple-500 to-purple-800">
							{formatNumber(post.views)}
							<FaEye className="ml-1 text-purple-50" />
						</div>
						<div
							className={`bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-white flex items-center text-md bg-gradient-to-r from-purple-500 to-purple-800 cursor-pointer ${
								hasLiked ? "text-purple-500" : "text-purple-50"
							}`}
							onClick={handleLike}
						>
							{formatNumber(likes ? likes : post?.likes)}
							<FaThumbsUp className="ml-1" />
						</div>
					</div>
				</div>
				<p className="text-gray-700 text-base line-clamp-2 dark:text-gray-400">
					Published at:{" "}
					{new Date(post.createdAt).toLocaleDateString()}{" "}
					<span className="text-purple-300">
						({getTimeDifference(post.createdAt.toString())})
					</span>
				</p>
				<p className="text-gray-700 text-base line-clamp-2 dark:text-gray-400">
					Last Edited at: {getTimeDifference(post.updatedAt)}
				</p>
				<div className="mt-4 flex flex-wrap">
					{post.tags.map((tag) => (
						<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2 dark:bg-gray-800 dark:text-gray-200 cursor-pointer hover:scale-110 hover:bg-purple-400 hover:text-white dark:hover:bg-purple-600">
							#{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default PostCard;
