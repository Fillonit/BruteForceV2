import { API_BASE_URL } from "../../config";
import React, { useEffect, useState } from "react";
import UsersTable from "./Users/UserTable";
import GameTable from "./Games/GameTable";
import PostTable from "./Posts/PostTable";
import ContactTable from "./Contacts/ContactsTable";
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

interface ContanctsData {
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
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
  const [contacts, setContacts] = useState<ContanctsData[]>([]);

  const { table } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${table}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        {
          console.log(data);
          table === "users" || table === undefined
            ? setUsers(data.users)
            : table === "games"
            ? setGames(data.games)
            : table === "posts"
            ? setPosts(data.posts)
            : table === "contacts"
            ? setContacts(data.contacts)
            : "";
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex h-screen bg-gray-100 bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 py-10 ">
        <div className="w-64 bg-white border-r dark:bg-gray-800">
          <SidebarComponent />
        </div>
        <div className="flex-1 overflow-auto overflow-y-hidden">
          {table === "users" || table === undefined ? (
            <UsersTable users={users} />
          ) : table === "games" ? (
            <GameTable games={games} />
          ) : table === "posts" ? (
            <PostTable posts={posts} />
          ) : table === "contacts" ? (
            <ContactTable contacts={contacts} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersInfo;
