import mongoose from "mongoose";
import request from "supertest";

import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URL } = process.env;

beforeEach(async () => {
	await mongoose.connect(MONGO_URL);
});

afterEach(async () => {
	mongoose.disconnect();
	await mongoose.connection.close();
});

describe("GET /", () => {
	it("should return alive: true", async () => {
		const res = await request(app).get("/");
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("alive");
		expect(res.body.alive).toBe("True");
	});
});

describe("GET /posts", () => {
	it("should return all products", async () => {
		const res = await request(app).get("/posts");
		let data = JSON.parse(res.text);
		expect(res.statusCode).toBe(200);
		expect(data.posts).not.toBeNull();
		expect(data.posts).not.toBeUndefined();
	});
});
