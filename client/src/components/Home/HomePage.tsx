import { Button, Card, Carousel } from "flowbite-react";
import Doom from "../../assets/Doom.jpg";
import Hades from "../../assets/Hades.jpg";
import { Link } from "react-router-dom";
// import LeagueVideo from "../../assets/Still Here.mp4";
import Nintendo from "../../assets/nintendo.jpg";
import Soma from "../../assets/Soma.jpg";
import Arcane from "../../assets/Arcane.jpg";
import EldenRing from "../../assets/EldenRing.jpg";
import ArcaneCard from "../../assets/ArcaneCard.jpg";
import Minecraft from "../../assets/Minecraft.jpg";
import Sidebar from "../Sidebar";

const HomePage = () => {
	return (
		<div className="bg-gray-200 min-h-screen dark:bg-slate-700 bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 pb-10">
			<div className="h-[500px]">
				<video
					autoPlay
					muted
					loop
					className="w-full h-full object-cover rounded-none bg-cover"
				>
					<source
						src={
							// "https://uc342283ee399e38c70e46a5b4d4.dl.dropboxusercontent.com/cd/0/inline/CLwsTtQDG14hVEtwqh7BztWQUpD5pZzImUICL4mWu2lVqzos_A7_AA6nyW0I9Bc4JHgD__4ycEESsNU_avT2AiGrL6qRD4jxTY-MpQvn255oouB5wbB_eg8Yq1W3B7V1nrO2BqRF2t6teK4Ah6N-x5QM/file#"
							"https://www.dropbox.com/scl/fi/mtl5zpvblypp2smes9f7s/Hades2.mp4?rlkey=lu5ildhd1d3orxp0i8b2krmzn&raw=1"
						}
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>
			</div>
			<h1 className="text-3xl text-center mt-10 text-black dark:text-white">
				Features
			</h1>
			<div className="grid grid-cols-1 gap-6 justify-center mt-9 w-3/4 md:grid-cols-2 lg:grid-cols-3 lg:justify-between mx-auto">
				<Card
					className="max-w-sm"
					renderImage={() => (
						<img
							width={400}
							height={500}
							style={{ minHeight: "350px" }}
							src={ArcaneCard}
							alt="..."
							className="rounded-md object-cover"
						/>
					)}
				>
					<h5 className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
						Welcome to BruteForce
					</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						Immerse yourself in a world of gaming stories, tips, and
						discussions.
					</p>
					<Button
						gradientDuoTone="purpleToBlue"
						as={Link}
						to="/about"
					>
						Explore
					</Button>
				</Card>
				<Card
					className="max-w-sm"
					renderImage={() => (
						<img
							width={400}
							height={400}
							style={{ minHeight: "350px" }}
							src={Minecraft}
							alt="..."
							className="rounded-md object-cover"
						/>
					)}
				>
					<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
						Engaging Blog Content
					</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						Stay informed with our insightful blog posts covering
						the gaming world.
					</p>
					<Button gradientDuoTone="purpleToBlue" as={Link} to="/blog">
						Check it Out
					</Button>
				</Card>
				<Card
					className="max-w-sm"
					renderImage={() => (
						<img
							width={400}
							height={500}
							style={{ minHeight: "350px" }}
							src={Hades}
							alt="..."
							className="rounded-md"
						/>
					)}
				>
					<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
						Dive into Exciting Games
					</h5>
					<p className="font-normal text-gray-700 dark:text-gray-400">
						Discover the latest gaming trends and explore a wide
						range of games.
					</p>
					<Button
						gradientDuoTone="purpleToBlue"
						as={Link}
						to="/games"
					>
						Read More
					</Button>
				</Card>
			</div>
			<Sidebar />

			<div className="font-[sans-serif] text-white py-12 px-4">
				<div className="max-w-7xl mx-auto">
					<h2 className="sm:text-4xl text-2xl font-extrabold text-center mb-16">
						Discover Our Exclusive Features
					</h2>
					<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 max-md:max-w-lg mx-auto">
						<div className="rounded-xl group p-8 text-center hover:bg-white hover:text-purple-800 hover:shadow-xl transition duration-300">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="w-8 mb-4 inline-block"
								viewBox="0 0 32 32"
							>
								<path
									d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z"
									data-original="#000000"
								/>
								<path
									d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"
									data-original="#000000"
								/>
							</svg>
							<h3 className="text-xl font-semibold mb-2">
								Customization
							</h3>
							<p className="text-gray-300 group-hover:text-gray-500 text-sm">
								Tailor our product to suit your needs.
							</p>
						</div>
						<div className="rounded-xl group p-8 text-center hover:bg-white hover:text-purple-800 hover:shadow-xl transition duration-300">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="w-8 mb-4 inline-block"
								viewBox="0 0 682.667 682.667"
							>
								<defs>
									<clipPath
										id="a"
										clipPathUnits="userSpaceOnUse"
									>
										<path
											d="M0 512h512V0H0Z"
											data-original="#000000"
										/>
									</clipPath>
								</defs>
								<g
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									strokeMiterlimit="10"
									stroke-width="40"
									clipPath="url(#a)"
									transform="matrix(1.33 0 0 -1.33 0 682.667)"
								>
									<path
										d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z"
										data-original="#000000"
									/>
									<path
										d="M178 271.894 233.894 216 334 316.105"
										data-original="#000000"
									/>
								</g>
							</svg>
							<h3 className="text-xl font-semibold mb-2">
								Security
							</h3>
							<p className="text-gray-300 group-hover:text-gray-500 text-sm">
								Your data is protected by the latest security
								measures.
							</p>
						</div>
						<div className="rounded-xl group p-8 text-center hover:bg-white hover:text-purple-800 hover:shadow-xl transition duration-300">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="w-8 mb-4 inline-block"
								viewBox="0 0 512.001 512.001"
							>
								<path
									d="M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 60v15c0 8.291 6.709 15 15 15h151c8.291 0 15-6.709 15-15v-15c0-23.134-9.016-44.041-23.408-60zM144.946 460.404 68.505 307.149c-7.381-14.799-25.345-20.834-40.162-13.493l-19.979 9.897c-7.439 3.689-10.466 12.73-6.753 20.156l90 180c3.701 7.423 12.704 10.377 20.083 6.738l19.722-9.771c14.875-7.368 20.938-25.417 13.53-40.272zM499.73 247.7c-12.301-9-29.401-7.2-39.6 3.9l-82 100.8c-5.7 6-16.5 9.6-22.2 9.6h-69.901c-8.401 0-15-6.599-15-15s6.599-15 15-15h60c16.5 0 30-13.5 30-30s-13.5-30-30-30h-78.6c-7.476 0-11.204-4.741-17.1-9.901-23.209-20.885-57.949-30.947-93.119-22.795-19.528 4.526-32.697 12.415-46.053 22.993l-.445-.361-21.696 19.094L174.28 452h171.749c28.2 0 55.201-13.5 72.001-36l87.999-126c9.9-13.201 7.2-32.399-6.299-42.3z"
									data-original="#000000"
								/>
							</svg>
							<h3 className="text-xl font-semibold mb-2">
								Support
							</h3>
							<p className="text-gray-300 group-hover:text-gray-500 text-sm">
								24/7 customer support for all your inquiries.
							</p>
						</div>
						<div className="rounded-xl group p-8 text-center hover:bg-white hover:text-purple-800 hover:shadow-xl transition duration-300">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="w-8 mb-4 inline-block"
								viewBox="0 0 24 24"
							>
								<g fillRule="evenodd" clipRule="evenodd">
									<path
										d="M17.03 8.97a.75.75 0 0 1 0 1.06l-4.2 4.2a.75.75 0 0 1-1.154-.114l-1.093-1.639L8.03 15.03a.75.75 0 0 1-1.06-1.06l3.2-3.2a.75.75 0 0 1 1.154.114l1.093 1.639L15.97 8.97a.75.75 0 0 1 1.06 0z"
										data-original="#000000"
									/>
									<path
										d="M13.75 9.5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-1.25H14.5a.75.75 0 0 1-.75-.75z"
										data-original="#000000"
									/>
									<path
										d="M3.095 3.095C4.429 1.76 6.426 1.25 9 1.25h6c2.574 0 4.57.51 5.905 1.845C22.24 4.429 22.75 6.426 22.75 9v6c0 2.574-.51 4.57-1.845 5.905C19.571 22.24 17.574 22.75 15 22.75H9c-2.574 0-4.57-.51-5.905-1.845C1.76 19.571 1.25 17.574 1.25 15V9c0-2.574.51-4.57 1.845-5.905zm1.06 1.06C3.24 5.071 2.75 6.574 2.75 9v6c0 2.426.49 3.93 1.405 4.845.916.915 2.419 1.405 4.845 1.405h6c2.426 0 3.93-.49 4.845-1.405.915-.916 1.405-2.419 1.405-4.845V9c0-2.426-.49-3.93-1.405-4.845C18.929 3.24 17.426 2.75 15 2.75H9c-2.426 0-3.93.49-4.845 1.405z"
										data-original="#000000"
									/>
								</g>
							</svg>
							<h3 className="text-xl font-semibold mb-2">
								Performance
							</h3>
							<p className="text-gray-300 group-hover:text-gray-500 text-sm">
								Experience blazing-fast performance with our
								product.
							</p>
						</div>
						<div className="rounded-xl group p-8 text-center hover:bg-white hover:text-purple-800 hover:shadow-xl transition duration-300">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="w-8 mb-4 inline-block"
								viewBox="0 0 504.69 504.69"
							>
								<path
									d="M252.343 262.673c-49.32 0-89.447-40.127-89.447-89.447s40.127-89.447 89.447-89.447 89.447 40.127 89.447 89.447-40.121 89.447-89.447 89.447zm0-158.235c-37.926 0-68.787 30.861-68.787 68.787s30.861 68.787 68.787 68.787 68.787-30.861 68.787-68.787-30.855-68.787-68.787-68.787z"
									data-original="#000000"
								/>
								<path
									d="M391.787 405.309c-5.645 0-10.253-4.54-10.325-10.201-.883-70.306-58.819-127.503-129.15-127.503-49.264 0-93.543 27.405-115.561 71.52-8.724 17.473-13.269 36.31-13.517 55.988-.072 5.702-4.757 10.273-10.459 10.201s-10.273-4.757-10.201-10.459c.289-22.814 5.568-44.667 15.691-64.955 25.541-51.164 76.907-82.95 134.047-82.95 81.581 0 148.788 66.349 149.81 147.905.072 5.702-4.494 10.392-10.201 10.459-.046-.005-.087-.005-.134-.005z"
									data-original="#000000"
								/>
								<path
									d="M252.343 463.751c-116.569 0-211.408-94.834-211.408-211.408 0-116.569 94.839-211.408 211.408-211.408 116.574 0 211.408 94.839 211.408 211.408 0 116.574-94.834 211.408-211.408 211.408zm0-402.156c-105.18 0-190.748 85.568-190.748 190.748s85.568 190.748 190.748 190.748 190.748-85.568 190.748-190.748S357.523 61.595 252.343 61.595zM71.827 90.07 14.356 32.599c-4.034-4.034-4.034-10.573 0-14.607 4.029-4.034 10.573-4.034 14.607 0l57.466 57.471c4.034 4.034 3.951 10.49 0 14.607-3.792 3.951-11.039 3.698-14.602 0z"
									data-original="#000000"
								/>
								<path
									d="M14.717 92.254a10.332 10.332 0 0 1-10.299-9.653L.023 15.751a10.317 10.317 0 0 1 2.929-7.908 10.2 10.2 0 0 1 7.851-3.089L77.56 7.796c5.697.258 10.108 5.093 9.85 10.79s-5.041 10.154-10.79 9.85l-55.224-2.521 3.641 55.327c.377 5.692-3.936 10.614-9.628 10.986a7.745 7.745 0 0 1-.692.026zm403.541-2.184c-4.256-3.796-4.034-10.573 0-14.607l58.116-58.116c4.034-4.034 10.573-4.034 14.607 0s4.034 10.573 0 14.607L432.864 90.07c-4.085 3.951-9.338 4.7-14.606 0z"
									data-original="#000000"
								/>
								<path
									d="M489.974 92.254a9.85 9.85 0 0 1-.687-.021c-5.697-.372-10.01-5.294-9.633-10.986l3.641-55.327-55.224 2.515c-5.511.238-10.526-4.147-10.79-9.85-.258-5.702 4.153-10.531 9.85-10.79l66.757-3.042c2.934-.134 5.79.992 7.851 3.089s3.12 4.974 2.929 7.908l-4.401 66.85c-.361 5.465-4.896 9.654-10.293 9.654zM11.711 489.339c-3.791-4.266-4.034-10.573 0-14.607l60.115-60.11c4.029-4.034 10.578-4.034 14.607 0 4.034 4.034 4.034 10.573 0 14.607l-60.115 60.11c-3.827 3.884-11.156 3.884-14.607 0z"
									data-original="#000000"
								/>
								<path
									d="M10.327 499.947a10.33 10.33 0 0 1-7.376-3.104 10.312 10.312 0 0 1-2.929-7.902l4.401-66.85c.372-5.697 5.191-10.036 10.986-9.633 5.692.377 10.005 5.294 9.628 10.986l-3.641 55.332 55.224-2.515c5.645-.191 10.531 4.153 10.79 9.85.258 5.697-4.153 10.526-9.85 10.79l-66.763 3.037c-.155.004-.31.009-.47.009zm465.639-13.01-57.708-57.708c-4.034-4.034-4.034-10.573 0-14.607s10.573-4.034 14.607 0l57.708 57.708c4.034 4.034 3.962 10.5 0 14.607-3.817 3.951-10.062 3.951-14.607 0z"
									data-original="#000000"
								/>
								<path
									d="M494.359 499.947c-.155 0-.315-.005-.47-.01l-66.757-3.042c-5.702-.263-10.108-5.088-9.85-10.79.263-5.702 5.113-9.984 10.79-9.85l55.219 2.515-3.641-55.332c-.372-5.692 3.941-10.609 9.633-10.986 5.625-.398 10.609 3.946 10.986 9.633l4.401 66.85a10.33 10.33 0 0 1-2.929 7.902 10.323 10.323 0 0 1-7.382 3.11z"
									data-original="#000000"
								/>
							</svg>
							<h3 className="text-xl font-semibold mb-2">
								Global Reach
							</h3>
							<p className="text-gray-300 group-hover:text-gray-500 text-sm">
								Expand your reach with our global network.
							</p>
						</div>
						<div className="rounded-xl group p-8 text-center hover:bg-white hover:text-purple-800 hover:shadow-xl transition duration-300">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="w-8 mb-4 inline-block"
								viewBox="0 0 682.667 682.667"
							>
								<defs>
									<clipPath
										id="a"
										clipPathUnits="userSpaceOnUse"
									>
										<path
											d="M0 512h512V0H0Z"
											data-original="#000000"
										/>
									</clipPath>
								</defs>
								<g
									fill="none"
									stroke="currentColor"
									strokeMiterlimit="10"
									stroke-width="30"
									clipPath="url(#a)"
									transform="matrix(1.33 0 0 -1.33 0 682.667)"
								>
									<path
										d="M226 15v60c0 16.568-13.432 30-30 30H76c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45ZM466 15v60c0 16.568-13.432 30-30 30H316c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45Zm-75 167v-50.294L286 347h-60.002L166 296.706V347h-15c-41.421 0-75 33.579-75 75s33.579 75 75 75h210c41.421 0 75-33.579 75-75s-33.579-75-75-75Zm-105 75h30m-90 0h30m90 0h30"
										data-original="#000000"
									/>
								</g>
							</svg>
							<h3 className="text-xl font-semibold mb-2">
								Communication
							</h3>
							<p className="text-gray-300 group-hover:text-gray-500 text-sm">
								Seamless communication for your team.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="h-96 w-3/4 mx-auto flex flex-col items-center mt-10">
				<Carousel>
					<img src={Doom} alt="..." />
					<img src={Nintendo} alt="..." />
					<img src={Soma} alt="..." />
					<img src={Arcane} alt="..." />
					<img src={EldenRing} alt="..." />
				</Carousel>
			</div>
		</div>
	);
};

export default HomePage;
