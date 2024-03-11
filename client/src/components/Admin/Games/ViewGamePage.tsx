import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config";
import { useParams } from "react-router-dom";

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

const ViewGame = () => {
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
      <div className="w-full max-w-6xl">
        <div className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-700 flex-col">
          <div className="mb-4 text-center ">
            <label
              className=" text-gray-700 text-sm font-bold mb-2 dark:text-white"
              htmlFor="image"
            >
              Picture
            </label>
            <div className="flex justify-center">
              <img
                src={game.image}
                alt={game.name}
                className="w-1/3 h-1/3 object-cover"
              />
            </div>
          </div>
          <div className="flex flex-wrap content-center">
            <div className="w-full md:w-1/2 pr-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
                  {game.name}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="developer"
                >
                  Developer
                </label>
                <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
                  {game.developer}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="publisher"
                >
                  Publisher
                </label>
                <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
                  {game.publisher}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="genre"
                >
                  Genres
                </label>
                <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
                  {game.genre.join(", ")}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 pr-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="platform"
                >
                  Platforms
                </label>
                <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
                  {game.platform.join(", ")}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="rating"
                >
                  Rating
                </label>
                <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
                  {game.rating}/5
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="price"
                >
                  Price
                </label>
                <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
                  {game.price}$
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="releaseDate"
                >
                  Release Date
                </label>
                <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
                  {game.releaseDate.split("T")[0]}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="tags"
                >
                  Tags
                </label>
                <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
                  {game.tags.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGame;
