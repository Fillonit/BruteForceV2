import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import ViewAllPosts from "../components/Posts/ViewAllPosts";

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

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch(`${API_BASE_URL}/posts`);
      const data = await response.json();
      setPosts(data.posts);
    };

    fetchGames();
  }, []);

  return (
    <div>
      <ViewAllPosts postsList={posts} />
    </div>
  );
};

export default AllPosts;
