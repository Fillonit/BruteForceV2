"use client";

import { Avatar } from "flowbite-react";
import { HiOutlineBadgeCheck } from "react-icons/hi";

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
	role: string;
}

function AuthorTag({ author }: { author: Author }) {
	return (
		<Avatar img={author.profile.avatar} rounded>
			<div className="space-y-1 font-medium dark:text-white">
				<div>
					{author.username}
					{author.role === "admin" && (
						<HiOutlineBadgeCheck className="inline-block ml-2 text-purple-500" />
					)}
				</div>
				<div className="text-sm text-gray-500 dark:text-gray-400">
					{author.profile.firstName} {author.profile.lastName}
				</div>
			</div>
		</Avatar>
	);
}

export default AuthorTag;
