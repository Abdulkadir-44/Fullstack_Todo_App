import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons"
import { faCalendar, faStar as faSolidStar, faSync, faCircleExclamation, faCheckCircle, faClock, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getFormattedDate } from "../../utils/helper"
import { updateImportanceOfNote } from "../../services"
import className from "classnames"
import { toast } from "sonner"
import ModalOfDeleteNote from "../../components/Modal/ModalOfDeleteNote"
import ModalOfUpdateNote from "../Modal/ModalOfUpdateNote"
import ModalOfShowDetail from "../Modal/ModalOfShowDetail"

function getIcon(status) {
    switch (status) {
        case 'completed':
            return <span className="text-blue-700"><FontAwesomeIcon icon={faCheckCircle} /></span>
        case 'pending':
            return <span className="text-red-600"><FontAwesomeIcon icon={faClock} /></span>
        default:
            return <span className="text-yellow-600"><FontAwesomeIcon icon={faSpinner} /></span>
    }
}

//yani bir tane modal olur ve o modal task propu alır eğer task propu doluysa taskı gösterir yani

const TodosCard = ({ task, mobileTooltip = null }) => {

    const handleAddStarClick = async () => {
        try {
            const data = {
                important: !task?.important
            }
            updateImportanceOfNote(task?._id, data)
                .then(() => toast.success("Todo's star value has changed !"))
                .catch(() => toast.error("Something gone wrong !!!"));
            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className=' backdrop-blur-lg p-2 rounded-md'>
                <div>
                    <div className='flex text-white justify-between items-center'>
                        <h1 className='text-lg font-medium '>{task?.title}</h1>
                        <div className='text-sm text-blue-100 flex items-center gap-1'> <span className="text-xs select-none">{task?.priority == 'high' ? 'High' : 'Low'}</span> <FontAwesomeIcon className={className({
                            'text-yellow-600': task?.priority == "high",
                            'text-blue-600': task?.priority == "low",

                        })} icon={faCircleExclamation} /> </div>

                    </div>

                </div>
                <div className='text-sm mt-3 text-gray-400'>
                    {task?.description}
                </div>
                <div className='mt-3 flex items-center justify-between'>
                    {/* <button className='text-[15px] bg-blue-600  text-white select-none px-3 py-2 text-xs sm:text-sm rounded-md hover:bg-blue-900 hover:text-white duration-200'>Detay Gör</button> */}
                    <ModalOfShowDetail task={task} />
                    <span className='text-xs text-blue-100'>Due date , <span className='underline'>{getFormattedDate(task?.dueDate)}</span> </span>
                </div>
                <div className='flex items-center justify-between mt-4'>
                    <div>
                        {
                            mobileTooltip && (
                                <div className='relative group tooltip-wrapper'>
                                    <div>
                                        <p className="text-xs italic hover:cursor-pointer text-white select-none">status {getIcon(task?.status)}</p>
                                    </div>
                                    <div className='bg-gray-200 hidden absolute -bottom-6 left-10 w-50 py-1 px-1 rounded-md text-xs group-hover:block'>
                                        {task?.status}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='flex text-lg items-center gap-2'>
                        <div className='relative group tooltip-wrapper'>
                            <div
                                className='bg-gray-300 text-blue-800 text-sm hover:bg-blue-800 hover:text-gray-300 duration-200 rounded-md px-2 py-1 '>
                                <FontAwesomeIcon icon={faCalendar} />
                            </div>
                            <div className='bg-gray-800 hidden absolute -top-8 -left-44 w-50 py-1 px-1 rounded-md text-xs group-hover:block'>
                                <p className='text-white'>Created date , <span className='text-violet-400'>{getFormattedDate(task?.createdAt)}</span></p>
                                <p className='text-white'>Updated date , <span className='text-violet-400'>{getFormattedDate(task?.updatedAt)}</span></p>
                            </div>
                        </div>
                        <p className='w-[1px] h-4 bg-blue-100'></p>
                        <button
                            onClick={handleAddStarClick}
                            className='bg-gray-300 text-blue-800 text-sm hover:bg-blue-800 hover:text-gray-300 duration-200 rounded-md px-2 py-1 '>
                            {
                                !task?.important == true ? <FontAwesomeIcon icon={faRegularStar} /> : <FontAwesomeIcon icon={faSolidStar} />
                            }
                        </button>
                        <p className='w-[1px] h-4 bg-blue-100'></p>
                        {/* <button
                            onClick={handleDeleteClick}
                            className='bg-gray-300 text-blue-800 text-sm hover:bg-blue-800 hover:text-gray-300 duration-200 rounded-md px-2 py-1 '>
                            <FontAwesomeIcon icon={faTrash} />
                        </button> */}
                        <ModalOfDeleteNote task={task} />
                        <p className='w-[1px] h-4 bg-blue-100'></p>
                        {/* <button className='bg-gray-300 text-blue-800 text-sm hover:bg-blue-800 hover:text-gray-300 duration-200 rounded-md px-2 py-1'>
                            <FontAwesomeIcon icon={faSync} />
                        </button> */}
                        <ModalOfUpdateNote task={task} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodosCard