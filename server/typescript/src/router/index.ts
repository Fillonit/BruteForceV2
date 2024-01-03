import express from "express";
import authentication from "./authentication";
import users from "./users";
import posts from "./posts";
import games from "./games";
import comments from "./comments";

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	users(router);
	posts(router);
	games(router);
	comments(router);
	router.get("/test", (req, res) => {
		res.send("Hello World!");
	});

	return router;
};
