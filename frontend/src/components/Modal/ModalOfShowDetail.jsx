import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMongoDateForInput } from "../../utils/helper"


const ModalOfShowDetail = ({ task }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Open Modal Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="text-[15px] bg-blue-600  text-white select-none px-3 py-2 text-xs sm:text-sm rounded-md hover:bg-blue-900 hover:text-white duration-200"
            >
                Detay Gör
            </button>

            {/* Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50 "
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
                        <div className="fixed inset-0 bg-black bg-opacity-50 md:bg-opacity-60" />
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
                            <Dialog.Panel className="w-full max-w-md bg-gray-200 rounded shadow-lg p-6 transform transition-all">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="float-end cursor-pointer bg-red-600 px-3 py-1 mb-3 text-white rounded-sm">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <Dialog.Title className="md:text-lg w-full">
                                    <input
                                        readOnly
                                        name="title"
                                        id="title"
                                        defaultValue={task?.title}
                                        placeholder="Title"
                                        className="px-2 py-2 border placeholder:text-gray-700 w-full text-black border-gray-400 rounded-lg shadow-sm placeholder:font-bold font-semibold focus:outline-none focus:ring-1  placeholder-gray-400 text-sm" type="text"
                                    />
                                </Dialog.Title>

                                <Dialog.Description className="mt-2">
                                    <textarea
                                        readOnly
                                        placeholder="Description"
                                        name="description"
                                        id="description"
                                        defaultValue={task?.description}
                                        rows={5}
                                        className="px-2 placeholder:text-gray-700 w-full py-1 resize-none outline-none text-black border-gray-400 rounded-lg shadow-sm placeholder:font-bold  focus:outline-none focus:ring-1  placeholder-gray-400 text-sm">
                                    </textarea>
                                </Dialog.Description>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="dueDate" className="text-sm font-semibold text-gray-700 mr-2">Due date  </label>
                                        <input
                                            readOnly
                                            defaultValue={formatMongoDateForInput(task?.dueDate)}
                                            type="date"
                                            name="dueDate"
                                            id="date"
                                            className="bg-gray-300 p-1 rounded-lg outline-none text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    bunun içine gelecek
                                </div>
                                {/* <div className="flex gap-4 mt-5">
                                    <div className="flex-1">
                                        <select
                                            disabled
                                            name="status"
                                            defaultValue={task?.status}
                                            className="border  w-full text-sm p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option className="text-sm" value="" disabled>Status</option>
                                            <option className="text-sm" value="inprogress">Inprogress</option>
                                            <option className="text-sm" value="completed">Completed</option>
                                            <option className="text-sm" value="pending">Pending</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <select
                                            disabled
                                            name="important"
                                            defaultValue={task?.important}
                                            className="border  w-full text-sm p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option className="text-sm" value="" disabled>Star Task</option>
                                            <option className="text-sm" value="false">False</option>
                                            <option className="text-sm" value="true">True</option>
                                        </select>
                                    </div>
                                </div> */}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ModalOfShowDetail;
