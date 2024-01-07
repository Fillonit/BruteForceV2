import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
	content: { type: String, required: true },
	authorId: { type: String, required: true },
	authorUsername: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export const MessageModel = mongoose.model("Message", MessageSchema);

export const getMessages = () => MessageModel.find();

export const sendMessage = (values: Record<string, any>) =>
	new MessageModel(values).save().then((message) => message.toObject());

export const deleteMessage = (id: string) => MessageModel.findByIdAndDelete(id);

export const getMessagesByAuthorId = (authorId: string) =>
	MessageModel.find({ authorId });

export const getMostRecentMessages = (limit: number) =>
	MessageModel.find().sort({ createdAt: -1 }).limit(limit);

export const getTotalMessages = () => MessageModel.countDocuments();
