import { useState } from "react";
import { API_BASE_URL } from "../config";

const useCloudinaryUpload = () => {
	const [imageUrl, setImageUrl] = useState("");

	const uploadImage = async (base64Image: string): Promise<string> => {
		try {
			const response = await fetch(`${API_BASE_URL}/images`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ image: base64Image }),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			setImageUrl(data.image.url);
			console.log(data.image.url);

			return data.image.url; // Return the URL of the uploaded image
		} catch (error) {
			console.error("Error:", error);
			return ""; // Return an empty string if there is an error
		}
	};

	return { imageUrl, uploadImage };
};

export default useCloudinaryUpload;
