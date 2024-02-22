import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
import storageService from "../services/storage-service";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
	const navigate = useNavigate();
	const logOut = () => {
		storageService.deleteUserData();
		navigate("/");
	};
	return (
		<>
		<nav className="bg-white absolute top-0 right-0 flex justify-end shadow-sm z-50 p-5 w-full h-10 bg-opacity-20 backdrop-blur-sm">
			<Menu as="div" className="relative w-20 h-full text-left">
				<div>
					<Menu.Button className="bg-[url('../man.png')] bg-[length:25px_25px] bg-center bg-no-repeat inline-flex w-12 h-12 gap-x-1 rounded-full bg-white text-sm font-semibold text-gray-900 shadow-sm border-[1px] hover:bg-gray-50 hover:border-blue-400">
						{/* <img  className="scale-100 object-cover hover:scale-105" src="../man.png" alt=""/> */}
					</Menu.Button>
				</div>

				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="py-1">
							<Menu.Item>
								{({ active }) => (
									<NavLink
										to="/panel/dashboard"
										className={classNames(
											active ? "bg-gray-100 text-gray-900" : " text-gray-700",
											"block px-4 py-2 text-sm",
										)}
									>
										Dashboard
									</NavLink>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<NavLink
										to="/panel/settings"
										className={classNames(
											active ? "bg-gray-100 text-gray-900" : "text-gray-700",
											"block px-4 py-2 text-sm",
										)}
									>
										Settings
									</NavLink>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<NavLink
										to="/panel/myresumes"
										className={classNames(
											active ? "bg-gray-100 text-gray-900" : "text-gray-700",
											"block px-4 py-2 text-sm",
										)}
									>
										My resumes
									</NavLink>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<NavLink
										to=""
										onClick={logOut}
										type="submit"
										className={classNames(
											active ? "bg-gray-100 text-gray-900" : "text-gray-700",
											"block w-full px-4 py-2 text-left text-sm",
										)}
									>
										Sign out
									</NavLink>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
			</nav>
			<Outlet />
		</>
	);
}
