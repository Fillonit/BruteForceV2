import express from "express";

import {
	getComments,
	getCommentById,
	createComment,
	updateComment,
	deleteCommentById,
	getCommentsByGame,
	getCommentsByUser,
	getCommentsByGameAndUser,
	getCommentsByGameOrUser,
	getCommentsByGameAndUserWithLimit,
	getCommentsByGameAndUserWithLimitAndSort,
} from "../db/comments";

export const getAllComments = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const comments = await getComments();

		return res.status(200).json({ comments }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getComment = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const comment = await getCommentById(id);

		return res.status(200).json({ comment }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const addComment = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { game, user, content } = req.body;

		const comment = await createComment({ game, user, content });

		return res.status(200).json({ comment }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const editComment = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const { game, user, content } = req.body;

		const comment = await updateComment(id, { game, user, content });

		return res.status(200).json({ comment }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const removeComment = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const comment = await deleteCommentById(id);

		return res.status(200).json({ comment }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getCommentsByGameId = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const comments = await getCommentsByGame(id);

		return res.status(200).json({ comments }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getCommentsByUserId = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const comments = await getCommentsByUser(id);

		return res.status(200).json({ comments }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getCommentsByGameIdAndUserId = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { gameId, userId } = req.params;

		const comments = await getCommentsByGameAndUser(gameId, userId);

		return res.status(200).json({ comments }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getCommentsByGameAndUserLimit = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { gameId, userId, limit } = req.params;

		const comments = await getCommentsByGameAndUserWithLimit(
			gameId,
			userId,
			parseInt(limit)
		);

		return res.status(200).json({ comments }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getCommentsByGameAndUserLimitAndSort = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { gameId, userId, limit, sort } = req.params;

		const comments = await getCommentsByGameAndUserWithLimitAndSort(
			gameId,
			userId,
			parseInt(limit),
			sort
		);

		return res.status(200).json({ comments }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
