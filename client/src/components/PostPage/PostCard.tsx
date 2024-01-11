import React from "react";
import { FaEye } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
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

const PostCard: React.FC<PostCardProps> = ({ post }) => {
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

  return (
    <div
      key={post._id}
      className="bg-white rounded-lg overflow-hidden shadow-lg relative dark:bg-slate-900 font-tektur"
    >
      <img
        className="w-full h-124 object-cover"
        src={post.imageURL}
        alt={post.title}
      />
      <div className="absolute top-0 right-0 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold mr-2 mt-2 text-white flex items-center text-md bg-gradient-to-r from-purple-500 to-purple-800">
        {post.views}
        <FaEye className="ml-1 text-purple-50" />
      </div>
      <div className="absolute top-10 right-0 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold mr-2 mt-2 text-white flex items-center text-md bg-gradient-to-r from-purple-500 to-purple-800">
        {post.likes}
        <BiSolidLike className="ml-1 text-purple-50" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 dark:text-white">
          {post.title}
        </div>
        <p className="text-base line-clamp-2 text-indigo-500 mb-2">
          Author: {post.author}
        </p>
        <p className="text-gray-700 text-base line-clamp-2 dark:text-gray-400">
          Created: {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-base line-clamp-2 dark:text-gray-400">
          Last Update: {getTimeDifference(post.updatedAt)}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {post.tags.slice(0, 4).map((tag) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2 dark:bg-gray-800 dark:text-gray-200">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
