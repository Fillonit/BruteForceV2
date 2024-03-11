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
