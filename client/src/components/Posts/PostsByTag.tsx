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
  content: string[];
  tags: string[];
  author: Author;
  createdAt: Date;
  updatedAt: string;
  likes: number;
  views: number;
}

const PostByTag: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [postsList, setPostsList] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/posts/byTag/${selectedOption}`
        );
        const data = await response.json();
        setPostsList(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (selectedOption) {
      fetchPosts();
    } else {
      // Handle the case when no option is selected, e.g., show all posts
      // You might want to implement a different behavior based on your requirements
    }
  }, [selectedOption]);

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
          <option value="Character">Character</option>
          <option value="Game Review">Game Review</option>
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
