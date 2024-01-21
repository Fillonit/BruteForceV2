import { useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import { API_BASE_URL } from "../../../config";
import PostComments from "./ViewPostComments";
import { useParams } from "react-router-dom";
import { FaEye, FaThumbsUp } from "react-icons/fa";

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

interface PostData {
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

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostData>({
    author: {
      _id: "",
      username: "",
      email: "",
      profile: {
        firstName: "",
        lastName: "",
        bio: "",
        avatar: "",
      },
    },
    _id: "",
    comments: [],
    content: "",
    createdAt: new Date(),
    imageURL: "",
    likes: 0,
    tags: [],
    title: "",
    updatedAt: "",
    views: 0,
  });

  useEffect(() => {
    const fetchPostData = async () => {
      const user = localStorage.getItem("user");
      const sessionToken = user
        ? JSON.parse(user).authentication.sessionToken
        : null;

      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${sessionToken}`,
          },
        });

        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostData();
  }, []);
  return (
    <div className="flex justify-center bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 py-24">
      <div className="w-full max-w-4xl ">
        <div className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-700">
          <div className="flex items-center mb-4">
            <div className="mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
                  htmlFor="author"
                >
                  Post picutre
                </label>
                <div className="flex items-center">
                  <Avatar alt="User settings" img={post.imageURL} size="3xl" />
                </div>
              </div>
              <label
                className="block text-gray-700 text-lg font-bold mb-2 dark:text-white"
                htmlFor="author"
              >
                Author
              </label>
              <div className="flex items-center">
                <Avatar
                  alt="User settings"
                  img={post.author.profile.avatar}
                  rounded
                  size="lg"
                />
                <span className="ml-2 text-gray-700 dark:text-white">
                  {post.author.username}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              htmlFor="title"
            >
              Title
            </label>
            <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
              {post.title}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              htmlFor="content"
            >
              Content
            </label>
            <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
              {post.content}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              htmlFor="tags"
            >
              Tags
            </label>
            <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
              {post.tags.join(", ")}
            </div>
          </div>
          <div className="mb-4 flex justify-between">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white justify-between"
                htmlFor="tags"
              >
                Views
              </label>
              <div
                className={`bg-gray-200 w-14 rounded-full px-2 py-1 text-sm font-semibold text-white flex items-center text-md bg-gradient-to-r from-purple-500 to-purple-800`}
              >
                {post.views}
                <FaEye className="ml-1" />
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                htmlFor="tags"
              >
                Likes
              </label>
              <div
                className={`bg-gray-200 w-14 rounded-full px-2 py-1 text-sm font-semibold text-white flex items-center text-md bg-gradient-to-r from-purple-500 to-purple-800`}
              >
                {post.likes}
                <FaThumbsUp className="ml-1" />
              </div>
            </div>
          </div>
        </div>
        <div>
          {post.comments.length !== 0 ? <PostComments post={post} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
