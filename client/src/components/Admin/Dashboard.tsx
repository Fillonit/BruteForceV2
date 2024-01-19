import { API_BASE_URL } from "../../config";
import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Admin/Sidebar";
import UsersTable from "./UserTable";
import GameTable from "./GameTable";
import PostTable from "./PostTable";
import SidebarComponent from "./Sidebar";
import { useParams } from "react-router-dom";

interface UsersData {
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
  };
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  _id: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GamesData {
  ceatedAt: string;
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
  updatedAt: string;
  _v: number;
  _id: string;
}

interface PostsData {
  author: UsersData;
  comments: string[];
  content: string;
  createdAt: string;
  imageURL: string;
  likes: number;
  tags: string[];
  title: string;
  updatedAt: string;
  views: number;
  _v: number;
  _id: string;
}

// interface Author {
// 	_id: string;
// 	username: string;
// 	email: string;
// 	profile: {
// 		firstName: string;
// 		lastName: string;
// 		bio: string;
// 		avatar: string;
// 	};
// }

// interface Post {
// 	_id: string;
// 	title: string;
// 	imageURL: string;
// 	content: string[];
// 	tags: string[];
// 	author: Author;
// 	createdAt: Date;
// 	updatedAt: string;
// 	likes: number;
// 	views: number;
// }

// interface UserInfoProps {
// 	user: UsersData | null;
// }

const UsersInfo: React.FC = () => {
  const [users, setUsers] = useState<UsersData[]>([]);
  const [games, setGames] = useState<GamesData[]>([]);
  const [posts, setPosts] = useState<PostsData[]>([]);

  const { table } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await fetch(`${API_BASE_URL}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const responseGames = await fetch(`${API_BASE_URL}/games`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const responsePosts = await fetch(`${API_BASE_URL}/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        const dataUsers = await responseUsers.json();
        const dataGames = await responseGames.json();
        const dataPosts = await responsePosts.json();
        setPosts(dataPosts.posts);
        setGames(dataGames.games);
        setUsers(dataUsers.users);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(posts);
  return (
    <div>
      <div className="flex h-screen bg-gray-100 bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 py-10 ">
        <div className="w-64 bg-white p-4 border-r dark:bg-gray-800">
          <SidebarComponent />
        </div>
        <div className="flex-1 p-6 overflow-auto overflow-y-hidden">
          {table === "users" || table === undefined ? (
            <UsersTable users={users} />
          ) : table === "games" ? (
            <GameTable games={games} />
          ) : table === "posts" ? (
            <PostTable posts={posts} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersInfo;
