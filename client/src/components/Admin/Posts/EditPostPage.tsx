import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  FileInput,
  Label,
  Textarea,
  Avatar,
} from "flowbite-react";
import { API_BASE_URL } from "../../../config";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import notifyConfig from "../../notifyConfig";
import PostComments from "./PostComments";
import { useNavigate, useParams } from "react-router-dom";

const inputTheme = {
  field: {
    input: {
      colors: {
        purple:
          "border-purple-500 bg-purple-50 text-purple-900 placeholder-purple-700 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-400 dark:bg-purple-100 dark:focus:border-purple-500 dark:focus:ring-purple-500 ",
      },
    },
  },
};

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

const EditPost = () => {
  const navigate = useNavigate();
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

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "tags") {
      handleArrayChange(name, value);
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        [name]: value,
      }));
      console.log(post);
    }
  };

  const handleArrayChange = (fieldName: string, value: string) => {
    setPost((prevPost) => ({
      ...prevPost,
      [fieldName]: value.split(", ").map((item) => item.trim()),
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPost((prevPost) => ({
          ...prevPost,
          imageURL: e.target?.result as string,
        }));
      };

      reader.readAsDataURL(event.target.files[0]);
      console.log(post);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      post.title === "".trim() ||
      post.content === "".trim() ||
      post.tags.length === 0
    ) {
      toast.error("Please fill in all the required fields with valid values.", {
        ...notifyConfig,
      } as ToastOptions);
      return;
    }

    const UpdateToast = toast.loading("Updating Game...", {
      autoClose: 3000,
    });

    console.log(localStorage.getItem("token"));
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...post,
        }),
      });

      if (response.status === 200) {
        toast.dismiss(UpdateToast);
        toast.success("Game Updated Successfully!", {
          ...notifyConfig,
        } as ToastOptions);
        navigate("/dashboard/posts");
      } else {
        toast.dismiss(UpdateToast);
        toast.error("Game Update Failed!", {
          ...notifyConfig,
        } as ToastOptions);
      }
    } catch (error) {
      toast.error("Game Update Failed!", {
        ...notifyConfig,
      } as ToastOptions);
      console.error(error);
    }
  };

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
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-700 "
        >
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
              Title*
            </label>
            <TextInput
              name="title"
              placeholder="Title"
              type="text"
              value={post.title}
              onChange={handleChange}
              theme={inputTheme}
              color={"purple"}
              className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              htmlFor="content"
            >
              Content*
            </label>
            <Textarea
              name="content"
              placeholder="Content"
              value={post.content}
              onChange={(e) => handleChange(e)}
              rows={5}
              color={"purple"}
              className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              htmlFor="tags"
            >
              Tags*
            </label>
            <TextInput
              name="tags"
              placeholder="Tags"
              type="text"
              value={post.tags.join(", ")}
              onChange={handleChange}
              theme={inputTheme}
              color={"purple"}
              className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <div id="fileUpload" className="max-w-md">
              <div className="mb-2 block">
                <Label
                  htmlFor="file"
                  value="Profile Picture"
                  className="block text-gray-700 text-sm font-bold mb-4 dark:text-white"
                />
              </div>
              <FileInput
                id="file"
                theme={inputTheme}
                color={"purple"}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div>
            <PostComments post={post} />
          </div>
          <div className="flex items-center justify-between mt-5">
            <Button
              type="submit"
              color="purple"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  dark:text-white"
            >
              Save Changes
            </Button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditPost;
