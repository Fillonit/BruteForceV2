import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import { FileInput, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

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

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          content,
          imageURL,
          tags: tags.split(","),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Post created successfully:", result.post);
        navigate("/posts");
      } else {
        const error = await response.json();
        console.error("Error creating post:", error.message);
      }
    } catch (error) {
      console.error("Internal server error:", error);
    }
  };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageURL(e.target?.result as string);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="flex h-screen bg-[url('https://i.pinimg.com/originals/d9/1a/d7/d91ad79a3f6b1075fc48d63fd5f71afb.gif')] bg-no-repeat bg-cover justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-1/2"
      >
        <h4 className="text-2xl dark:text-white text-purple-700 mb-6">
          CREATE A POST
        </h4>

        <div className="mb-4">
          <label
            className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <TextInput
            name="title"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            theme={inputTheme}
            color={"purple"}
          />
        </div>
        <div className="mb-4">
          <label
            className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-4 border rounded focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="file"
            value="Upload Image"
            className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
          />
          <FileInput
            id="file"
            theme={inputTheme}
            color={"purple"}
            accept="image/*"
            onChange={handleImageFileChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block dark:text-white text-gray-700 text-sm font-bold mb-2"
            htmlFor="tags"
          >
            Tags:
          </label>
          <TextInput
            name="tags"
            placeholder="Tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            theme={inputTheme}
            color={"purple"}
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
