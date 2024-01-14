import express from "express";

import {
	getAllPosts,
	createNewPost,
	updatePostById,
	deletePostById,
	getPost,
	getPostsByAuthor,
	getMostPopularTagsController,
	getRecentPosts,
	getTrendingPosts,
	searchTagsController,
} from "../controllers/posts";

import { isAuthenticated, isAdmin, isPostOwner } from "../middlewares";

export default (router: express.Router) => {
	router.get("/posts/tags/popular", getMostPopularTagsController);
	router.get("/posts/tags/:tag", searchTagsController);
	router.get("/posts/recent", getRecentPosts);
	router.get("/posts/trending", getTrendingPosts);
	router.get("/posts/:id", getPost);
	router.get("/posts", getAllPosts);
	router.post("/posts", isAuthenticated, createNewPost);
	router.delete(
		"/posts/:id",
		isAuthenticated,
		isPostOwner || isAdmin,
		deletePostById
	);
	router.patch(
		"/posts/:id",
		isAuthenticated,
		isPostOwner || isAdmin,
		updatePostById
	);
	router.get("/posts/author/:id", getPostsByAuthor);
};
