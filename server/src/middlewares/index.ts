import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

import { getPostsAuthorId } from "../db/posts";

export const isAuthenticated = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const sessionToken = req.headers.authorization as string;
		console.log(sessionToken);
		if (!sessionToken) {
			return res
				.status(401)
				.json({ message: "Unauthorized, Session Token Not Provided!" });
		}

		const user = await getUserBySessionToken(sessionToken);

		if (!user) {
			return res
				.status(401)
				.json({ message: "Unauthorized, Session Token Invalid!" });
		}

		merge(req, { identity: user });

		return next();
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

export const isOwner = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const { id } = req.params;
		const user = await getUserBySessionToken(
			req.headers.authorization as string
		);

		if (!user) {
			return res
				.status(401)
				.json({ message: "Unauthorized, Not Authenticated!" });
		}

		if (user._id.toString() !== id) {
			return res
				.status(401)
				.json({ message: "Unauthorized, Not Authorized!" });
		}

		return next();
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

export const isPostOwner = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const identity = get(req, "identity._id") as string;
		const { id } = req.params;

		if (!identity) {
			return res
				.status(401)
				.json({ message: "Unauthorized, Not Authenticated!" });
		}

		const author = await getPostsAuthorId(id);

		if (identity.toString() !== author._id.toString()) {
			return res
				.status(401)
				.json({ message: "Unauthorized, Not Post Author!" });
		}

		return next();
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

export const isAdmin = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const identity = get(req, "identity") as any;
		const user = await getUserBySessionToken(
			req.headers.authorization as string
		);

		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		if (user.role !== "admin") {
			return res.status(401).json({ message: "Unauthorized" });
		}

		return next();
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

export const isAppOwner = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const identity = get(req, "identity._id") as string;

		if (!identity) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		if (identity.toString() !== process.env.APP_OWNER_ID) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		return next();
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

export const isOwnerOrAdmin = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const user = await getUserBySessionToken(
			req.headers.authorization as string
		);

		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		if (user._id.toString() === req.params.id) {
			return next();
		}

		if (user.role === "admin") {
			return next();
		} else {
			return res.status(401).json({ message: "Unauthorized" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

// Error handling
export const notFound = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const error = new Error(`Not found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

export const errorHandler = (
	error: any,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const statusCode =
		res.statusCode === 200 || res.statusCode === 201 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
	});
};

import chalk from "chalk";

export const logger = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	let methodColor: chalk.Chalk | ((arg0: string) => any);
	const start = Date.now();

	switch (req.method) {
		case "GET":
			methodColor = chalk.bgGreen.black.bold;
			break;
		case "POST":
			methodColor = chalk.bgYellow.black.bold;
			break;
		case "PUT":
			methodColor = chalk.bgBlue.black.bold;
			break;
		case "DELETE":
			methodColor = chalk.bgRed.black.bold;
			break;
		default:
			methodColor = chalk.white.bold;
	}

	res.on("finish", () => {
		const duration = Date.now() - start;

		const logMessage = `${chalk.bold.blueBright(
			"HTTP Request:"
		)} ${methodColor(` ${req.method} `)} ${chalk.cyan.bold(
			"Path:"
		)} ${chalk.bgMagenta.bold(` ${req.path} `)} ${chalk.cyan.bold(
			"Response Time:"
		)} ${chalk.bgCyan.black.bold(
			` ${duration} ms `
		)} ${chalk.bgBlack.cyan.bold("Time:")} ${chalk.white.bold(
			`${new Date().getHours()}:${String(
				new Date().getMinutes()
			).padStart(2, "0")}:${String(new Date().getSeconds()).padStart(
				2,
				"0"
			)} `
		)}`;

		console.log(logMessage);
	});

	next();
};

import { increaseVisits } from "../db/visits";
import { getVisitsByPathHandler } from "./../controllers/visits";
export const addVisit = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	await increaseVisits(req.path);
	const visits = await getVisitsByPathHandler(req.path);
	// if ("visits" in visits) {
	// 	console.log(
	// 		`Added a visit to ${req.path}. Now at ${visits.visits} visits.`
	// 	);
	// }
	next();
};
