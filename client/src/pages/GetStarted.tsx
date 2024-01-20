import React from "react";

const GetStarted: React.FC = () => {
	return (
		<div className="dark:bg-slate-700">
			<div className="p-4 max-w-screen-md mx-auto text-center text-gray-900 dark:text-white">
				<h1 className="text-4xl font-bold mb-4">
					<a
						href="https://brute-force-v2.vercel.app/"
						className="text-purple-500 dark:text-purple-300"
					>
						Brute Force
					</a>
				</h1>
				<p className="mb-4">
					This project is a full-stack gaming blog application
					developed as part of a university project. The application
					is built using a robust and modern tech stack including
					TypeScript, React, Node.js, Express, and Tailwind CSS.
				</p>
				<p className="mb-4">
					The front-end of the application is built with React and
					Tailwind CSS, providing a responsive and user-friendly
					interface. TypeScript is used to ensure type safety and
					improve the development experience.
				</p>
				<p className="mb-4">
					The back-end is powered by Node.js and Express, providing a
					fast and scalable server environment. The server handles
					requests from the front-end, processes them, and sends back
					the appropriate responses.
				</p>
				<p className="mb-4">
					This application serves as a platform for gaming enthusiasts
					to share and discuss their favorite games, strategies, and
					gaming news. Users can create, read, update, and delete blog
					posts, fostering a dynamic and interactive gaming community.
				</p>
				<p className="mb-4">
					Please refer to the 'Getting Started' section for
					instructions on how to set up and run the project locally.
				</p>
				<p className="mb-4">
					Or, you can visit the live demo{" "}
					<a
						href="https://brute-force-v2.vercel.app/"
						className="text-purple-500"
					>
						here
					</a>
					.
				</p>
				<h2 className="text-2xl font-bold mt-4 mb-2">
					Getting Started
				</h2>
				<p className="mb-4">
					To get started, clone this repository and run{" "}
					<code className="bg-gray-200 dark:bg-slate-900 p-1 rounded">
						npm install
					</code>{" "}
					(on both folders{" "}
					<code className="bg-gray-200 dark:bg-slate-900 p-1 rounded">
						client
					</code>{" "}
					&{" "}
					<code className="bg-gray-200 dark:bg-slate-900 p-1 rounded">
						server
					</code>
					) to install the dependencies. Then, run{" "}
					<code className="bg-gray-200 dark:bg-slate-900 p-1 rounded">
						npm run start:both
					</code>{" "}
					to start the server and client (or you can manually run them
					in their own folders with{" "}
					<code className="bg-gray-200 dark:bg-slate-900 p-1 rounded">
						npm run dev
					</code>
					). The server will be running on port <strong>5000</strong>{" "}
					and the client will be running on port <strong>3000</strong>
					.
				</p>
				<h2 className="text-2xl font-bold mt-4 mb-2">
					API Documentation
				</h2>
				<p className="mb-4">
					The API documentation can be found{" "}
					<a
						href="https://documenter.getpostman.com/view/18001727/2s9YsT6onc"
						className="text-purple-500"
					>
						here
					</a>
					.
				</p>
				<h2 className="text-2xl font-bold mt-4 mb-2">License</h2>
				<p className="mb-4">
					This project is licensed under the MIT License - see the{" "}
					<a href="LICENSE" className="text-purple-500">
						LICENSE
					</a>{" "}
					file for details.
				</p>

				{/* Technologies Used Section */}
				<h2 className="text-2xl font-bold mt-4 mb-2">
					Technologies Used
				</h2>
				<h3 className="text-xl font-bold mb-2">Client</h3>
				<p className="mb-4 flex justify-center space-x-4">
					<img
						src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
						alt="React"
					/>{" "}
					<img
						src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"
						alt="React Router"
					/>{" "}
					<img
						src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"
						alt="TailwindCSS"
					/>{" "}
					<img
						src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"
						alt="Vite"
					/>{" "}
					<img
						src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
						alt="TypeScript"
					/>{" "}
					<img
						src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
						alt="JavaScript"
					/>{" "}
					<img
						src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"
						alt="Vercel"
					/>{" "}
					<img
						src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white"
						alt="ESLint"
					/>{" "}
					<img
						src="https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white"
						alt="Testing Library"
					/>
				</p>
				<h3 className="text-xl font-bold mb-2">Server</h3>
				<p className="mb-4 flex justify-center space-x-4">
					<img
						src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
						alt="TypeScript"
					/>{" "}
					<img
						src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
						alt="JavaScript"
					/>{" "}
					<img
						src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"
						alt="NodeJS"
					/>{" "}
					<img
						src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"
						alt="Express.js"
					/>{" "}
					<img
						src="https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD"
						alt="Nodemon"
					/>{" "}
					<img
						src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"
						alt="MongoDB"
					/>{" "}
					<img
						src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white"
						alt="Render"
					/>{" "}
					<img
						src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"
						alt="Postman"
					/>{" "}
					<img
						src="https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE"
						alt="Insomnia"
					/>{" "}
					<img
						src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"
						alt="Jest"
					/>
				</p>
				<h3 className="text-xl font-bold mb-2">General</h3>
				<p className="mb-4 flex justify-center space-x-4">
					<img
						src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"
						alt="GitHub"
					/>{" "}
					<img
						src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white"
						alt="Git"
					/>{" "}
					<img
						src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"
						alt="Visual Studio Code"
					/>{" "}
					<img
						src="https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white"
						alt="Trello"
					/>{" "}
					<img
						src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
						alt="Discord"
					/>
				</p>

				{/* Authors Section */}
				<h2 className="text-2xl font-bold mt-4 mb-2">Authors</h2>
				<ul className="list-none">
					<li>
						<a
							href="https://github.com/Fillonit"
							className="text-purple-500"
						>
							Fillonit Ibishi
						</a>
					</li>
					<li>
						<a
							href="https://github.com/butrinntt"
							className="text-purple-500"
						>
							Butrint Reçica
						</a>
					</li>
					<li>
						<a
							href="https://github.com/YumaSisyphus"
							className="text-purple-500"
						>
							Erblin Ymeri
						</a>
					</li>
				</ul>

				{/* Installation Section */}
				<h2 className="text-2xl font-bold mt-4 mb-2">Installation</h2>

				{/* Clone Section */}
				<h2 className="text-xl font-bold mb-2">Clone</h2>
				<p className="mb-4">
					Clone this repository to your local machine using <br />
					<code className="bg-gray-200 dark:bg-slate-900 p-1 rounded">
						$ git clone https://github.com/Fillonit/BruteForceV2
					</code>
				</p>

				{/* Setup Section */}
				<h2 className="text-xl font-bold mb-2">Setup</h2>
				<p className="mb-4">
					<em>Install npm packages</em> <br />
					<code className="bg-gray-200 dark:bg-slate-900 py-1 rounded my-2">
						$ cd client <br />
						$ npm install <br />
						$ cd ../server <br />$ npm install
					</code>
				</p>
				<p className="mb-4 ">
					<em>
						Create a .env file in the server directory and add the
						following
					</em>{" "}
					<br />
					<code className="bg-gray-200 dark:bg-slate-900 py-1 rounded my-2">
						NODE_ENV= <br />
						MONGO_USERNAME= <br />
						MONGO_PASSWORD= <br />
						MONGO_URL= <br />
						SECRET= <br />
						APP_OWNER_ID= <br />
						PORT=
					</code>
				</p>

				{/* Run the Server Section */}
				<h2 className="text-xl font-bold mb-2">Run the server</h2>
				<p className="mb-4">
					<em>Run the server</em> <br />
					<code className="bg-gray-200 dark:bg-slate-900 py-1 rounded my-2">
						$ cd server <br />$ npm start
					</code>
				</p>
				<p className="mb-4">
					<em>Run the server with nodemon (preferred)</em> <br />
					<code className="bg-gray-200 dark:bg-slate-900 py-1 rounded my-2">
						$ cd server <br />$ npm run dev
					</code>
				</p>
				<p className="mb-4">
					<em>Run the tests</em> <br />
					<code className="bg-gray-200 dark:bg-slate-900 py-1 rounded my-2">
						$ cd server <br />$ npm test
					</code>
				</p>

				{/* Run the Client Section */}
				<h2 className="text-xl font-bold mb-2">Run the client</h2>
				<p className="mb-4">
					<em>Run the client</em> <br />
					<code className="bg-gray-200 dark:bg-slate-900 py-1 rounded my-2">
						$ cd client <br />$ npm start
					</code>
				</p>
				<p className="mb-4">
					<em>Run the client with vite (preferred)</em> <br />
					<code className="bg-gray-200 dark:bg-slate-900 py-1 rounded my-2">
						$ cd client <br />$ npm run dev
					</code>
				</p>
				<p className="mb-4">
					<em>Run the tests</em> <br />
					<code className="bg-gray-200 dark:bg-slate-900 py-1 rounded my-2">
						$ cd client <br />$ npm test
					</code>
				</p>

				{/* Thank You Section */}
				<h1 className="text-2xl font-bold mt-4 mb-2">
					Thank you for reading!
				</h1>
				<p className="mb-4">
					🌟{" "}
					<em>
						Don't forget to leave a star if you like the project!
					</em>{" "}
					🌟
				</p>
			</div>
		</div>
	);
};

export default GetStarted;
