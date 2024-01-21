import React, { useState } from "react";
import { API_BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { Button, Modal } from "flowbite-react";

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

interface Comment {
  _id: string;
  content: string;
  user: Author;
  createdAt: Date;
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
  comments: Comment[];
}
interface PostCardProps {
  post: Post | null;
}

const PostComments: React.FC<PostCardProps> = ({ post }) => {
  if (!post) {
    return null;
  }

  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div key={post._id} className="relative font-tektur">
      <h4 className="text-white dark:text-white mb-4 text-lg">Comments:</h4>

      <div className="border border-gray-400 bg-gray-900 p-4 rounded-lg shadow-lg">
        {post.comments.map((comment, index) => (
          <div
            key={comment._id}
            className={`grid grid-cols-2 items-center  ${
              index < post.comments.length - 1 ? "border-b border-gray-600" : ""
            }`}
          >
            <div className="flex items-center space-x-4 mb-2 mt-2">
              <img
                src={comment.user.profile.avatar}
                alt="User avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-white text-base dark:text-zinc-400">
                  {comment.content}
                </p>
                <p className="text-gray-400 text-xs">
                  <span className="text-purple-200 text-sm">
                    {comment.user.username}
                  </span>
                  - {timeSince(new Date(comment.createdAt))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostComments;
