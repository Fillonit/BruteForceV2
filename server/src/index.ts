import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

let pkg = require("../package.json");
import router from "./router";

dotenv.config();

const { PORT, MONGO_URL, NODE_ENV } = process.env;
import { notFound, errorHandler, logger } from "./middlewares";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(
	cors({
		credentials: true,
	})
);

const server = http.createServer(app);

server.listen(PORT || 8080, () => {
	console.log(`Server is running on http://localhost:${PORT}/`);
});

mongoose.Promise = global.Promise;

mongoose
	.connect(MONGO_URL)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

app.use(logger);
app.use("/", router());

app.get("/", (req: express.Request, res: express.Response) => {
	res.status(200).json({
		[pkg.name]: {
			_desc: pkg.description,
			_repo: pkg.repo,
			_author: pkg.author,
			_version: pkg.version,
			_license: pkg.license,
		},
	});
});

app.use(notFound);
app.use(errorHandler);
