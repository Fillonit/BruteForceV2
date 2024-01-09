import React from "react";
import PostPage from "../components/PostPage/PostPage";

// interface Post {
//   _id: string;
//   title: string;
//   imageURL: string;
//   content: string[];
//   tags: string[];
//   author: string;
//   createdAt: string;
//   updatedAt: string;
//   likes: number;
//   views: number;
// }

const Post: React.FC = () => {
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const response = await fetch(
  //       `${API_BASE_URL}/posts/659c3f3ceb0af242dcbdc784`
  //     );
  //     const data = await response.json();
  //     setPost(data.post);
  //   };

  //   fetchPost();
  // }, []);

  return (
    <div>
      <PostPage />
    </div>
  );
};

export default Post;
