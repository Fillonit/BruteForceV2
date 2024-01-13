// import { API_BASE_URL } from "../../config";

("use client");

import { Sidebar } from "flowbite-react";
import {
	HiArrowSmRight,
	HiChartPie,
	HiInbox,
	HiOutlineMinusSm,
	HiOutlinePlusSm,
	HiShoppingBag,
	HiTable,
	HiUser,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

function SidebarComponent() {
	return (
		<Sidebar
			aria-label="Sidebar with multi-level dropdown example"
			className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
		>
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Sidebar.Item href="#" icon={HiChartPie}>
						Dashboard
					</Sidebar.Item>
					<Sidebar.Collapse
						icon={HiShoppingBag}
						label="E-commerce"
						renderChevronIcon={(theme, open) => {
							const IconComponent = open
								? HiOutlineMinusSm
								: HiOutlinePlusSm;

							return (
								<IconComponent
									aria-hidden
									className={twMerge(
										theme.label.icon.open[
											open ? "on" : "off"
										]
									)}
								/>
							);
						}}
					>
						<Sidebar.Item href="#">Products</Sidebar.Item>
						<Sidebar.Item href="#">Sales</Sidebar.Item>
						<Sidebar.Item href="#">Refunds</Sidebar.Item>
						<Sidebar.Item href="#">Shipping</Sidebar.Item>
					</Sidebar.Collapse>
					<Sidebar.Item href="#" icon={HiInbox}>
						Inbox
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiUser}>
						Users
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiShoppingBag}>
						Products
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiArrowSmRight}>
						Sign In
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiTable}>
						Sign Up
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
}

export default SidebarComponent;
