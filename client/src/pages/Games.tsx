import React, { useEffect, useState } from "react";
import GamesList from "../components/Games/GamesList";
import { API_BASE_URL } from "../config";

interface Game {
  _id: string;
  name: string;
  description: string;
  genre: string[];
  platform: string[]; // Fix: Change the type of 'platform' to 'string[]'
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

const Game: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch(`${API_BASE_URL}/games`);
      const data = await response.json();
      setGames(data.games);
    };

    fetchGames();
  }, []);

  return (
    <div>
      <GamesList gamesList={games.slice(0, 4)} />
    </div>
  );
};

export default Game;
