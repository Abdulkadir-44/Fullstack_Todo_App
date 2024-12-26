import { motion } from "framer-motion"
import DropDownMenu from './DropDownMenu'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faDashboard, faStar, faTasks } from '@fortawesome/free-solid-svg-icons';
import DropDownProfile from "../components/DropDownProfile"

const containerVariants = {
    hidden: { opacity: 1, translateY: -120 },
    visible: {
        opacity: 1,
        translateY: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
        }
    }
}

const PanelHeader = () => {
   
    return (
        <nav className='bg-custom-image bg-cover bg-top  py-3 px-5 flex select-none items-center justify-between'>
            <motion.h3 variants={containerVariants} animate="visible" initial="hidden" className='text-gray-200 font-[500] lg:text-lg '>Note<span className='text-blue-950 text-lg lg:text-xl font-semibold'>Flow</span></motion.h3>
            <DropDownMenu />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='md:flex md:text-sm items-center gap-1 hidden'>
                <NavLink
                    to="/panel/star-tasks"
                    className={({ isActive }) =>
                        `flex items-center px-3 py-1 rounded-md duration-200  text-white gap-2 ${isActive ? 'bg-gray-800' : ""
                        }`
                    }
                >
                    <FontAwesomeIcon icon={faStar} />
                    <span>Stars</span>
                </NavLink>
                <NavLink
                    to="/panel"
                    end
                    className={({ isActive }) =>
                        `flex items-center px-3 py-1 rounded-md  duration-200 text-white gap-1  ${isActive ? 'bg-gray-800' : ""
                        }`
                    }
                >
                    <FontAwesomeIcon icon={faTasks} />
                    <span>Tasks</span>
                </NavLink>

                <NavLink
                    to="/panel/tasks-calendar"
                    className={({ isActive }) =>
                        `flex items-center px-3 py-1 rounded-md duration-200  text-white gap-2 ${isActive ? 'bg-gray-800' : ""
                        }`
                    }
                >
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>Calendar</span>
                </NavLink>

                <NavLink
                    to="/panel/my-dashboard"
                    className={({ isActive }) =>
                        `flex items-center px-3 py-1 rounded-md duration-200  text-white gap-2 ${isActive ? 'bg-gray-800' : ""
                        }`
                    }
                >
                    <FontAwesomeIcon icon={faDashboard} />
                    <span>Dashboard</span>
                </NavLink>
                <DropDownProfile/>
                
            </motion.div>
        </nav>

    )
}

export default PanelHeader