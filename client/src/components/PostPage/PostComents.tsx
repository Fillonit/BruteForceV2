import React from "react";
interface Post {
  _id: string;
  title: string;
  imageURL: string;
  content: string[];
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: string;
  likes: number;
  views: number;
}

interface PostCardProps {
  post: Post | null;
}

const PostComments: React.FC<PostCardProps> = ({ post }) => {
  if (!post) {
    return null;
  }

  return (
    <div key={post._id} className="relative font-tektur">
      <h4 className="text-white dark:text-white mb-4 text-lg">Comments:</h4>
      <div className="border border-gray-400 bg-gray-900 p-4 rounded-lg shadow-lg">
        <p className="text-white text-base dark:text-zinc-400">
          <span className="text-white">Author:</span> {post.content}
        </p>
      </div>
      <div className="grid gap-3 grid-cols-2">
        <button className="bg-white mt-8 p-2 rounded-lg dark:bg-gray-900 dark:text-white text-black text-md">
          Add Comment
        </button>
        <button className="bg-white mt-8 p-2 rounded-lg dark:bg-gray-900 dark:text-white text-black text-md">
          Like
        </button>
      </div>
    </div>
  );
};

export default PostComments;
