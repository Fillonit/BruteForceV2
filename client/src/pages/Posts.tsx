import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import PostsList from "../components/Posts/PostsList";

interface Post {
  _id: string;
  title: string;
  imageURL: string;
  content: string[];
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
}

const Posts: React.FC = () => {
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
      <PostsList postsList={posts.slice(0, 4)} />
    </div>
  );
};

export default Posts;
