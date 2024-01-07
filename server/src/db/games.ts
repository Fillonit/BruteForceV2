import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, index: true },
	description: { type: String, required: true },
	genre: { type: String, required: true },
	platform: { type: String, required: true },
	developer: { type: String, required: true },
	publisher: { type: String, required: true },
	releaseDate: { type: Date, required: true },
	price: { type: Number, required: true },
	rating: { type: Number, required: true },
	image: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const GameModel = mongoose.model("Game", GameSchema);

export const getGames = () => GameModel.find();

export const getGameByName = (name: string) => GameModel.findOne({ name });

export const getGameById = (id: string) => GameModel.findById(id);

export const createGame = (values: Record<string, any>) =>
	new GameModel(values).save().then((game) => game.toObject());

export const updateGame = (id: string, values: Record<string, any>) => {
	return GameModel.findByIdAndUpdate(id, values).then((game) =>
		game.toObject()
	);
};

export const deleteGameById = (id: string) =>
	GameModel.findOneAndDelete({ _id: id });

export const getGameGenre = (id: string) =>
	GameModel.findById(id).select("genre");

export const getGamePlatform = (id: string) =>
	GameModel.findById(id).select("platform");

export const getGameDeveloper = (id: string) =>
	GameModel.findById(id).select("developer");

export const searchGames = (search: string) =>
	GameModel.find({ name: { $regex: search, $options: "i" } });

export const searchGamesByGenre = (search: string) =>
	GameModel.find({ genre: { $regex: search, $options: "i" } });

export const searchGamesByPlatform = (search: string) =>
	GameModel.find({ platform: { $regex: search, $options: "i" } });

export const searchGamesByDeveloper = (search: string) =>
	GameModel.find({ developer: { $regex: search, $options: "i" } });

export const searchGamesByPublisher = (search: string) =>
	GameModel.find({ publisher: { $regex: search, $options: "i" } });

export const searchGamesByReleaseDate = (search: string) =>
	GameModel.find({ releaseDate: { $regex: search, $options: "i" } });

export const searchGamesByPrice = (search: string) =>
	GameModel.find({ price: { $regex: search, $options: "i" } });

export const searchGamesByRating = (search: string) =>
	GameModel.find({ rating: { $regex: search, $options: "i" } });

export const searchGamesByPriceRange = (search: string) =>
	GameModel.find({ price: { $regex: search, $options: "i" } });
