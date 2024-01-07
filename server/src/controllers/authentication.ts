import express from "express";

import { getUsersByEmail, createUser, getUserById } from "../db/users";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "Missing fields" });
		}

		const user = await getUsersByEmail(email).select(
			"+authentication.salt +authentication.password"
		);

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const expectedHash = authentication(user.authentication.salt, password);

		if (expectedHash !== user.authentication.password) {
			return res.status(403).json({ message: "Invalid credentials" });
		}

		const salt = random();
		user.authentication.sessionToken = authentication(
			salt,
			user._id.toString()
		);

		await user.save();

		res.cookie("sessionToken", user.authentication.sessionToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			domain: "localhost",
			path: "/",
		});

		return res.status(200).json({ user }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, username } = req.body;

		if (!email || !password || !username) {
			return res.status(400).json({ message: "Missing fields" });
		}

		const existingUser = await getUsersByEmail(email);

		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const salt = random();
		const user = await createUser({
			email,
			username,
			authentication: {
				salt,
				password: authentication(salt, password),
			},
		});

		return res.status(201).json({ user }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const logout = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;

		const user = await getUserById(id);

		user.authentication.sessionToken = "";

		await user.save();

		res.clearCookie("sessionToken");

		return res.status(200).json({ message: "User logged out" }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
