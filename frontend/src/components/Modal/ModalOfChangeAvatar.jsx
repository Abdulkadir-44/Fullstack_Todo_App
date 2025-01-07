import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange, faTimes, faCamera } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner"
import { changeAvatar, getUserInfo } from "../../services"
import { useDispatch } from "react-redux"
import { userLogin } from "../../redux/userSlice";

const avatarUrls = [
    "https://www.gravatar.com/avatar/1?d=identicon",
    "https://www.gravatar.com/avatar/2?d=monsterid",
    "https://www.gravatar.com/avatar/3?d=wavatar",
    "https://www.gravatar.com/avatar/4?d=retro",
    "https://www.gravatar.com/avatar/5?d=robohash",
    "https://www.gravatar.com/avatar/6?d=identicon",
    "https://www.gravatar.com/avatar/7?d=monsterid",
    "https://www.gravatar.com/avatar/8?d=wavatar",
    "https://www.gravatar.com/avatar/9?d=retro"
]



const ModalOfChangeAvatar = () => {

    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [avatarClick, setAvatarClick] = useState(-1)
    const [data, setData] = useState({
        avatar: ""
    })


    useEffect(() => {
        if (avatarClick !== -1) {
            setData({
                avatar: avatarUrls[avatarClick],
            });
        }
    }, [avatarClick]);

    const handleUpdateClick = async () => {

        try {
            const response = await changeAvatar(data);
            const userInfo = await getUserInfo();
            dispatch(userLogin(userInfo))
            toast.success(response.message);
            setIsOpen(false);
        } catch (error) {
            toast.error(error.message || "Error updating avatar.");
        }
    }

    const handleExitClick = () => {
        setIsOpen(false)
        setAvatarClick(-1)
    }

    return (
        <div>
            {/* Open Modal Button */}
            <button
                onClick={() => setIsOpen(true)}
            >
                <FontAwesomeIcon className='absolute bottom-1 -right-3 shadow-custom-avatar bg-opacity-50  text-sm text-white bg-green-500 p-1 rounded-full' icon={faCamera} />
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
                                        <p className="bg-gray-300 p-1 rounded-md">Change Avatar</p>
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
                                    Please choose your new avatar !!
                                </Dialog.Description>
                                <div>

                                    <div className="grid grid-cols-3 gap-4">
                                        {
                                            avatarUrls.map((avatar, id) => (
                                                <img
                                                    onClick={() => setAvatarClick(id)}
                                                    src={avatar}
                                                    alt="There isn't avatar !"
                                                    key={id}
                                                    className={`rounded-full p-2 border border-blue-800 transition-all duration-200 ${avatarClick == id ? "bg-green-700 border-none" : ""}`} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <button
                                    onClick={handleUpdateClick}
                                    className="bg-green-700  p-2  text-sm rounded-md text-white disabled:bg-gray-400 mt-4 float-end">
                                    Change
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ModalOfChangeAvatar;

