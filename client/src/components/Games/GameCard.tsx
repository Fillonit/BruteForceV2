import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { FaEye } from "react-icons/fa";
interface Game {
	_id: string;
	name: string;
	description: string;
	genre: string[];
	platform: string[];
	developer: string;
	publisher: string;
	releaseDate: string;
	price: number;
	rating: number;
	image: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	tags: string[];
}

const GameCard: React.FC<Game> = (game) => {
	const [games, setGames] = useState<Game[]>([]);
	console.log(games);

	function formatNumber(num: number) {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + "M";
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + "K";
		} else {
			return num;
		}
	}

	useEffect(() => {
		const fetchGames = async () => {
			const response = await fetch(`${API_BASE_URL}/games`);
			const data = await response.json();
			setGames(data.games);
		};

		fetchGames();
	}, []);

	return (
		<div
			key={game._id}
			className="bg-white rounded-lg overflow-hidden shadow-lg relative dark:bg-slate-900 font-tektur hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
		>
			<img
				className="w-full h-64 object-cover"
				src={game.image}
				alt={game.name}
			/>
			<div className="absolute top-0 right-0 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold mr-2 mt-2 text-white flex items-center text-md bg-gradient-to-r from-purple-500 to-purple-800">
				{/* {game.platform.join(", ")} */}
				{formatNumber(Math.floor(Math.random() * 9999999) + 1)}
				<FaEye className="ml-1 text-purple-50" />
			</div>
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2 dark:text-white">
					{game.name}
				</div>
				<p className="text-gray-700 text-base line-clamp-2 dark:text-gray-400">
					{game.description}
				</p>
			</div>
			<div className="px-6 pt-4 pb-2">
				{game.tags.slice(0, 4).map((tag) => (
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2 dark:bg-gray-800 dark:text-gray-200 cursor-pointer hover:scale-110 hover:bg-purple-400 hover:text-white">
						#{tag}
					</span>
				))}
			</div>
		</div>
	);
};

export default GameCard;
