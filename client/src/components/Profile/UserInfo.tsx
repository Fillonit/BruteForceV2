import { Avatar } from "flowbite-react";
import { useState, useEffect } from "react";
// import PostList from "../Posts/PostsList";
import PostCard from "../Posts/PostsCard";
import { API_BASE_URL } from "../../config";
import { HiOutlineBadgeCheck } from "react-icons/hi";

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
	content: string;
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
		<div>
			<div className="bg-white shadow overflow-hidden sm:rounded-lg dark:bg-slate-900">
				<div className="px-4 py-5 sm:px-6 flex items-center">
					<Avatar
						img={user.profile.avatar}
						size="lg"
						className="mr-4"
					/>
					<div>
						<h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-white">
							{user.username}
							{user.role === "admin" && (
								<HiOutlineBadgeCheck className="inline-block ml-2 text-purple-500" />
							)}
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							Personal details and posts.
						</p>
					</div>
				</div>
				<div className="border-t border-gray-200 dark:border-slate-900 dark:text-white">
					<dl className="dark:bg-slate-800">
						<div className="bg-purple-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-slate-800 dark:text-white">
							<dt className="text-sm font-medium text-gray-500 dark:text-slate-300">
								Full name
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:bg-slate-800 dark:text-white">
								{user.profile.firstName} {user.profile.lastName}
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-slate-800 dark:text-white">
							<dt className="text-sm font-medium text-gray-500 dark:text-slate-300">
								Email address
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:bg-slate-800 dark:text-white">
								<a
									href={`mailto:${user.email}`}
									className="text-purple-500 hover:text-purple-700"
								>
									{user.email}
								</a>
							</dd>
						</div>
						<div className="bg-purple-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 dark:bg-slate-800 dark:text-white">
							<dt className="text-sm font-medium text-gray-500 dark:text-slate-300">
								Bio
							</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
								{user.profile.bio}
							</dd>
						</div>
						{/* <PostList postsList={posts} /> */}
					</dl>
				</div>
			</div>
			<h1 className="my-8 text-2xl text-white">Posts</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{posts.map((post: Post) => (
					<PostCard {...post} />
				))}
			</div>
		</div>
	);
};

export default UserInfo;
