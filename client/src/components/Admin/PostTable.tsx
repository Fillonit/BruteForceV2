"use client";

import { Avatar, Button, Modal, Table } from "flowbite-react";
import { API_BASE_URL } from "../../config";
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
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletePost, setDeletePost] = useState({ id: "", name: "" });

  const handleOpenDeleteModal = (id: string, name: string) => {
    setOpenDeleteModal(true);
    setDeletePost({ id, name });
  };

  const test = async () => {
    setOpenDeleteModal(false);
    toast.info("User Deletion Canceled!");
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
    <div className="overflow-x-auto ">
      <Table hoverable>
        <Table.Head >
          <Table.HeadCell >Cover</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Tags</Table.HeadCell>
          <Table.HeadCell>Likes</Table.HeadCell>
          <Table.HeadCell>Views</Table.HeadCell>
          <Table.HeadCell>Date of Post</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {posts.map((post) => (
            <Table.Row
              key={post._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              style={{ height: "100px" }} // Adjust the height as needed
            >
              <Table.Cell style={{ width: "120px" }}>
                <img
                  style={{ minHeight: "150px", minWidth: "120px" }}
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
                    href={`/edituser/${post._id}`}
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
  );
}

export default TableComponent;
