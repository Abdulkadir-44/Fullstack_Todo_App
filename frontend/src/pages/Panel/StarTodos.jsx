import { useEffect, useState } from 'react'
import TodosCard from '../../components/Todos/TodosCard'
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faTimes } from '@fortawesome/free-solid-svg-icons'

const StarTodos = () => {

  const { tasks, loading } = useSelector(store => store.tasks)
  const [searchTerm, setSearchTerm] = useState('')
  const [starTasks, setStarTasks] = useState([]);
  const isSearchActive = searchTerm && searchTerm.trim() !== '';
  const filteredTasks = isSearchActive
    ? starTasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : starTasks;

  useEffect(() => {
    const starTasks = tasks.filter(task => {
      if (task.important) {
        return true;
      }
    })
    setStarTasks(starTasks)
  }, [tasks])



  return (
    <div className='px-5'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className='flex items-center justify-between px-5 mt-4'>

        <div className='flex  items-center gap-2'>
          <div className='py-1 px-2 flex items-center gap-2 w-[218px] h-[36px] rounded-md bg-gray-300 placeholder:text-sm text-[15px]'>
            <input
              disabled={!starTasks.length}
              className='outline-none bg-transparent'
              placeholder='Todo search...'
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {
              searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className='text-red-600 hover:text-red-800 text-lg'>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )
            }
          </div>

          {/* <button tabIndex={0} className='bg-blue-800 text-white  h-[36px] hover:bg-gray-200 hover:text-blue-600 text-[15px] duration-150 px-3 py-1 rounded-md'>
            <FontAwesomeIcon icon={faSearch} />
          </button> */}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {loading && <p className='bg-gray-300 font-semibold text-blue-900 shadow-custom-dark text-center w-[50%] p-3 rounded-md mx-auto mt-28'>Loading...</p>}
        {!loading && starTasks.length === 0 && <p className='bg-gray-300 font-semibold text-blue-900 shadow-custom-dark text-center w-[50%] p-3 rounded-md mx-auto mt-28'>No star tasks found !!!</p>}
        {!loading && isSearchActive && filteredTasks.length === 0 && (
          <p className='bg-gray-300 font-semibold text-blue-900 shadow-custom-dark text-center w-[60%] md:w-[50%] p-3 rounded-md mx-auto mt-28'>No tasks match your search !</p>
        )}

        {/* Eğer tasklar varsa taskları göster */}
        {!loading && filteredTasks.length > 0 && !isSearchActive && (
          <div className=' mt-3 bg-blue-900 bg-opacity-10 p-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md '>
            {
              starTasks.map(task => (
                <div className='bg-gray-950 bg-opacity-40 shadow-custom-dark rounded-md' key={task._id}>
                  <TodosCard mobileTooltip={true} task={task} />
                </div>
              ))
            }
          </div>
        )}

        {
          !loading && filteredTasks.length > 0 && isSearchActive && (
            <div className=' mt-3 bg-blue-900 bg-opacity-10 p-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md '>
              {
                filteredTasks.map(task => (
                  <div className='bg-gray-950 bg-opacity-40 shadow-custom-dark rounded-md' key={task._id}>
                    <TodosCard test={true} task={task} />
                  </div>
                ))
              }
            </div>
          )
        }
      </motion.div>

    </div>
  )
}

export default StarTodos

/*

<div className=' mt-3 bg-blue-300  bg-opacity-10 p-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md '>
        {
          tasks.map(task => {
            if (task.important) {
              return <div className='bg-gray-950 bg-opacity-40 shadow-custom-dark rounded-md' key={task._id}>
                <TodosCard test={true} task={task} />
              </div>
            }
          })
        }
      </div>

*/