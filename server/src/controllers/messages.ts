import express from "express";
import {
	getMessages,
	sendMessage,
	deleteMessage,
	getMessagesByAuthorId,
	getMostRecentMessages,
	getTotalMessages,
} from "../db/messages";
import { getUserBySessionToken } from "../db/users";

export const getAllMessages = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const messages = await getMessages();

		return res.status(200).json({ messages }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const createNewMessage = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { sessionToken } = req.body;

		if (!sessionToken) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const user = await getUserBySessionToken(sessionToken);

		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const { content } = req.body;

		if (!content) {
			return res.status(400).json({ message: "Content is required" });
		}

		const message = await sendMessage({
			content,
			authorId: user._id,
			authorUsername: user.username,
		});

		return res.status(200).json({ message }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteMessageById = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const deletedMessage = await deleteMessage(id);

		return res
			.status(200)
			.json({
				message: "Message deleted successfully",
				deletedMessage: deletedMessage,
			})
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getMessagesByUserId = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const messages = await getMessagesByAuthorId(id);

		return res.status(200).json({ messages }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getRecentMessages = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { limit } = req.params;

		const messages = await getMostRecentMessages(parseInt(limit));

		return res.status(200).json({ messages }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getTotalMessageCount = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const count = await getTotalMessages();

		return res.status(200).json({ count }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
