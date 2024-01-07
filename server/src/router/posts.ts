import express from "express";

import {
	getAllPosts,
	createNewPost,
	updatePostById,
	deletePostById,
	getPost,
} from "../controllers/posts";

import { isAuthenticated, isAdmin, isPostOwner } from "../middlewares";

export default (router: express.Router) => {
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
};
