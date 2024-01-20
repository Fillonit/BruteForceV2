import express from "express";

import {
	getAllContacts,
	getContact,
	addContact,
	deleteContact,
} from "../controllers/contacts";

// import { isAuthenticated, isOwner, isAdmin } from "../middlewares";

export default (router: express.Router) => {
	router.get("/contacts", getAllContacts);
	router.get("/contacts/:id", getContact);
	router.post("/contacts", addContact);
	router.delete("/contacts/:id", deleteContact);
};
