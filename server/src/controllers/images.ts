import express from "express";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
	api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { image } = req.body;

		if (!image) {
			return res.status(400).json({ message: "No image provided" });
		}

		const imageUpload = await cloudinary.uploader.upload(image, {
			upload_preset: "sv07m3dd",
		});

		return res
			.status(200)
			.json({
				message: "Image uploaded successfully",
				image: imageUpload,
			})
			.end();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteImage = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		await cloudinary.uploader.destroy(id);

		return res
			.status(200)
			.json({ message: "Image deleted successfully" })
			.end();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
