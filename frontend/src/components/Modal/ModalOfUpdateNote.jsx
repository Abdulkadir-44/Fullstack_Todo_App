import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { faSync, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateNote } from "../../services"
import { toast } from "sonner";
import { formatMongoDateForInput } from "../../utils/helper"
import { getChangedFields } from "../../utils/helper"


const ModalOfAddNote = ({ task }) => {
    const initialData = {
        title: task?.title,
        description: task?.description,
        status: task?.status,
        priority: task?.priority,
        important: task?.important,
        dueDate: formatMongoDateForInput(task?.dueDate)
    }
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(initialData)
    const [originalData] = useState(initialData)
    const changes = getChangedFields(data, originalData);

    const handleUpdateClick = async () => {
        // Todo has been added to to-do list , Something's gone wrong
        try {
            // const changes = getChangedFields();
            await updateNote(task?._id, changes).then((result) => {
                toast.success(result.message)
            }).catch((err) => {
                toast.error(err.message)
            });
            setIsOpen(false)
            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } catch (error) {
            console.log(error)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }


    return (
        <div>
            {/* Open Modal Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-300 text-blue-800 text-sm hover:bg-blue-800 hover:text-gray-300 duration-200 rounded-md px-2 py-1"
            >
                <FontAwesomeIcon icon={faSync} />
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
                            <Dialog.Panel className="w-full max-w-md bg-gray-200 rounded shadow-lg p-3 transform transition-all">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="float-end cursor-pointer bg-red-600 px-3 py-1 text-white rounded-sm">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <Dialog.Title className="md:text-lg w-full">
                                    <div className="flex flex-col w-full">
                                        <p className="pl-1 text-sm font-medium italic text-gray-600">Title</p>
                                        <input
                                            name="title"
                                            value={data.title}
                                            onChange={handleChange}
                                            placeholder="Title"
                                            className="px-2 py-2 border placeholder:text-gray-700 w-full text-black border-gray-400 rounded-lg shadow-sm placeholder:font-bold font-semibold focus:outline-none focus:ring-1  placeholder-gray-400 text-sm" type="text"
                                        />
                                    </div>
                                </Dialog.Title>

                                <Dialog.Description className="mt-2">
                                    <div>
                                        <p className="pl-1 text-sm font-medium italic text-gray-600 ">Description</p>
                                        <textarea
                                            placeholder="Description"
                                            name="description"
                                            id="description"
                                            value={data.description}
                                            onChange={handleChange}
                                            rows={5}
                                            className="px-2 border placeholder:text-gray-700 w-full py-1 resize-none outline-none text-black border-gray-400 rounded-lg shadow-sm placeholder:font-bold  focus:outline-none focus:ring-1  placeholder-gray-400 text-sm">
                                        </textarea>
                                    </div>
                                </Dialog.Description>

                                <div className="mt-2 flex justify-between items-center gap-4">
                                    <div>
                                        <label htmlFor="dueDate" className="text-sm font-semibold text-gray-700">Due date  </label>
                                        <input
                                            onChange={handleChange}
                                            value={data.dueDate}
                                            type="date"
                                            name="dueDate"
                                            id="date"
                                            className="bg-gray-300 cursor-pointer p-1 rounded-lg outline-none text-sm"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <select
                                            onChange={handleChange}
                                            name="priority"
                                            value={data.priority}
                                            className="border cursor-pointer w-full text-sm p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option className="text-sm" value="" disabled>Priority</option>
                                            <option className="text-sm" value="low">Low</option>
                                            <option className="text-sm" value="high">High</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-5">
                                    <div className="flex-1">
                                        <select
                                            onChange={handleChange}
                                            name="status"
                                            value={data.status}
                                            className="border cursor-pointer w-full text-sm p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option className="text-sm" value="" disabled>Status</option>
                                            <option className="text-sm" value="inprogress">Inprogress</option>
                                            <option className="text-sm" value="completed">Completed</option>
                                            <option className="text-sm" value="pending">Pending</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <select
                                            onChange={handleChange}
                                            name="important"
                                            value={data.important}
                                            className="border cursor-pointer w-full text-sm p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option className="text-sm" value="" disabled>Star Task</option>
                                            <option className="text-sm" value="false">False</option>
                                            <option className="text-sm" value="true">True</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        disabled={Object.keys(changes).length != 0 ? false : true}
                                        onClick={handleUpdateClick}
                                        className="mt-4 px-4 py-2 text-white bg-blue-600 rounded disabled:bg-gray-500"
                                    >
                                        Update
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

export default ModalOfAddNote;
