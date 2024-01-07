import express from "express";

import {
	getComments,
	getCommentById,
	createComment,
	updateComment,
	deleteCommentById,
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
