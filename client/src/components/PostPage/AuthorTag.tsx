"use client";

import { Avatar } from "flowbite-react";

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

function AuthorTag({ author }: { author: Author }) {
	return (
		<Avatar img={author.profile.avatar} rounded>
			<div className="space-y-1 font-medium dark:text-white">
				<div>{author.username}</div>
				<div className="text-sm text-gray-500 dark:text-gray-400">
					{author.profile.firstName} {author.profile.lastName}
				</div>
			</div>
		</Avatar>
	);
}

export default AuthorTag;
