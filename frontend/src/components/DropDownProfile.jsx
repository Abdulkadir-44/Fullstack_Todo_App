import { Menu, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userLogout } from "../redux/userSlice"


export default function DropDownProfile() {

    const dispatch = useDispatch()
    const menuRef = useRef(null); // Ref'i `div` üzerine ekledim.

    const handleClick = () => {
        dispatch(userLogout())
    };



    return (
        <div ref={menuRef}>
            <Menu as="div" className="relative hidden md:inline-block text-left  z-10 outline-none">
                <div>
                    <Menu.Button className="inline-flex outline-none w-full justify-center rounded-md  hover:bg-gray-800 duration-150  px-3 py-2 text-sm  text-white">
                        <FontAwesomeIcon icon={faUser} />
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
                        <div className="px-1 py-1  ">
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink
                                        to="/panel/profile"
                                        className={`${active ? 'bg-blue-800 text-white' : 'text-gray-100'} gap-3 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <FontAwesomeIcon icon={faUser} className='text-base' />
                                        Profile
                                    </NavLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <NavLink
                                        onClick={handleClick}
                                        className={`${active ? 'bg-blue-800 text-white' : 'text-gray-100'} gap-3 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <FontAwesomeIcon icon={faSignOut} className='text-base' />
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
