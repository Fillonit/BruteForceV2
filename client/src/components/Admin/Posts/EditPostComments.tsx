import React, { useState } from "react";
import { API_BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { Button, Modal } from "flowbite-react";

interface Author {
  _id: string;
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    bio: string;
    avatar: string;
  };
}

interface Comment {
  _id: string;
  content: string;
  user: Author;
  createdAt: Date;
}

interface Post {
  _id: string;
  title: string;
  imageURL: string;
  content: string;
  tags: string[];
  author: Author;
  createdAt: Date;
  updatedAt: string;
  likes: number;
  views: number;
  comments: Comment[];
}
interface PostCardProps {
  post: Post | null;
}

const PostComments: React.FC<PostCardProps> = ({ post }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteComment, setDeleteComment] = useState({ id: "", name: "" });

  const handleOpenDeleteModal = (id: string, name: string) => {
    setOpenDeleteModal(true);
    setDeleteComment({ id, name });
  };

  const handleCloseDeleteModal = async () => {
    setOpenDeleteModal(false);
    toast.info("Comment Deletion Canceled!");
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      toast.success("Comment Deleted Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Comment Deletion Failed!");
      console.error("Couldn't delete comment:", error);
    }
  };

  if (!post) {
    return null;
  }

  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div key={post._id} className="relative font-tektur">
      <h4 className="text-white dark:text-white mb-4 text-lg">Comments:</h4>

      <div className="border border-gray-400 bg-gray-900 p-4 rounded-lg shadow-lg">
        {post.comments.map((comment, index) => (
          <div
            key={comment._id}
            className={`grid grid-cols-2 items-center  ${
              index < post.comments.length - 1 ? "border-b border-gray-600" : ""
            }`}
          >
            <div className="flex items-center space-x-4 mb-2 mt-2">
              <img
                src={comment.user.profile.avatar}
                alt="User avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-white text-base dark:text-zinc-400">
                  {comment.content}
                </p>
                <p className="text-gray-400 text-xs">
                  <span className="text-purple-200 text-sm">
                    {comment.user.username}
                  </span>
                  - {timeSince(new Date(comment.createdAt))}
                </p>
              </div>
            </div>
            <div className="text-right">
              <a
                className="font-medium text-red-600 hover:underline dark:text-red-500"
                onClick={() =>
                  handleOpenDeleteModal(comment._id, comment.user.username)
                }
              >
                Delete
              </a>
            </div>
          </div>
        ))}
        <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <Modal.Header>Delete User</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Are you sure that you want to delete comment made by{" "}
                <span className="bg-purple-500 p-2 text-white rounded-md font-bold">
                  {deleteComment.name}
                </span>{" "}
                ?
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => handleDelete(deleteComment.id)}
              color="success"
            >
              Yes
            </Button>
            <Button color="failure" onClick={() => handleCloseDeleteModal()}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PostComments;
