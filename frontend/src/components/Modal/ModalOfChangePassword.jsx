import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange, faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { changePassword, getUserInfo } from "../../services"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { userLogin, userLogout } from "../../redux/userSlice";

const ModalOfChangePassword = () => {
    const [showIcon, setShowIcon] = useState(false);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [sessionData, setSessionData] = useState(false)
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
    })

    const isFormValid = Object.values(data).every(value => value !== "")

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleClick = async () => {
        try {
            const response = await changePassword(data);
            const userInfo = await getUserInfo();
            dispatch(userLogin(userInfo));
            toast.success(response.message)
            setIsOpen(false)
            if (sessionData) {
                setTimeout(() => {
                    dispatch(userLogout())
                }, 2000);
            } else {
                setData({
                    newPassword: "",
                    oldPassword: ""
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleExitClick = () => {
        setIsOpen(false)
        setData({
            oldPassword: "",
            newPassword: ""
        })
    }

    return (
        <div>
            {/* Open Modal Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-700 text-white py-1 px-2 rounded-md text-sm"
            >
                Change password
            </button>

            {/* Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setIsOpen(false)}
                >
                    {/* Backdrop */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    {/* Modal Panel */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md bg-gray-100 rounded shadow-lg px-3 py-3 transform transition-all">

                                <Dialog.Title className="font-semibold text-blue-800 flex justify-between items-center mb-7 gap-3">
                                    <div className="flex items-center gap-3">
                                        <p className="bg-gray-300 p-1 rounded-md">Change Password</p>
                                        <FontAwesomeIcon icon={faExchange} className="text-blue-700" />
                                    </div>
                                    <div
                                        onClick={handleExitClick}
                                        className="float-right bg-red-600 py-1 px-3 text-white rounded-sm"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </div>
                                </Dialog.Title>

                                <Dialog.Description className="mt-2 text-sm mb-3">
                                    Please enter your old and new passwords !!!
                                </Dialog.Description>
                                <div>
                                    <div className="relative">
                                        <input
                                            value={data.oldPassword}
                                            name="oldPassword"
                                            onChange={handleChange}
                                            className="w-full p-2 border text-xs  font-medium border-gray-300 bg-gray-300 placeholder:text-gray-700 placeholder:font-medium  rounded-md outline-none"
                                            placeholder="Old password"
                                            type={showIcon ? "text" : "password"} />
                                        <FontAwesomeIcon
                                            onClick={() => setShowIcon(!showIcon)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-900"
                                            icon={showIcon ? faEye : faEyeSlash} />
                                    </div>
                                    <div className="relative mt-2">
                                        <input
                                            value={data.newPassword}
                                            name="newPassword"
                                            onChange={handleChange}
                                            className="w-full p-2 border text-xs font-medium border-gray-300 bg-gray-300 placeholder:text-gray-700 placeholder:font-medium  rounded-md outline-none"
                                            placeholder="New password"
                                            type={showIcon ? "text" : "password"} />

                                        <FontAwesomeIcon
                                            onClick={() => setShowIcon(!showIcon)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-900"
                                            icon={showIcon ? faEye : faEyeSlash} />
                                    </div>
                                    <div className="flex justify-between mt-3 items-center ">
                                        <div className="flex items-center gap-1 text-sm bg-gray-300 py-1 px-2  rounded-md">
                                            <input
                                                onChange={(e) => setSessionData(e.target.checked)}
                                                type="checkbox"
                                                name="isSessionOpen"
                                                id="isSessionOpen" />
                                            <label htmlFor="isSessionOpen">Log out  ?</label>
                                        </div>
                                        <button
                                            disabled={!isFormValid}
                                            onClick={handleClick}
                                            className="bg-green-700  py-2 px-1 text-sm rounded-md text-white disabled:bg-gray-400">
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ModalOfChangePassword;

/*
<button
                                        onClick={handleClick}
                                        className="px-4 py-2 w-20 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={handleClick}
                                        className="px-4 py-2 w-20 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                    >
                                        No
                                    </button>


*/