import express from "express";

import {
	getPosts,
	createPost,
	deletePost,
	updatePost,
	getPostById,
	getPostsByAuthorId,
	getMostPopularTags,
	searchTags,
	searchPostsByTag,
	getPostsByMonth,
	getPostsByYear,
	increaseLikes,
} from "../db/posts";
import { getUserBySessionToken } from "../db/users";
import { get, merge } from "lodash";

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
		const sessionToken = req.headers.authorization as string;

		if (!sessionToken) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const user = await getUserBySessionToken(sessionToken);

		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const { title, content, imageURL, tags } = req.body;

		if (!title || !content) {
			return res
				.status(400)
				.json({ message: "Title and content are required" });
		}

		const post = await createPost({
			title,
			content,
			author: user._id,
			imageURL: imageURL ?? "",
			tags,
		}).catch((error) => {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Internal server error", error });
		});

		return res
			.status(200)
			.json({ message: "Post created successfully", post: post })
			.end();
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal server error", error });
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
		const { title, content, imageURL, tags } = req.body;
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
			tags,
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

export const getPostsByAuthor = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const posts = await getPostsByAuthorId(id);

		return res.status(200).json({ posts }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getTrendingPosts = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const posts = await getPosts();

		const trendingPosts = posts
			.sort((a, b) => {
				return b.views - a.views;
			})
			.slice(0, 5);

		return res.status(200).json({ posts: trendingPosts }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getRecentPosts = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const posts = await getPosts();

		const recentPosts = posts
			.sort((a, b) => {
				return b.createdAt.getTime() - a.createdAt.getTime();
			})
			.slice(0, 5);

		return res.status(200).json({ posts: recentPosts }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getMostPopularTagsController = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const tags = await getMostPopularTags(20);

		return res.status(200).json({ tags }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const searchTagsController = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { tag } = req.params;

		const tags = await searchTags(tag as string);

		return res.status(200).json({ tags }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const searchPostsByTagController = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { tag } = req.params;

		const posts = await searchPostsByTag(tag as string);

		return res.status(200).json({ posts }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getAllPostsByMonth = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const month = Number(req.params.month);

		if (isNaN(month)) {
			return res.status(400).json({ message: "Month must be a number" });
		}

		const posts = await getPostsByMonth(month);

		return res.status(200).json({ posts }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getAllPostsByYear = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const year = Number(req.params.year);

		if (isNaN(year)) {
			return res.status(400).json({ message: "Year must be a number" });
		}

		const posts = await getPostsByYear(year);

		return res.status(200).json({ posts }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const increaseLikesController = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { postId, userId } = req.params;

		const post = await increaseLikes(postId, userId);

		return res.status(200).json({ post }).end();
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal server error", error });
	}
};
