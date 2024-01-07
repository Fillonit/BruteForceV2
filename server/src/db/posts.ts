import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
	title: { type: String, required: true },
	imageURL: { type: String, required: false, default: "" },
	content: { type: String, required: true },
	authorId: { type: String, required: true },
	authorUsername: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	views: { type: Number, default: 0 },
});

export const PostModel = mongoose.model("Post", PostSchema);

export const getPosts = () => PostModel.find();

export const getPostById = (id: string) => PostModel.findById(id);

export const createPost = (values: Record<string, any>) =>
	new PostModel(values).save().then((post) => post.toObject());

export const updatePost = (id: string, values: Record<string, any>) =>
	PostModel.findByIdAndUpdate(id, values).then((post) => post.toObject());

export const deletePost = (id: string) => PostModel.findByIdAndDelete(id);

export const getPostsByAuthorId = (authorId: string) =>
	PostModel.find({ authorId });

export const getPostsByAuthorUsername = (authorUsername: string) =>
	PostModel.find({ authorUsername });

export const getPostsByAuthorIdAndUsername = (
	authorId: string,
	authorUsername: string
) => PostModel.find({ authorId, authorUsername });

export const getPostsByAuthorIdOrUsername = (
	authorId: string,
	authorUsername: string
) => PostModel.find({ $or: [{ authorId }, { authorUsername }] });

export const getPostsByTitle = (title: string) => PostModel.find({ title });

export const getPostsByTitleRegex = (title: string) =>
	PostModel.find({ title: { $regex: title, $options: "i" } });

export const searchPosts = (search: string) =>
	PostModel.find({
		$or: [
			{ title: { $regex: search, $options: "i" } },
			{ content: { $regex: search, $options: "i" } },
		],
	});

export const getRecentPosts = (limit: number) =>
	PostModel.find().sort({ createdAt: -1 }).limit(limit);

export const getRecentPostsByAuthorId = (authorId: string, limit: number) =>
	PostModel.find({ authorId }).sort({ createdAt: -1 }).limit(limit);

export const getMostViewedPosts = (limit: number) =>
	PostModel.find().sort({ views: -1 }).limit(limit);

export const getMostViewedPostsByAuthorId = (authorId: string, limit: number) =>
	PostModel.find({ authorId }).sort({ views: -1 }).limit(limit);

export const getTrendingPosts = (limit: number) =>
	PostModel.find().sort({ views: -1, createdAt: -1 }).limit(limit);

export const getPostAuthorId = (id: string) =>
	PostModel.findById(id).select("authorId");
