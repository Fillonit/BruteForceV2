import express from "express";

import { isAuthenticated, isAdmin, isOwner } from "../middlewares";

/* --- USERS --- */
import {
	getUsers,
	deleteUserById,
	getUserById,
	getUserBySessionToken,
} from "../db/users";

/* --- POSTS --- */
import {
	getAllPosts,
	createNewPost,
	updatePostById,
	deletePostById,
	getPost,
	getPostsByAuthor,
} from "../controllers/posts";

/* --- COMMENTS --- */
import {
	getAllComments,
	getComment,
	addComment,
	editComment,
	removeComment,
} from "../controllers/comments";

/* --- GAMES --- */
import {
	getGameById,
	getGames,
	createGame,
	updateGame,
	deleteGameById,
	searchGames,
} from "../db/games";

/* --- VISITS --- */
import {
	getVisits,
	getVisitsByPath,
	createVisits,
	updateVisits,
	deleteVisits,
	getVisitsByPathRegex,
	increaseVisits,
} from "../db/visits";

export const getAmountOfUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const users = await getUsers();

		return res.status(200).json({ users }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
