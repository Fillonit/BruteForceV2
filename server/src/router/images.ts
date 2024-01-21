import express from "express";

import { uploadImage, deleteImage } from "../controllers/images";

export default (router: express.Router) => {
	router.post("/images", uploadImage);
	router.delete("/images/:id", deleteImage);
};
