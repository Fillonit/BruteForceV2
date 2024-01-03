import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
	game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	content: String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const CommentModel = mongoose.model("Comment", CommentSchema);

export const getComments = () => CommentModel.find();

export const getCommentById = (id: string) => CommentModel.findById(id);

export const createComment = (values: Record<string, any>) =>
	new CommentModel(values).save().then((comment) => comment.toObject());

export const updateComment = (id: string, values: Record<string, any>) => {
	return CommentModel.findByIdAndUpdate(id, values).then((comment) =>
		comment.toObject()
	);
};

export const deleteCommentById = (id: string) =>
	CommentModel.findOneAndDelete({ _id: id });

export const getCommentsByGame = (game: string) => CommentModel.find({ game });

export const getCommentsByUser = (user: string) => CommentModel.find({ user });

export const getCommentsByGameAndUser = (game: string, user: string) =>
	CommentModel.find({ game, user });

export const getCommentsByGameOrUser = (game: string, user: string) => {
	return CommentModel.find({ $or: [{ game }, { user }] });
};

export const getCommentsByGameAndUserWithLimit = (
	game: string,
	user: string,
	limit: number
) => {
	return CommentModel.find({ $or: [{ game }, { user }] }).limit(limit);
};

export const getCommentsByGameAndUserWithLimitAndSort = (
	game: string,
	user: string,
	limit: number,
	sort: string
) => {
	return CommentModel.find({ $or: [{ game }, { user }] })
		.limit(limit)
		.sort(sort);
};
