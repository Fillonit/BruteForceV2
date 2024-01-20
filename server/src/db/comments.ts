import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
	// game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
	content: { type: String, required: true },
	likes: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const CommentModel = mongoose.model("Comment", CommentSchema);

export const getComments = () =>
	CommentModel.find().populate("user post comments.user");

export const getCommentById = (id: string) =>
	CommentModel.findById(id).populate("user post comments.user");

import { PostModel } from "./posts";

export const createComment = (values: Record<string, any>) =>
	new CommentModel(values).save().then((comment) => {
		return PostModel.findById(values.post)
			.then((post) => {
				post.populate("comments comments.user");
				CommentModel.findById(comment._id).populate("user post").exec();
				post.comments.push(comment._id);
				return post.save();
			})
			.then(() =>
				CommentModel.findById(comment._id).populate("user post").exec()
			);
	});

export const updateComment = (id: string, values: Record<string, any>) => {
	return CommentModel.findByIdAndUpdate(id, values, { new: true }).populate(
		"user post"
	);
};

export const deleteCommentById = (id: string) =>
	CommentModel.findOneAndDelete({ _id: id });

export const deleteCommentsByPostId = (postId: string) =>
	CommentModel.deleteMany({ post: postId });

export const deleteCommentsByUserId = (userId: string) =>
	CommentModel.deleteMany({ user: userId });

export const getCommentsByPostId = (postId: string) =>
	CommentModel.find({ post: postId }).populate("user");

export const getCommentsByUserId = (userId: string) =>
	CommentModel.find({ user: userId });

export const getCommentsByUserAndPostId = (userId: string, postId: string) =>
	CommentModel.find({ user: userId, post: postId });

export const getCommentsByUserOrPostId = (userId: string, postId: string) =>
	CommentModel.find({ $or: [{ user: userId }, { post: postId }] });

export const getCommentsByContent = (content: string) =>
	CommentModel.find({ content });

export const getCommentsByContentRegex = (content: string) =>
	CommentModel.find({ content: { $regex: content, $options: "i" } });
