import express from "express";

import {
	deleteUser,
	getAllUsers,
	updateUser,
	getUser,
	addAdmin,
	removeAdmin,
	getUserByToken,
} from "../controllers/users";
import { isAuthenticated, isOwner, isAdmin } from "../middlewares";

export default (router: express.Router) => {
	router.get("/users", isAuthenticated, getAllUsers);
	router.post("/users/me", getUserByToken);
	router.get("/users/:id", getUser);
	router.delete("/users/:id/admin", isAuthenticated, isAdmin, removeAdmin);
	router.post("/users/:id/admin", isAuthenticated, isAdmin, addAdmin);
	router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
	router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};
