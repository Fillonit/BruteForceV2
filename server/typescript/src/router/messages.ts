import express from "express";

import {
	getAllMessages,
	createNewMessage,
	deleteMessageById,
	getMessagesByUserId,
	getRecentMessages,
	getTotalMessageCount,
} from "../controllers/messages";
import { isAuthenticated, isOwner, isAdmin } from "../middlewares";

export default (router: express.Router) => {
	router.get("/messages", isAuthenticated, getAllMessages);
	router.get("/messages/recent", isAuthenticated, getRecentMessages);
	router.get("/messages/count", isAuthenticated, getTotalMessageCount);
	router.get("/messages/:id", isAuthenticated, getMessagesByUserId);
	router.post("/messages", createNewMessage);
	router.delete(
		"/messages/:id",
		isAuthenticated,
		isOwner || isAdmin,
		deleteMessageById
	);
};
