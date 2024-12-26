import TodosCard from '../../components/Todos/TodosCard'
import TodosTabs from '../../components/Todos/TodosTabs'

const AllTodos = ({tasks}) => {
    
    // const { tasks } = useSelector(store => store.tasks)

    return (
        <>
            <TodosTabs>
                <TodosTabs.Panel title="Pending">
                    {
                        tasks.map((task) => {
                            if (task?.status == "pending") {
                                return (
                                    <div key={task?._id} className='bg-gray-950 bg-opacity-40 rounded-md '>
                                        <TodosCard task={task} />
                                    </div>
                                )
                            }
                        })
                    }
                </TodosTabs.Panel>
                <TodosTabs.Panel title="In progress">
                    {
                        tasks.map((task) => {
                            if (task?.status == "inprogress") {
                                return (
                                    <div key={task?._id} className='bg-gray-950 bg-opacity-40 rounded-md '>
                                        <TodosCard task={task} />
                                    </div>
                                )
                            }
                        })
                    }
                </TodosTabs.Panel>
                <TodosTabs.Panel title="Completed">
                    {
                        tasks.map((task) => {
                            if (task?.status == "completed") {
                                return (
                                    <div key={task?._id} className='bg-gray-950 bg-opacity-40 rounded-md '>
                                        <TodosCard task={task} />
                                    </div>
                                )
                            }
                        })
                    }
                </TodosTabs.Panel>
            </TodosTabs>
        </>
    )
}

export default AllTodos