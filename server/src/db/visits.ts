import mongoose from "mongoose";

const VisitsSchema = new mongoose.Schema({
	path: { type: String, required: true },
	visits: { type: Number, required: true },
	updatedAt: { type: Date, default: Date.now },
});

export const VisitsModel = mongoose.model("Visits", VisitsSchema);

export const getVisits = async () => {
	return await VisitsModel.find();
};

export const getVisitsByPath = async (path: string) => {
	return await VisitsModel.findOne({ path });
};

export const getVisitsByPathRegex = async (path: string) => {
	return await VisitsModel.findOne({ path: { $regex: path } });
};

export const createVisits = async (path: string) => {
	return await VisitsModel.create({ path, visits: 1 });
};

export const updateVisits = async (path: string, visits: number) => {
	return await VisitsModel.updateOne(
		{ path },
		{ visits, updatedAt: Date.now() }
	);
};

export const deleteVisits = async (path: string) => {
	return await VisitsModel.deleteOne({ path });
};

export const increaseVisits = async (path: string) => {
	const visits = await getVisitsByPath(path);

	if (!visits) {
		await createVisits(path);
	} else {
		await updateVisits(path, visits.visits + 1);
	}
};
