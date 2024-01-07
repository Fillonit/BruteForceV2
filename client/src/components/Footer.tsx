import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faTwitter,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-800 text-white py-4">
			<div className="container mx-auto flex flex-col justify-center items-center">
				<div className="flex justify-center items-center mb-4">
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						className="mr-4"
					>
						<FontAwesomeIcon
							icon={faGithub}
							className="text-white text-xl hover:text-purple-400 transition-colors duration-300"
						/>
					</a>
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						className="mr-4"
					>
						<FontAwesomeIcon
							icon={faTwitter}
							className="text-white text-xl hover:text-purple-400 transition-colors duration-300"
						/>
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon
							icon={faLinkedin}
							className="text-white text-xl hover:text-purple-400 transition-colors duration-300"
						/>
					</a>
				</div>
				<p className="text-slate-400">
					© {new Date().getFullYear()} BruteForce. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
