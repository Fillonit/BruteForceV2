import React, { useEffect, useState } from "react";
import GamesList from "../components/Games/GamesList";

interface Game {
	_id: string;
	name: string;
	description: string;
	genre: string;
	platform: string;
	developer: string;
	publisher: string;
	releaseDate: string;
	price: number;
	rating: number;
	image: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

const Home: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		const fetchGames = async () => {
			const response = await fetch("http://localhost:5000/games");
			const data = await response.json();
			setGames(data.games);
		};

		fetchGames();
	}, []);

	return (
		<div>
			<GamesList />
		</div>
	);
};

export default Home;
