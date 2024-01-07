import express from "express";

import {
	getAllGames,
	getGame,
	addGame,
	editGame,
	removeGame,
	searchAllGames,
	searchGamesByGenre,
} from "../controllers/games";

import { isAuthenticated, isOwner, isAdmin } from "../middlewares";

export default (router: express.Router) => {
	router.get("/games", getAllGames);
	router.get("/games/:id", getGame);
	router.post("/games", addGame);
	router.delete("/games/:id", isAuthenticated, isAdmin, removeGame);
	router.patch("/games/:id", isAuthenticated, isAdmin, editGame);
	router.get("/games/search/:search", searchAllGames);
	router.get("/games/genre/:search", searchGamesByGenre);
};
