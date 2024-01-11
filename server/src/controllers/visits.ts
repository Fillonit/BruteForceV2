import express from "express";

import {
	getVisits,
	getVisitsByPath,
	createVisits,
	updateVisits,
	deleteVisits,
	getVisitsByPathRegex,
	increaseVisits,
} from "../db/visits";

export const getAllVisits = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const visits = await getVisits();

		return res.status(200).send(visits);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

export const getVisitsByPathHandler = async (path: string) => {
	try {
		const visits = await getVisitsByPath(path);

		return visits;
	} catch (error) {
		console.log(error);
		return { error: error.message };
	}
};

export const getVisitsByPathRegexHandler = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { path } = req.params;
		const visits = await getVisitsByPathRegex(path);

		return res.status(200).send(visits);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

export const createVisitsHandler = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { path } = req.body;
		const visits = await createVisits(path);

		return res.status(200).send(visits);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

export const updateVisitsHandler = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { path, visits } = req.body;
		const updatedVisits = await updateVisits(path, visits);

		return res.status(200).send(updatedVisits);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

export const deleteVisitsHandler = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { path } = req.body;
		const deletedVisits = await deleteVisits(path);

		return res.status(200).send(deletedVisits);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};

export const increaseVisitsHandler = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { path } = req.body;
		await increaseVisits(path);

		return res.status(200).send({ message: "Visits increased" });
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: error.message });
	}
};
