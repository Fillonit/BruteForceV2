// import { API_BASE_URL } from "../../config";

("use client");

import { Sidebar } from "flowbite-react";
import { HiChartPie, HiInbox, HiShoppingBag, HiUser } from "react-icons/hi";
import iconDark from "../../assets/iconDark.png";
// import { twMerge } from "tailwind-merge";

function SidebarComponent() {
	return (
		<Sidebar
			aria-label="Sidebar with multi-level dropdown example"
			className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
		>
			<Sidebar.Logo href="#" img={iconDark} imgAlt="Brute Force logo">
				BruteForce
			</Sidebar.Logo>
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Sidebar.Item href="#" icon={HiChartPie}>
						Dashboard
					</Sidebar.Item>
					<Sidebar.Item href="/dashboard/users" icon={HiUser}>
						Users
					</Sidebar.Item>
					<Sidebar.Item href="/dashboard/posts" icon={HiInbox}>
						Posts
					</Sidebar.Item>
					<Sidebar.Item href="/dashboard/games" icon={HiShoppingBag}>
						Games
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiShoppingBag}>
						Contancts
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
}

export default SidebarComponent;
