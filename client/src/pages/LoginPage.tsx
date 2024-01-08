import React from "react";
import SignUp from "../components/SignUp";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SignIn from "../components/SignIn";

const LoginPage: React.FC = () => {
	const [logIn, setLogIn] = React.useState(true);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const toggleSignUp = () => {
	// 	setIsSignUp(!isSignUp);
	// };

	return (
		<>
			{logIn === true ? (
				<SignIn setLogIn={setLogIn} />
			) : (
				<SignUp setLogIn={setLogIn} />
			)}
		</>
	);
};

export default LoginPage;
