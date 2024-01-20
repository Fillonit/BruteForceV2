import React, { useState } from "react";
import { API_BASE_URL } from "../../config";

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
  content: string[];
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
  const [comment, setComment] = useState("");
  const storedUserString = localStorage.getItem("user");
  const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
  const userIdFromLocalStorage =
    storedUser && storedUser._id ? storedUser._id : null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          post: post?._id,
          user: userIdFromLocalStorage,
          content: comment,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Comment created successfully:", result.comment);
        setComment("");
      } else {
        const error = await response.json();
        console.error("Error creating comment:", error.message);
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div key={post._id} className="relative font-tektur">
      <h4 className="text-white dark:text-white mb-4 text-lg">Comments:</h4>

      <form onSubmit={handleFormSubmit} className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment..."
          className="p-2 border border-gray-400 rounded-lg"
        />
        <button
          type="submit"
          className="bg-white mt-2 p-2 rounded-lg dark:bg-gray-900 dark:text-white text-black text-md"
        >
          Add Comment
        </button>
      </form>
      <div className="grid gap-3 grid-cols-2 mt-2">
        <button className="bg-white p-2 rounded-lg dark:bg-gray-900 dark:text-white text-black text-md">
          Like
        </button>
      </div>
      <div className="border border-gray-400 bg-gray-900 p-4 rounded-lg shadow-lg">
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p className="text-white text-base dark:text-zinc-400">
              {comment.content}
            </p>
            <p className="text-gray-500 text-xs">
              {comment.user.username} -{" "}
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostComments;
