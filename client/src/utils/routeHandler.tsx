import React from "react";
import { Navigate, useLocation, Route } from "react-router-dom";

function PrivateRoute({
	element,
	...props
}: React.ComponentProps<typeof Route>) {
	const location = useLocation();
	const user = JSON.parse(localStorage.getItem("user") || "{}");

	if (user && user.role === "admin") {
		return React.cloneElement(
			element as React.ReactElement<unknown>,
			props
		);
	} else if (user && user.role === "user") {
		return <Navigate to="/" />;
	} else {
		return <Navigate to="/login" state={{ from: location }} />;
	}
}

export function PublicRoute({
	element,
	...props
}: React.ComponentProps<typeof Route>) {
	//   const location = useLocation();
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
