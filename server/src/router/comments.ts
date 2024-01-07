import express from "express";

import {
	getAllComments,
	getComment,
	addComment,
	editComment,
	removeComment,
	getCommentsByGameId,
	getCommentsByUserId,
	getCommentsByGameIdAndUserId,
} from "../controllers/comments";

import { isAuthenticated, isOwner, isAdmin } from "../middlewares";

export default (router: express.Router) => {
	router.get("/comments", getAllComments);
	router.get("/comments/:id", getComment);
	router.post("/comments", isAuthenticated, addComment);
	router.delete("/comments/:id", isAuthenticated, isAdmin, removeComment);
	router.patch("/comments/:id", isAuthenticated, isOwner, editComment);
	router.get("/comments/game/:id", getCommentsByGameId);
	router.get("/comments/user/:id", getCommentsByUserId);
	router.get(
		"/comments/game/:gameId/user/:userId",
		getCommentsByGameIdAndUserId
	);
};
