import React from "react";
import SignUp from "../components/SignUp";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import SignIn from "../components/SignIn";

const LoginPage: React.FC = () => {
	// const [isSignUp, setIsSignUp] = React.useState(false);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const toggleSignUp = () => {
	// 	setIsSignUp(!isSignUp);
	// };

	return (
		<div>
			<SignUp />
			{/* {isSignUp ? <SignUp /> : <SignIn />}
            <button onClick={toggleSignUp}>
                {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
            </button> */}
		</div>
	);
};

export default LoginPage;
