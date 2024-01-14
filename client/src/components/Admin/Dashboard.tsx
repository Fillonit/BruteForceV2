import { API_BASE_URL } from "../../config";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import UsersTable from "../../components/Admin/Table";
import NavbarComponent from "../Navbar";

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="flex h-screen bg-gray-100 bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 py-10 ">
        <div className="w-64 bg-white p-4 border-r dark:bg-gray-800">
          <Sidebar />
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <UsersTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default UsersInfo;
