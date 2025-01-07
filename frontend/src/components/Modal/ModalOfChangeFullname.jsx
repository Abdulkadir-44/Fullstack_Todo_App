import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { changeFullname, getUserInfo } from "../../services"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { userLogin, userLogout } from "../../redux/userSlice";

const ModalOfChangeFullname = () => {

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    /*Burda dikkat etmen gereken nokta backend'e gidecek olan state değerim nesne tipinde olcak string olunca hata alıyorum olmuyor diğer modal 
    komponentlerimde de bu durumda hepsi nesne şeklinde */
    const [data, setData] = useState({
        newFullName: "",
        sessionData: false
    })

    const handleExitClick = () => {
        setIsOpen(false);
        setData({
            newFullName: "",
            sessionData: false
        });
    }

    const handleChangeClick = async () => {
        try {
            const response = await changeFullname(data);
            const userInfo = await getUserInfo();
            dispatch(userLogin(userInfo))
            toast.success(response.message)
            setIsOpen(false)
            if (data.sessionData) {
                setTimeout(() => {
                    dispatch(userLogout())
                }, 2000);
            } else {
                setData({
                    newFullName: "",
                    sessionData: false
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1200);
            }
        } catch (error) {
            toast.error(error)
            console.log("error : ", error)
        }
    }

    return (
        <div>
            {/* Open Modal Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-700 text-white py-1 px-2 rounded-md text-sm"
            >
                Change Fullname
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
                                        <p className="bg-gray-300 p-1 rounded-md">Change Fullname</p>
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
                                    Please enter your new Fullname !!!
                                </Dialog.Description>
                                <div>
                                    <div className="relative ">
                                        <input
                                            value={data.newFullName}
                                            onChange={(e) => setData({ newFullName: e.target.value })}
                                            className="w-full p-2 border text-xs font-medium border-gray-300 bg-gray-300 placeholder:text-gray-700 placeholder:font-medium  rounded-md outline-none"
                                            placeholder="New Fullname"
                                            type="text" />

                                        <FontAwesomeIcon
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-900"
                                            icon={faUser} />
                                    </div>

                                    <div className="flex justify-between mt-3 items-center">
                                        <div className="flex items-center gap-1 text-sm bg-gray-300 py-1 px-2  rounded-md">
                                            <input
                                                onChange={e => setData(prev => ({
                                                    ...prev,
                                                    sessionData: e.target.checked
                                                }))}
                                                type="checkbox"
                                                name="isSessionOpen"
                                                id="isSessionOpen" />

                                            <label htmlFor="isSessionOpen">Log out ?</label>
                                        </div>
                                        <button
                                            disabled={!data.newFullName.trim()}
                                            onClick={handleChangeClick}
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

export default ModalOfChangeFullname;

