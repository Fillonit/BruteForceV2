import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
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

const GamesList: React.FC = () => {
	const [games, setGames] = useState<Game[]>([]);
	console.log(games);

	useEffect(() => {
		const fetchGames = async () => {
			const response = await fetch(`${API_BASE_URL}/games`);
			const data = await response.json();
			setGames(data.games);
		};

		fetchGames();
	}, []);

	return (
		<div className="bg-gray-200 min-h-screen">
			<main className="container mx-auto py-8">
				<h2 className="text-2xl font-bold mb-4">Latest Games</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
					{games.map((game) => (
						<div
							key={game._id}
							className="bg-white rounded-lg overflow-hidden shadow-lg relative max-w-xs"
						>
							<img
								className="w-full h-64 object-cover"
								src={game.image}
								alt={game.name}
							/>
							<div className="absolute top-0 right-0 bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-800 mr-2 mt-2">
								{game.platform.join(", ")}
							</div>
							<div className="px-6 py-4">
								<div className="font-bold text-xl mb-2">
									{game.name}
								</div>
								<p className="text-gray-700 text-base line-clamp-2">
									{game.description}
								</p>
							</div>
							<div className="px-6 pt-4 pb-2">
								{game.tags.slice(0, 4).map((tag) => (
									<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">
										#{tag}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default GamesList;
