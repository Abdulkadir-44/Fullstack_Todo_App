import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  useState } from 'react'
import AllTodos from '../../components/Todos/AllTodos'
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import ModalOfAddNote from '../../components/Modal/ModalOfAddNote'

export const Todos = () => {

  const [searchTerm, setSearchTerm] = useState('')
  // const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const { tasks, loading } = useSelector(store => store.tasks)
  const isSearchActive = searchTerm && searchTerm.trim() !== '';
  const filteredTasks = isSearchActive
    ? tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : tasks;

  // const handleClickOutside = e => {
  //   if (isTooltipVisible && !e.target.closest('.tooltip-wrapper')) {
  //     setIsTooltipVisible(false)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside)
  //   }
  // }, [])


  return (
    <>
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
          <div className='py-1 px-2 flex items-center gap-2 w-[218px] md:h-[36px] h-[33px] rounded-md bg-gray-300 placeholder:text-sm text-[15px]'>
            <input
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

          {/* <button tabIndex={0} className='bg-blue-800 opacity-50 cursor-not-allowed text-white  h-[36px]  text-[15px]  px-3 py-1 rounded-md'>
            <FontAwesomeIcon icon={faSearch} />
          </button> */}
        </div>

        {/* <button tabIndex={0} className='bg-gray-300 text-blue-800  h-[36px] hover:bg-blue-800 hover:text-gray-200 text-[15px] duration-150 px-3 py-1 rounded-md'>
          <FontAwesomeIcon icon={faPlus} />
        </button> */}
        <ModalOfAddNote/>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: -20 }}
        initial={{ opacity: 0, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className='mt-8 px-5'>

        {/* Eğer loading ise "Loading..." göster */}
        {loading && <p className='bg-gray-300 font-semibold text-blue-900 shadow-custom-dark text-center w-[50%] p-3 rounded-md mx-auto mt-28'>Loading...</p>}

        {/* Eğer task yoksa "No tasks found" göster */}
        {!loading && tasks.length === 0 && <p className='bg-gray-300 font-semibold text-blue-900 shadow-custom-dark text-center w-[50%] p-3 rounded-md mx-auto mt-28'>No tasks found !!!</p>}

        {/* Eğer arama yapılmışsa ve eşleşen task yoksa "No tasks match your search" göster */}
        {!loading && isSearchActive && filteredTasks.length === 0 && (
          <p className='bg-gray-300 font-semibold text-blue-900 shadow-custom-dark text-center w-[50%] p-3 rounded-md mx-auto mt-28'>No tasks match your search !</p>
        )}

        {/* Eğer tasklar varsa taskları göster */}
        {!loading && filteredTasks.length > 0 && (
          <AllTodos tasks={filteredTasks} />
        )}
      </motion.div>
    </>
  )
}
