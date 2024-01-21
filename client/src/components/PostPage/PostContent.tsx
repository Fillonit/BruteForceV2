import TextToSpeech from "../../utils/textToSpeech";
import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

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

const PostContent: React.FC<PostCardProps> = ({ post }) => {
	const [showTextToSpeech, setShowTextToSpeech] = useState<boolean>(false);

	const handleToggle = () => {
		setShowTextToSpeech(!showTextToSpeech);
	};

	if (!post) {
		return null;
	}

	return (
		<div
			key={post._id}
			className="relative font-tektur bg-slate-50 p-8 rounded-md dark:bg-slate-900"
		>
			<button
				onClick={handleToggle}
				className="flex items-center justify-center space-x-2 bg-purple-500 text-white rounded px-4 py-2 mb-4"
			>
				<FaMicrophone />
				<span>
					{showTextToSpeech
						? "Hide Text to Speech"
						: "Show Text to Speech"}
				</span>
			</button>
			{showTextToSpeech && <TextToSpeech text={post.content} />}
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
