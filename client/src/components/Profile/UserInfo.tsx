import { Avatar } from "flowbite-react";
import { useState, useEffect } from "react";
import PostList from "../Posts/PostsList";
import { API_BASE_URL } from "../../config";

interface UserData {
	username: string;
	email: string;
	profile: {
		firstName: string;
		lastName: string;
		avatar: string;
		bio: string;
	};
	authentication: {
		password: string;
		salt: string;
		sessionToken: string;
	};
	_id: string;
	role: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

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

interface UserInfoProps {
	user: UserData | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/posts/author/${user?._id}`
				);
				const data = await response.json();
				setPosts(data.posts);
			} catch (error) {
				console.error("Failed to fetch posts:", error);
			}
		};

		fetchPosts();
	}, [user?._id]);

	if (!user) {
		return null;
	}
	return (
		<div className="bg-white shadow overflow-hidden sm:rounded-lg">
			<div className="px-4 py-5 sm:px-6 flex items-center">
				<Avatar img={user.profile.avatar} size="lg" className="mr-4" />
				<div>
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						User Information
					</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">
						Personal details and application.
					</p>
				</div>
			</div>
			<div className="border-t border-gray-200">
				<dl>
					<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Full name
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{user.profile.firstName} {user.profile.lastName}
						</dd>
					</div>
					<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Email address
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{user.email}
						</dd>
					</div>
					<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Bio
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{user.profile.bio}
						</dd>
					</div>
					<PostList postsList={posts} />
				</dl>
			</div>
		</div>
	);
};

export default UserInfo;
