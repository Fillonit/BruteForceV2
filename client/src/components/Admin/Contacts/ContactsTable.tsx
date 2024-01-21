"use client";

import { Button, Modal, Table } from "flowbite-react";
import { API_BASE_URL } from "../../../config";
import { useState } from "react";
import { toast } from "react-toastify";

interface ContanctsData {
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
  _id: string;
}
function TableComponent({ contacts }: { contacts: ContanctsData[] }) {
  const itemsPerPage = 3; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteContact, setDeleteContact] = useState({ id: "", name: "" });

  const handleOpenDeleteModal = (id: string, name: string) => {
    setOpenDeleteModal(true);
    setDeleteContact({ id, name });
  };

  const handleCloseDeleteModal = async () => {
    setOpenDeleteModal(false);
    toast.info("Contact Deletion Canceled!");
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      toast.success("Contact Deleted Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Contact Deletion Failed!");
      console.error("Couldn't delete Contact:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto  w-5/6">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Created At</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentContacts.map((contact) => (
              <Table.Row
                key={contact._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                style={{ height: "100px" }} // Adjust the height as needed
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {contact.name}
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={"mailto:" + contact.email}
                    className="text-purple-600 dark:text-purple-500 hover:text-purple-400 dark:hover:text-purple-400"
                  >
                    {contact.email}
                  </a>
                </Table.Cell>
                <Table.Cell>
                  {new Date(contact.createdAt).toLocaleDateString("en-GB")}
                </Table.Cell>
                <Table.Cell>
                  <div className="space-x-4">
                    <a
                      href={`/viewcontact/${contact._id}`}
                      className="font-medium text-green-600 hover:underline dark:text-green-500"
                    >
                      View
                    </a>
                    <a
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                      onClick={() =>
                        handleOpenDeleteModal(contact._id, contact.name)
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
                Are you sure that you want to delete contact made by{" "}
                <span className="bg-purple-500 p-2 text-white rounded-md font-bold">
                  {deleteContact.name}
                </span>{" "}
                ?
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => handleDelete(deleteContact.id)}
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
      <div className="flex mt-4 absolute bottom-0 mb-10">
        {Array.from({
          length: Math.ceil(contacts.length / itemsPerPage),
        }).map((_, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default TableComponent;
