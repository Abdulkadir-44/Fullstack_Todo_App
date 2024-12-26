import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendar, faDashboard, faSignOut, faStar, faTasks, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userLogout } from "../redux/userSlice"


export default function DropDownMenu() {

    const [toggle, setToggle] = useState(true);
    const dispatch = useDispatch()
    const menuRef = useRef(null); // Ref'i `div` üzerine ekledim.

    const handleClick = (value) => {
        setToggle(prev => !prev);
        if (value === "exit") {
            dispatch(userLogout())
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setToggle(true);  // Menünün dışına tıklanınca menüyü kapatır.
            }
            if (event.key === "Escape") {
                setToggle(true)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside)
        document.addEventListener("keyup", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keyup", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef}>
            <Menu as="div" className="relative inline-block text-left md:hidden z-10 outline-none">
                <div>
                    <Menu.Button onClick={handleClick} className="inline-flex outline-none w-full justify-center rounded-md bg-gray-300  px-4 py-2 text-sm font-medium duration-200 text-blue-900 hover:bg-blue-900 hover:text-gray-300">
                        {toggle ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faTimes} />}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-36  origin-top-right divide-y divide-gray-100 rounded-md bg-[#1D1D26]  shadow-lg ring-1  ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink
                                        to="/panel"
                                        onClick={handleClick}
                                        className={`${active ? 'bg-blue-800 text-white' : 'text-gray-100'} gap-3 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <FontAwesomeIcon icon={faTasks} className='text-base' />
                                        Tasks
                                    </NavLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink
                                        to="/panel/my-dashboard"
                                        onClick={handleClick}
                                        className={`${active ? 'bg-blue-800 text-white' : 'text-gray-100'} gap-3 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <FontAwesomeIcon icon={faDashboard} className='text-base' />
                                        Dashboard
                                    </NavLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink
                                        to="/panel/tasks-calendar"
                                        onClick={handleClick}
                                        className={`${active ? 'bg-blue-800 text-white' : 'text-gray-100'} gap-3 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <FontAwesomeIcon icon={faCalendar} className='text-base' />
                                        Calendar
                                    </NavLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink
                                        to="/panel/star-tasks"
                                        onClick={handleClick}
                                        className={`${active ? 'bg-blue-800 text-white' : 'text-gray-100'}  group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3`}
                                    >
                                        <FontAwesomeIcon className='text-lg' icon={faStar} />
                                        Stars
                                    </NavLink>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">

                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink
                                        to="/panel/profile"
                                        onClick={handleClick}
                                        className={`${active ? 'bg-blue-800 text-white' : 'text-gray-100'}  group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3`}
                                    >
                                        <FontAwesomeIcon className='text-lg' icon={faUser} />
                                        Profile
                                    </NavLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink
                                        onClick={() => handleClick("exit")}
                                        className={`${active ? 'bg-blue-800 text-white' : 'text-gray-100'}  group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3`}
                                    >
                                        <FontAwesomeIcon className='text-lg' icon={faSignOut} />
                                        Exit
                                    </NavLink>
                                )}
                            </Menu.Item>
                        </div>

                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
