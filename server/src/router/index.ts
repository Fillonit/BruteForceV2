import express from "express";
import authentication from "./authentication";
import users from "./users";
import posts from "./posts";
import games from "./games";
import comments from "./comments";
import views from "./views";

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	users(router);
	posts(router);
	games(router);
	comments(router);
	views(router);
	router.get("/test", (req, res) => {
		res.send("Hello World!");
	});

	return router;
};
