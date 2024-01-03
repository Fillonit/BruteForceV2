import express from "express";

import router from "../router";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ alive: "True" });
});

app.use("/", router());

export default app;
