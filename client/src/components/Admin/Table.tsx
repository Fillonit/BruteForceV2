"use client";

import { Avatar, Button, Modal, Table } from "flowbite-react";
import { API_BASE_URL } from "../../config";
import { useState } from "react";
import { toast } from "react-toastify";

interface UserData {
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
function TableComponent({ users }: { users: UserData[] }) {
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [deleteUser, setDeleteUser] = useState({ id: "", username: "" });

	const handleOpenDeleteModal = (id: string, username: string) => {
		setOpenDeleteModal(true);
		setDeleteUser({ id, username });
	};

	const test = async () => {
		setOpenDeleteModal(false);
		toast.info("User Deletion Canceled!");
	};

	const handleDelete = async (id: string) => {
		try {
			await fetch(`${API_BASE_URL}/users/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${localStorage.getItem("token")}`,
				},
			});
			toast.success("User Deleted Successfully!");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			toast.error("User Deletion Failed!");
			console.error("Couldn't delete user:", error);
		}
	};

	return (
		<div className="overflow-x-auto">
			<Table hoverable>
				<Table.Head>
					<Table.HeadCell>Avatar</Table.HeadCell>
					<Table.HeadCell>Username</Table.HeadCell>
					<Table.HeadCell>Full Name</Table.HeadCell>
					<Table.HeadCell>Email</Table.HeadCell>
					<Table.HeadCell>Role</Table.HeadCell>
					<Table.HeadCell>Action</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{users.map((user) => (
						<Table.Row
							key={user._id}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell>
								<Avatar
									alt="User settings"
									img={user.profile.avatar}
									rounded
									size="md"
									className="block"
								/>
							</Table.Cell>
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{user.username}
							</Table.Cell>
							<Table.Cell>{`${user.profile.firstName} ${user.profile.lastName}`}</Table.Cell>
							<Table.Cell>
								<a
									href={"mailto:" + user.email}
									className="text-purple-600 dark:text-purple-500 hover:text-purple-400 dark:hover:text-purple-400"
								>
									{user.email}
								</a>
							</Table.Cell>
							<Table.Cell>{user.role}</Table.Cell>
							<Table.Cell>
								<div className="space-x-4">
									<a
										href={`/edituser/${user._id}`}
										className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
									>
										Edit
									</a>
									<a
										href={`/viewuser/${user._id}`}
										className="font-medium text-green-600 hover:underline dark:text-green-500"
									>
										View
									</a>
									<a
										href="#"
										className="font-medium text-red-600 hover:underline dark:text-red-500"
										onClick={() =>
											handleOpenDeleteModal(
												user._id,
												user.username
											)
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
			<Modal
				show={openDeleteModal}
				onClose={() => setOpenDeleteModal(false)}
			>
				<Modal.Header>Delete User</Modal.Header>
				<Modal.Body>
					<div className="space-y-6">
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							Are you sure that you want to delete user{" "}
							<span className="bg-purple-500 p-2 text-white rounded-md font-bold">
								{deleteUser.username}
							</span>{" "}
							?
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => handleDelete(deleteUser.id)}
						color="success"
					>
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
