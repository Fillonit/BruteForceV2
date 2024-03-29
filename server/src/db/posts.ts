// Remove the import statement for getPostsAuthorId
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
	title: { type: String, required: true },
	imageURL: { type: String, required: false, default: "" },
	content: { type: String, required: true },
	tags: { type: [String], required: true },
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
			required: false,
			default: [],
		},
	],
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	views: { type: Number, default: 0 },
	likes: { type: Number, default: 0 },
	likedBy: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
		default: [],
	},
});

export const PostModel = mongoose.model("Post", PostSchema);

PostSchema.index({ title: 1, author: 1 });

export const getPosts = () => PostModel.find().populate("author");

export const getPostById = (id: string) => {
	return PostModel.findById(id)
		.populate("author")
		.populate({
			path: "comments",
			populate: {
				path: "user",
				model: "User",
			},
		});
};

export const createPost = (values: Record<string, any>) =>
	new PostModel(values).save().then((post) => post.toObject());

export const updatePost = (id: string, values: Record<string, any>) =>
	PostModel.findByIdAndUpdate(id, values).then((post) => post.toObject());

export const deletePost = (id: string) => PostModel.findByIdAndDelete(id);

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

export const getPostsAuthorId = async (postId: string) => {
	const post = await PostModel.findById(postId);
	return post.author;
};

export const getPostsByAuthorId = (authorId: string) =>
	PostModel.find({ author: authorId }).populate("comments");

export const getMostPopularTags = (limit: number) =>
	PostModel.aggregate([
		{ $unwind: "$tags" },
		{ $group: { _id: "$tags", count: { $sum: 1 } } },
		{ $sort: { count: -1 } },
		{ $limit: limit },
	]);

export const searchTags = (search: string) => {
	if (typeof search !== "string") {
		throw new Error("Search parameter must be a string");
	}

	return PostModel.aggregate([
		{ $unwind: "$tags" },
		{ $match: { tags: { $regex: search, $options: "i" } } },
		{ $group: { _id: "$tags", count: { $sum: 1 } } },
		{ $sort: { count: -1 } },
	]);
};

export const searchPostsByTag = (tag: string) =>
	PostModel.find({ tags: tag }).populate("author comments");

export const getPostsByMonth = (month: number) =>
	PostModel.find({
		$expr: {
			$eq: [{ $month: "$createdAt" }, month],
		},
	});

export const getPostsByYear = (year: number) =>
	PostModel.find({
		$expr: {
			$eq: [{ $year: "$createdAt" }, year],
		},
	});

export const increaseLikes = (postId: string, userId: string) => {
	return PostModel.findById(postId).then((post) => {
		if (post.likedBy.includes(new mongoose.Types.ObjectId(userId))) {
			throw new Error("User has already liked this post");
		} else {
			post.likes += 1;
			post.likedBy.push(new mongoose.Types.ObjectId(userId));
			return post.save();
		}
	});
};
