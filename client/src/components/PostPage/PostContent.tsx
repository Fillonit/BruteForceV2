import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
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

const PostContent = () => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `${API_BASE_URL}/posts/659c3f3ceb0af242dcbdc784`
      );
      const data = await response.json();
      setPost(data.post);
    };

    fetchPost();
  }, []);

  if (!post) {
    return null;
  }

  return (
    <div key={post._id} className="relative font-tektur">
      <p className="text-black text-base dark:text-white">{post.content}</p>
    </div>
  );
};

export default PostContent;
