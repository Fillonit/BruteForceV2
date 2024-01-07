import express from "express";

import {
	getPosts,
	createPost,
	deletePost,
	updatePost,
	getPostById,
} from "../db/posts";
import { getUserBySessionToken } from "../db/users";

export const getAllPosts = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const posts = await getPosts();

		return res.status(200).json({ posts }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const createNewPost = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const sessionToken = req.cookies.sessionToken;

		if (!sessionToken) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const user = await getUserBySessionToken(sessionToken);

		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const { title, content, imageURL } = req.body;

		if (!title || !content) {
			return res
				.status(400)
				.json({ message: "Title and content are required" });
		}

		const post = await createPost({
			title,
			content,
			authorId: user._id,
			authorUsername: user.username,
			imageURL: imageURL ?? "",
		});

		return res
			.status(200)
			.json({ message: "Post created successfully", post: post })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deletePostById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const deletedPost = await deletePost(id);

		return res
			.status(200)
			.json({ message: "Post deleted successfully", post: deletedPost })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const updatePostById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const { title, content, imageURL } = req.body;
		// console.log(req.body);

		if (!title || !content) {
			return res
				.status(400)
				.json({ message: "Title and content are required" });
		}

		const post = await updatePost(id, {
			title,
			content,
			imageURL: imageURL ?? "",
			updatedAt: new Date(),
		});

		return res
			.status(200)
			.json({ message: "Post updated successfully", post: post })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getPost = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;

		const post = await getPostById(id);
		//increase views by 1
		post.views = post.views + 1;
		await post.save();

		return res.status(200).json({ post }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
