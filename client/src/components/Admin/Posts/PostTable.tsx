"use client";

import { Button, Modal, Table } from "flowbite-react";
import { API_BASE_URL } from "../../../config";
import { useState } from "react";
import { toast } from "react-toastify";

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

function TableComponent({ posts }: { posts: PostsData[] }) {
  const itemsPerPage = 3; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletePost, setDeletePost] = useState({ id: "", name: "" });

  const handleOpenDeleteModal = (id: string, name: string) => {
    setOpenDeleteModal(true);
    setDeletePost({ id, name });
  };

  const test = async () => {
    setOpenDeleteModal(false);
    toast.info("Post Deletion Canceled!");
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      toast.success("Post Deleted Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Post Deletion Failed!");
      console.error("Couldn't delete post:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto w-full">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Cover</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Tags</Table.HeadCell>
            <Table.HeadCell>Likes</Table.HeadCell>
            <Table.HeadCell>Views</Table.HeadCell>
            <Table.HeadCell>Date of Post</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentPosts.map((post) => (
              <Table.Row
                key={post._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                style={{ height: "100px" }} // Adjust the height as needed
              >
                <Table.Cell style={{ width: "120px" }}>
                  <img
                    style={{
                      minHeight: "150px",
                      minWidth: "120px",
                    }}
                    src={post.imageURL}
                    alt="..."
                    className="rounded-sm object-cover"
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {post.author.username}
                </Table.Cell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell style={{ width: 300 }}>
                  {post.tags.slice(0, 10).join(", ")}
                  {post.tags.length > 10 && `, +${post.tags.length - 10} more`}
                </Table.Cell>
                <Table.Cell>{post.likes}</Table.Cell>
                <Table.Cell>{post.views}</Table.Cell>
                <Table.Cell>
                  {new Date(post.createdAt).toLocaleDateString("en-GB")}
                </Table.Cell>
                <Table.Cell style={{ width: "180px" }}>
                  <div className="space-x-4">
                    <a
                      href={`/editpost/${post._id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                    <a
                      href={`/viewuser/${post._id}`}
                      className="font-medium text-green-600 hover:underline dark:text-green-500"
                    >
                      View
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                      onClick={() =>
                        handleOpenDeleteModal(post._id, post.author.username)
                      }
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
                Are you sure that you want to delete post made by{" "}
                <span className="bg-purple-500 p-2 text-white rounded-md font-bold">
                  {deletePost.name}
                </span>{" "}
                ?
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleDelete(deletePost.id)} color="success">
              Yes
            </Button>
            <Button color="failure" onClick={() => test()}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="flex mt-4 absolute bottom-0 mb-10">
        {Array.from({ length: Math.ceil(posts.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-700 dark:text-white dark:bg-gray-800"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default TableComponent;
