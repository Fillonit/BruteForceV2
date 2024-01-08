"use client";

import { Footer } from "flowbite-react";

function FooterComponent() {
	return (
		<Footer container className="rounded-none">
			<div className="w-full text-center">
				<div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
					<div>
						<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
							BruteForce
						</span>
					</div>

					<Footer.LinkGroup>
						<Footer.Link href="#">About</Footer.Link>
						<Footer.Link href="#">Privacy Policy</Footer.Link>
						<Footer.Link href="#">Licensing</Footer.Link>
						<Footer.Link href="#">Contact</Footer.Link>
					</Footer.LinkGroup>
				</div>
				<Footer.Divider />
				<Footer.Copyright
					href="/"
					by="BruteForce"
					year={new Date().getFullYear()}
				/>
			</div>
		</Footer>
	);
}

export default FooterComponent;
