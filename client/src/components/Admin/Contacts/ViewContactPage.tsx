import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config";
import { useParams } from "react-router-dom";

interface ContanctsData {
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
  _id: string;
}

const ViewContact = () => {
  const { id } = useParams();
  const [contact, setUser] = useState<ContanctsData>({
    name: "",
    email: "",
    message: "",
    createdAt: "",
    updatedAt: "",
    _v: 0,
    _id: "",
  });

  useEffect(() => {
    const fetchContactData = async () => {
      const user = localStorage.getItem("user");
      const sessionToken = user
        ? JSON.parse(user).authentication.sessionToken
        : null;

      try {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${sessionToken}`,
          },
        });

        const data = await response.json();
        setUser(data.contact);
        console.log(data.contact);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContactData();
  }, []);

  return (
    <div className="flex justify-center bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 p-60 ">
      <div className="w-full max-w-sm ">
        <div className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-700">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              htmlFor="name"
            >
              Name
            </label>
            <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
              {contact.name}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
              {contact.email}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
              htmlFor="message"
            >
              Message
            </label>
            <div className="appearance-none rounded w-full py-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ">
              {contact.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
