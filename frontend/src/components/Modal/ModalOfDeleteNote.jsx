import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteOneNote } from "../../services"
import { toast } from "sonner"

const ModalOfDeleteNote = ({ task }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = async (response) => {
        try {
            if (response) {
                deleteOneNote(task?._id)
                    .then(() => toast.success("Todo deleted !"))
                    .catch(() => toast.error("Something gone wrong !!!"));
                setIsOpen(false)
                setTimeout(() => {
                    window.location.reload();
                }, 1200);
            }
            else {
                setIsOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {/* Open Modal Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-300 text-blue-800 text-sm hover:bg-blue-800 hover:text-gray-300 duration-200 rounded-md px-2 py-1"
            >
                <FontAwesomeIcon icon={faTrash} />
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
                            <Dialog.Panel className="w-full max-w-md bg-white rounded shadow-lg p-6 transform transition-all">

                                <Dialog.Description className="mt-2  ">
                                    Are you sure you want to delete the relevant todo?
                                </Dialog.Description>
                                <div className="mt-4 flex gap-16 items-center justify-center">
                                    <button
                                        onClick={() => handleClick(true)}
                                        className="px-4 py-2 w-20 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => handleClick(false)}
                                        className="px-4 py-2 w-20 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                    >
                                        No
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ModalOfDeleteNote;
