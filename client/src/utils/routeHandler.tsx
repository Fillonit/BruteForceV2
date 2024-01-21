import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { API_BASE_URL } from "../config";

function PrivateRoute({
	element,
	...props
}: React.ComponentProps<typeof Route>) {
	const [role, setRole] = useState<string | null>(null);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user") || "{}");

		if (user && user.authentication.sessionToken) {
			fetch(`${API_BASE_URL}/users/me`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${user.authentication.sessionToken}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setRole(data.user.role);
				})
				.catch((error) => console.error(error));
		}
	}, []);

	if (role === null) {
		return null; // or a loading spinner
	} else if (role === "admin") {
		return React.cloneElement(
			element as React.ReactElement<unknown>,
			props
		);
	} else {
		return <Navigate to="/" />;
	}
}

export function PublicRoute({
	element,
	...props
}: React.ComponentProps<typeof Route>) {
	const user = JSON.parse(localStorage.getItem("user") || "{}");

	if (!user || !user.role) {
		return React.cloneElement(
			element as React.ReactElement<unknown>,
			props
		);
	} else {
		return <Navigate to="/" />;
	}
}

export default PrivateRoute;
