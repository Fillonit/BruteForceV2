import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import PostContent from "./PostContent";
// import PostComments from "./PostComents";
import { API_BASE_URL } from "../../config";
import { useParams } from "react-router-dom";

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

const PostList = () => {
	const [postData, setPostData] = useState<Post | null>(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}/posts/${id}`);
				const data = await response.json();
				setPostData(data.post);
			} catch (error) {
				console.error("Error fetching post:", error);
			}
		};

		fetchPost();
	}, [id]);

	return (
		<div className="bg-gray-200 min-h-screen dark:bg-slate-700 bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 grid grid-cols-2">
			<main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
				<div className="grid gap-20">
					<PostCard post={postData} />
					{/* <PostComments post={postData} /> */}
				</div>
			</main>
			<div className="py-8 px-4">
				<PostContent post={postData} />
			</div>
		</div>
	);
};

export default PostList;
