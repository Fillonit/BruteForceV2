import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	authentication: {
		password: { type: String, required: true, selected: false },
		salt: { type: String, selected: false },
		sessionToken: { type: String, selected: false },
	},
	role: { type: String, default: "user" },
	profile: {
		firstName: { type: String, required: true, default: "John" },
		lastName: { type: String, required: true, default: "Doe" },
		avatar: { type: String, default: "https://i.imgur.com/6VBx3io.png" },
		bio: { type: String, default: "Hello, World!" },
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUsersByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) =>
	UserModel.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>
	new UserModel(values).save().then((user) => user.toObject());

export const updateUser = (id: string, values: Record<string, any>) =>
	UserModel.findByIdAndUpdate(id, values).then((user) => user.toObject());

export const deleteUserById = (id: string) =>
	UserModel.findOneAndDelete({ _id: id });

export const getUserRole = (id: string) =>
	UserModel.findById(id).select("role");

export const makeAdmin = (id: string) =>
	UserModel.findByIdAndUpdate(id, { role: "admin" }).then((user) =>
		user.toObject()
	);
