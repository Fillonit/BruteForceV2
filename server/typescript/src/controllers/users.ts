import express from "express";

import {
	getUsers,
	deleteUserById,
	getUserById,
	getUserBySessionToken,
} from "../db/users";

export const getAllUsers = async (
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

export const deleteUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const deletedUser = await deleteUserById(id);

		return res
			.status(200)
			.json({ message: "User deleted successfully", user: deletedUser })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const updateUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const { username, email, password } = req.body;

		if (!username) {
			return res.status(400).json({ message: "Username is required" });
		}

		const user = await getUserById(id);

		user.username = username;

		await user.save();

		return res
			.status(200)
			.json({ message: "User updated successfully", user: user })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getUser = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;

		const user = await getUserById(id);

		return res.status(200).json({ user }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const addAdmin = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;

		const user = await getUserById(id);

		if (!user || user === null || user === undefined) {
			return res.status(400).json({ message: "User not found" });
		}

		if (user.role === "admin") {
			return res
				.status(400)
				.json({ message: "User is already an admin" });
		}

		user.role = "admin";

		await user.save();

		return res
			.status(200)
			.json({ message: "User updated successfully", user: user })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const removeAdmin = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const user = await getUserById(id);

		if (!user || user === null || user === undefined) {
			return res.status(400).json({ message: "User not found" });
		}

		if (user.role === "user") {
			return res.status(400).json({ message: "User is already a user" });
		}

		user.role = "user";

		await user.save();

		return res
			.status(200)
			.json({ message: "User updated successfully", user: user })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getUserByToken = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { sessionToken } = req.body;

		const user = await getUserBySessionToken(sessionToken);

		return res.status(200).json({ user }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
