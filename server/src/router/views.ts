import express from "express";

import {
	getAllVisits,
	getVisitsByPathHandler,
	increaseVisitsHandler,
	deleteVisitsHandler,
} from "../controllers/visits";

export default (router: express.Router) => {
	router.get("/visits", getAllVisits);
	router.get("/visits/:path", getVisitsByPathHandler);
	router.post("/visits", increaseVisitsHandler);
	router.delete("/visits", deleteVisitsHandler);
};
