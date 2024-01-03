import express from "express";

import {
	getGameById,
	getGames,
	createGame,
	updateGame,
	deleteGameById,
	searchGames,
} from "../db/games";

export const getAllGames = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const games = await getGames();

		return res.status(200).json({ games }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getGame = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;

		const game = await getGameById(id);

		if (!game || game === null || game === undefined) {
			return res.status(400).json({ message: "Game not found" });
		}

		return res.status(200).json({ game }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const addGame = async (req: express.Request, res: express.Response) => {
	try {
		const {
			name,
			genre,
			platform,
			developer,
			publisher,
			releaseDate,
			price,
			rating,
			image,
			description,
		} = req.body;

		const game = await createGame({
			name,
			genre,
			platform,
			developer,
			publisher,
			releaseDate,
			price,
			rating,
			image,
			description,
		});

		return res.status(200).json({ game }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const editGame = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;

		const {
			name,
			genre,
			platform,
			developer,
			publisher,
			releaseDate,
			price,
			rating,
		} = req.body;

		const game = await updateGame(id, {
			name,
			genre,
			platform,
			developer,
			publisher,
			releaseDate,
			price,
			rating,
		});

		return res.status(200).json({ game }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const removeGame = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		await deleteGameById(id);

		return res.status(200).json({ message: "Game deleted successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const searchAllGames = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { search } = req.params;

		const games = await searchGames(search);

		return res.status(200).json({ games }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const searchGamesByGenre = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { search } = req.params;

		const games = await searchGames(search);

		return res.status(200).json({ games }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
