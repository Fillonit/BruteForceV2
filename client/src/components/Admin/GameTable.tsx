"use client";

import { Avatar, Button, Modal, Table } from "flowbite-react";
import { API_BASE_URL } from "../../config";
import { useState } from "react";
import { toast } from "react-toastify";

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

function TableComponent({ games }: { games: GamesData[] }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteGame, setDeleteGame] = useState({ id: "", name: "" });

  const handleOpenDeleteModal = (id: string, name: string) => {
    setOpenDeleteModal(true);
    setDeleteGame({ id, name });
  };

  const test = async () => {
    setOpenDeleteModal(false);
    toast.info("Game Deletion Canceled!");
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/games/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      toast.success("Game Deleted Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Game Deletion Failed!");
      console.error("Couldn't delete game:", error);
    }
  };

  return (
    <div className="overflow-x-auto ">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Cover</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Developers</Table.HeadCell>
          <Table.HeadCell>Publisher</Table.HeadCell>
          <Table.HeadCell>Genres</Table.HeadCell>
          <Table.HeadCell>Platforms</Table.HeadCell>
          <Table.HeadCell style={{ width: "80px" }}>Rating</Table.HeadCell>
          <Table.HeadCell style={{ width: "80px" }}>Price</Table.HeadCell>
          <Table.HeadCell>Release Date</Table.HeadCell>
          <Table.HeadCell>Tags</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {games.map((game) => (
            <Table.Row
              key={game._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              style={{ height: "100px" }} // Adjust the height as needed
            >
              <Table.Cell style={{ width: "120px" }}>
                <img
                  width={200}
                  height={200}
                  style={{ minHeight: "150px", minWidth: "120px" }}
                  src={game.image}
                  alt="..."
                  className="rounded-sm object-cover"
                />
              </Table.Cell>
              <Table.Cell
                style={{ width: "200px" }}
                className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
              >
                {game.name}
              </Table.Cell>
              <Table.Cell>{game.developer}</Table.Cell>
              <Table.Cell>{game.publisher}</Table.Cell>
              <Table.Cell style={{ width: "100px" }}>
                {game.genre.join(", ")}
              </Table.Cell>
              <Table.Cell style={{ width: "200px" }}>
                {game.platform.join(", ")}
              </Table.Cell>
              <Table.Cell>{game.rating}/5</Table.Cell>
              <Table.Cell>{game.price}$</Table.Cell>
              <Table.Cell>
                {new Date(game.releaseDate).toLocaleDateString("en-GB")}
              </Table.Cell>

              <Table.Cell style={{ width: 300 }}>
                {game.tags.slice(0, 10).join(", ")}
                {game.tags.length > 10 && `, +${game.tags.length - 10} more`}
              </Table.Cell>

              <Table.Cell style={{ width: "180px" }}>
                <div className="space-x-4">
                  <a
                    href={`/edituser/${game._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                  <a
                    href={`/viewuser/${game._id}`}
                    className="font-medium text-green-600 hover:underline dark:text-green-500"
                  >
                    View
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                    onClick={() => handleOpenDeleteModal(game._id, game.name)}
                  >
                    Delete
                  </a>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Modal.Header>Delete User</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure that you want to delete game{" "}
              <span className="bg-purple-500 p-2 text-white rounded-md font-bold">
                {deleteGame.name}
              </span>{" "}
              ?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleDelete(deleteGame.id)} color="success">
            Yes
          </Button>
          <Button color="failure" onClick={() => test()}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TableComponent;
