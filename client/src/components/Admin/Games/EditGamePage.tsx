import React, { useEffect, useState } from "react";
import { Button, TextInput, FileInput, Label } from "flowbite-react";
import { API_BASE_URL } from "../../../config";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import notifyConfig from "../../notifyConfig";
import { useNavigate, useParams } from "react-router-dom";

const inputTheme = {
	field: {
		input: {
			colors: {
				purple: "border-purple-500 bg-purple-50 text-purple-900 placeholder-purple-700 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-400 dark:bg-purple-100 dark:focus:border-purple-500 dark:focus:ring-purple-500 ",
			},
		},
	},
};

interface Game {
	description: string;
	developer: string;
	genre: string[];
	image: string;
	name: string;
	platform: string[];
	price: number;
	publisher: string;
	rating: number;
	releaseDate: string;
	tags: string[];
}

const EditGame = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [game, setGame] = useState<Game>({
		description: "",
		developer: "",
		genre: [],
		image: "",
		name: "",
		platform: [],
		price: 0,
		publisher: "",
		rating: 0,
		releaseDate: "",
		tags: [],
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		if (name === "genre" || name === "platform" || name === "tags") {
			handleArrayChange(name, value);
		} else {
			setGame((prevGame) => ({
				...prevGame,
				[name]: value,
			}));
		}
	};

	const handleArrayChange = (fieldName: string, value: string) => {
		setGame((prevGame) => ({
			...prevGame,
			[fieldName]: value.split(", ").map((item) => item.trim()),
		}));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setGame((prevGame) => ({
					...prevGame,
					image: e.target?.result as string,
				}));
			};

			reader.readAsDataURL(event.target.files[0]);
			console.log(game);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		// Validation checks
		if (
			game.name.trim() === "" ||
			game.developer.trim() === "" ||
			game.publisher.trim() === "" ||
			game.genre.length === 0 ||
			game.platform.length === 0 ||
			game.rating < 1 ||
			game.rating > 5 ||
			game.price < 0 ||
			game.releaseDate.trim() === "" ||
			game.tags.length === 0
		) {
			toast.error(
				"Please fill in all the required fields with valid values.",
				{
					...notifyConfig,
				} as ToastOptions
			);
			return;
		}

		const UpdateToast = toast.loading("Updating Game...", {
			autoClose: 3000,
		});

		try {
			const response = await fetch(`${API_BASE_URL}/games/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					...game,
				}),
			});

			if (response.status === 200) {
				toast.dismiss(UpdateToast);
				toast.success("Game Updated Successfully!", {
					...notifyConfig,
				} as ToastOptions);
				navigate("/dashboard/games");
			} else {
				toast.dismiss(UpdateToast);
				toast.error("Game Update Failed!", {
					...notifyConfig,
				} as ToastOptions);
			}
		} catch (error) {
			toast.error("Game Update Failed!", {
				...notifyConfig,
			} as ToastOptions);
			console.error(error);
		}
	};

	useEffect(() => {
		const fetchGameData = async () => {
			const user = localStorage.getItem("user");
			const sessionToken = user
				? JSON.parse(user).authentication.sessionToken
				: null;

			try {
				const response = await fetch(`${API_BASE_URL}/games/${id}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `${sessionToken}`,
					},
				});

				const data = await response.json();
				setGame(data.game);
				console.log(game);
			} catch (error) {
				console.error(error);
			}
		};

		fetchGameData();
	}, []);
	return (
		<div className="flex justify-center bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 py-24">
			<div className="w-full max-w-4xl ">
				<form
					onSubmit={handleSubmit}
					className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-700 flex flex-wrap"
				>
					<div className="w-full md:w-1/2 pr-4">
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
								htmlFor="name"
							>
								Name*
							</label>
							<TextInput
								name="name"
								placeholder="Name"
								type="text"
								value={game.name}
								onChange={handleChange}
								theme={inputTheme}
								color={"purple"}
								className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
								htmlFor="developer"
							>
								Developer*
							</label>
							<TextInput
								name="developer"
								placeholder="Developer"
								type="text"
								value={game.developer}
								onChange={handleChange}
								theme={inputTheme}
								color={"purple"}
								className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
								htmlFor="publisher"
							>
								Publisher*
							</label>
							<TextInput
								name="publisher"
								placeholder="Publisher"
								type="text"
								value={game.publisher}
								onChange={handleChange}
								theme={inputTheme}
								color={"purple"}
								className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
								htmlFor="genre"
							>
								Genres*
							</label>
							<TextInput
								name="genre"
								placeholder="Genres"
								type="text"
								value={game.genre.join(", ")}
								onChange={handleChange}
								theme={inputTheme}
								color={"purple"}
								className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
								htmlFor="platform"
							>
								Platforms*
							</label>
							<TextInput
								name="platform"
								placeholder="Platforms"
								type="text"
								value={game.platform.join(", ")}
								onChange={handleChange}
								theme={inputTheme}
								color={"purple"}
								className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
					</div>
					<div className="w-full md:w-1/2 pr-4">
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
								htmlFor="rating"
							>
								Rating*
							</label>
							<TextInput
								name="rating"
								placeholder="Rating"
								type="number"
								step="any"
								max={5}
								min={1}
								value={game.rating}
								onChange={handleChange}
								theme={inputTheme}
								color={"purple"}
								className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
								htmlFor="price"
							>
								Price*
							</label>
							<TextInput
								name="price"
								placeholder="Price"
								type="number"
								step="any"
								min={0}
								value={game.price}
								onChange={handleChange}
								theme={inputTheme}
								color={"purple"}
								className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
								htmlFor="releaseDate"
							>
								Release Date*
							</label>
							<TextInput
								name="releaseDate"
								placeholder="Release Date"
								type="date"
								value={game.releaseDate.split("T")[0]}
								onChange={handleChange}
								theme={inputTheme}
								color={"purple"}
								className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
								htmlFor="tags"
							>
								Tags*
							</label>
							<TextInput
								name="tags"
								placeholder="Tags"
								type="text"
								value={game.tags.join(", ")}
								onChange={handleChange}
								theme={inputTheme}
								color={"purple"}
								className="appearance-none rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
						</div>
						<div className="mb-4">
							<div id="fileUpload" className="max-w-md">
								<div className="mb-2 block">
									<Label
										htmlFor="file"
										value="Profile Picture"
										className="block text-gray-700 text-sm font-bold mb-4 dark:text-white"
									/>
								</div>
								<FileInput
									id="file"
									theme={inputTheme}
									color={"purple"}
									accept="image/*"
									onChange={handleFileChange}
								/>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<Button
							type="submit"
							color="purple"
							className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  dark:text-white"
						>
							Save Changes
						</Button>
					</div>
				</form>
				<ToastContainer />
			</div>
		</div>
	);
};

export default EditGame;
