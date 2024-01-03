import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const { SECRET } = process.env;

export const random = () => crypto.randomBytes(8).toString("base64");
export const authentication = (password: string, salt: string) => {
	return crypto
		.createHmac("sha256", [salt, password].join("/"))
		.update(SECRET)
		.digest("hex");
};
