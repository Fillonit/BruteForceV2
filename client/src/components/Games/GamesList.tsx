/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
// import { API_BASE_URL } from "../../config";
import GameCard from "./GameCard";
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

const GamesList: React.FC<{ gamesList: Game[] }> = ({ gamesList }) => {
	// const [games, setGames] = useState<Game[]>([]);
	// console.log(games);

	// useEffect(() => {
	// 	const fetchGames = async () => {
	// 		const response = await fetch(`${API_BASE_URL}/games`);
	// 		const data = await response.json();
	// 		setGames(data.games);
	// 	};

	// 	fetchGames();
	// }, []);

	return (
		<div className="bg-gray-200 min-h-screen dark:bg-slate-700">
			<main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
				<h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
					Latest Games
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{gamesList.map((game: Game) => (
						<GameCard {...game} />
					))}
				</div>
			</main>
		</div>
	);
};

export default GamesList;
