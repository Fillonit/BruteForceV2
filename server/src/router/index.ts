import express from "express";
import authentication from "./authentication";
import users from "./users";
import posts from "./posts";
import games from "./games";
import comments from "./comments";
import views from "./views";
import contacts from "./contacts";

const router = express.Router();

export default (): express.Router => {
	authentication(router);
	users(router);
	posts(router);
	games(router);
	comments(router);
	views(router);
	contacts(router);
	router.get("/test", (req, res) => {
		res.send("Hello World!");
	});

	return router;
};
