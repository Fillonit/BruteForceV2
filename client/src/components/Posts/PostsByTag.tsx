// PostByTag.tsx
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import PostByCard from "./PostsByTagCard";

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

interface Tag {
	_id: string;
	count: number;
}

const PostByTag: React.FC = () => {
	const [selectedOption, setSelectedOption] = useState<string>("");
	const [postsList, setPostsList] = useState<Post[]>([]);
	const [popularTags, setPopularTags] = useState<Tag[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				let url = `${API_BASE_URL}/posts`;
				if (selectedOption) {
					url = `${API_BASE_URL}/posts/byTag/${selectedOption}`;
				}

				const response = await fetch(url);
				const data = await response.json();
				setPostsList(data.posts);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, [selectedOption]);

	useEffect(() => {
		const fetchPopularTags = async () => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/posts/tags/popular`
				);
				if (response.ok) {
					const data = await response.json();

					setPopularTags(data.tags);
				} else {
					console.error(
						"Error fetching popular tags:",
						response.statusText
					);
				}
			} catch (error) {
				console.error("Error fetching popular tags:", error);
			}
		};

		fetchPopularTags();
	}, []);

	return (
		<div>
			<div className="flex items-center">
				<label
					htmlFor="selectSortBy"
					className="text-white dark:text-white mr-2"
				>
					Tag:
				</label>
				<select
					className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:border-gray-500"
					id="selectSortBy"
					value={selectedOption}
					onChange={(e) => setSelectedOption(e.target.value)}
				>
					<option value="" disabled>
						Select Tag
					</option>
					{popularTags.map((tag: Tag) => (
						<option key={tag._id} value={tag._id}>
							{tag._id}
						</option>
					))}
				</select>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
				{postsList.map((post: Post) => (
					<PostByCard
						key={post._id}
						post={post}
						selectedOption={selectedOption}
					/>
				))}
			</div>
		</div>
	);
};

export default PostByTag;
