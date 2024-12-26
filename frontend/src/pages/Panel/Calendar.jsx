import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux"
import classNames from 'classnames'
import { getCalendarStatistics } from "../../utils/helper"
import { motion } from "framer-motion"
export default function Calendar() {

  const { tasks } = useSelector(store => store.tasks)
  const events = getCalendarStatistics(tasks);


  return (
    <div className='h-screen px-5 pt-10 '>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.21,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className='p-5 bg-[#1D1D26] h-[80%] rounded-md '>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          events={events}
          eventContent={renderEventContent}
          height="100%"
          aspectRatio={false}
          headerToolbar={{
            left: '',
            center: 'title',
          }}
        />
      </motion.div>
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  const status = eventInfo.event._def.extendedProps.status;
  const count = eventInfo.event._def.extendedProps.count

  return (
    <NavLink to="/panel" className={classNames('w-4 ml-1 text-[10px] h-4 flex justify-center items-center rounded-full', {
      'bg-blue-700': status === "completed",
      'bg-yellow-700': status === "inprogress",
      'bg-red-700': status === "pending"
    })}>+{count}</NavLink>
  );
}