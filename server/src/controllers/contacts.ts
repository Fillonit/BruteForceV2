import express from "express";

import {
	getContacts,
	getContactById,
	createContact,
	updateContact,
	deleteContactById,
	getRecentContacts,
} from "../db/contacts";

export const getAllContacts = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const contacts = await getContacts();

		return res.status(200).json({ contacts }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getRecent = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const contacts = await getRecentContacts();

		return res.status(200).json({ contacts }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getContact = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const contact = await getContactById(id);

		if (!contact || contact === null || contact === undefined) {
			return res.status(400).json({ message: "Contact not found" });
		}

		return res.status(200).json({ contact }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const addContact = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { name, email, message } = req.body;

		const contact = await createContact({ name, email, message });

		return res
			.status(200)
			.json({ message: "Contact added successfully", contact: contact })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteContact = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const contact = await deleteContactById(id);

		if (!contact || contact === null || contact === undefined) {
			return res.status(400).json({ message: "Contact not found" });
		}

		return res
			.status(200)
			.json({ message: "Contact deleted successfully" })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
