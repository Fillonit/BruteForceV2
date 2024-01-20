import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import { FileInput, Label, TextInput } from "flowbite-react";

const inputTheme = {
	field: {
		input: {
			colors: {
				purple: "border-purple-500 bg-purple-50 text-purple-900 placeholder-purple-700 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-400 dark:bg-purple-100 dark:focus:border-purple-500 dark:focus:ring-purple-500 ",
			},
		},
	},
};

const AddPost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [tags, setTags] = useState("");

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
		<div className="flex h-screen bg-gray-100 bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 py-10 ">
			<form onSubmit={handleFormSubmit}>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
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
						className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
						htmlFor="content"
					>
						Content:
					</label>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<div id="fileUpload" className="max-w-md">
						<div className="mb-2 block">
							<Label
								htmlFor="file"
								value="Profile Picture"
								className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
							/>
						</div>
						<FileInput
							id="file"
							theme={inputTheme}
							color={"purple"}
							accept="image/*"
							onChange={handleImageFileChange}
							// helperText="A profile picture is useful to confirm your are logged into your account"
						/>
					</div>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
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
					className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:text-white"
				>
					Create Post
				</button>
			</form>
		</div>
	);
};

export default AddPost;
