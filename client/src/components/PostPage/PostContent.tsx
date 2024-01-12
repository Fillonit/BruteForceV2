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

interface PostCardProps {
	post: Post | null;
}

const PostContent: React.FC<PostCardProps> = ({ post }) => {
	if (!post) {
		return null;
	}

	return (
		<div
			key={post._id}
			className="relative font-tektur bg-slate-50 p-8 rounded-md"
		>
			<p
				className="text-black text-base dark:text-white"
				dangerouslySetInnerHTML={{
					__html: post.content,
				}}
			></p>
		</div>
	);
};

export default PostContent;
