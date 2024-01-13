"use client";

import { Table } from "flowbite-react";

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
	return (
		<div className="overflow-x-auto">
			<Table hoverable>
				<Table.Head>
					<Table.HeadCell>Username</Table.HeadCell>
					<Table.HeadCell>Full Name</Table.HeadCell>
					<Table.HeadCell>Email</Table.HeadCell>
					<Table.HeadCell>Role</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Edit</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{users.map((user) => (
						<Table.Row
							key={user._id}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{user.username}
							</Table.Cell>
							<Table.Cell>{`${user.profile.firstName} ${user.profile.lastName}`}</Table.Cell>
							<Table.Cell>{user.email}</Table.Cell>
							<Table.Cell>{user.role}</Table.Cell>
							<Table.Cell>
								<a
									href="#"
									className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
								>
									Edit
								</a>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}

export default TableComponent;
