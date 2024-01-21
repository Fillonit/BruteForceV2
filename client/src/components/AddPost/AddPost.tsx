import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import { FileInput, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import useCloudinaryUpload from "../../utils/uploadImage";
import { toast, ToastOptions } from "react-toastify";
import notifyConfig from "../notifyConfig";

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
  const { imageUrl, uploadImage } = useCloudinaryUpload();

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = async () => {
          const base64Image = reader.result as string;

          const uploadedImageUrl = await uploadImage(base64Image);
          setImageURL(uploadedImageUrl);
          console.log(imageUrl);
        };
      }
    } catch (error) {
      console.warn(error);
      toast.error(
        (error as Error).message || "Profile Picture Upload Failed!",
        {
          ...notifyConfig,
        } as ToastOptions
      );
    }
  };

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

  return (
    <div className="flex h-screen bg-[url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3cf06a29-04a0-4466-9f83-ab6b9658149f/dgf1nfg-95de740f-6ce8-46d7-9e97-bee39a9bfb24.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNjZjA2YTI5LTA0YTAtNDQ2Ni05ZjgzLWFiNmI5NjU4MTQ5ZlwvZGdmMW5mZy05NWRlNzQwZi02Y2U4LTQ2ZDctOWU5Ny1iZWUzOWE5YmZiMjQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7PmwbFeu9TswCWjhaJEcqjk5t-cXqBRohNIXocAG7Cw')] bg-no-repeat bg-cover justify-center items-center">
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
            ref={fileInputRef}
            onChange={handleFileChange}
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
