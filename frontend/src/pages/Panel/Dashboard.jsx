import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from 'react-router-dom'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useSelector } from "react-redux"
import { getFormattedDate, getCalendarStatistics, getTasksStatusCount, getTimeOfDay } from "../../utils/helper"
import classNames from "classnames"
import { motion, Reorder } from "framer-motion"
import { useState } from 'react';
import { useEffect } from "react"
import TodosCard from '../../components/Todos/TodosCard';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

//şu an bu komponentte upcoming taskleri yükleyeceğim bir state oluşturmam lazım eğer upcoming task varsa göster yoksa gösterme


const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            grid: {
                color: 'rgba(211, 211, 211, 0.1)', // X ekseninin ızgara çizgisi rengi
            },
        },
        y: {
            grid: {
                color: 'rgba(190, 190, 190, 0.1)', // Y ekseninin ızgara çizgisi rengi
            },
        },
    },
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
                color: 'white'
            },
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    let value = context.raw || '';
                    return `%${value}`;
                },
            },
        },
        datalabels: {
            color: 'rgb(211,211,211)',
            font: {
                size: 13
            },
            formatter: function (value) {
                return `%${value}`;
            },
        },
    },
};




const Dashboard = () => {

    const { user } = useSelector(store => store.user)
    const { tasks } = useSelector(store => store.tasks)
    const events = getCalendarStatistics(tasks)
    const taskCounts = getTasksStatusCount(tasks)
    const percentCompleted = Math.floor(((taskCounts?.completed / tasks.length) * 100)) || 0
    const percentInprogress = Math.floor(((taskCounts?.inprogress / tasks.length) * 100)) || 0
    const percentPending = Math.floor(((taskCounts?.pending / tasks.length) * 100)) || 0
    const [taskCardsOrder, setTaskCardsOrder] = useState([])
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const taskStatisticsCards = [
        {
            id: 1,
            title: "All task",
            value: tasks?.length,
            spanColor: "bg-purple-600",
            textColor: "text-purple-600"
        },
        {
            id: 2,
            title: "Completed",
            value: taskCounts?.completed,
            spanColor: "bg-blue-600",
            textColor: "text-blue-600"
        },
        {
            id: 3,
            title: "In progress",
            value: taskCounts?.inprogress,
            spanColor: "bg-yellow-600",
            textColor: "text-yellow-600"
        },
        {
            id: 4,
            title: "Pending",
            value: taskCounts?.pending,
            spanColor: "bg-red-600",
            textColor: "text-red-600"
        },
    ]
    const data = {
        labels: ['Completed', 'In progress', 'Pending'],
        datasets: [{
            label: 'Task Statistic',
            data: [percentCompleted || 0, percentInprogress || 0, percentPending || 0],
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(219, 0, 0, 0.6)',
            ],
            borderWidth: 0
        }]
    };

    // console.log(user);
    

    useEffect(() => {
        setTaskCardsOrder(
            taskStatisticsCards.reduce((prev, curr) => [...prev, curr.id], [])
        )
        const newUpcomingTask = tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            const currentDate = new Date();
            const timeDiff = Math.abs(currentDate - taskDate);
            const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            return dayDiff < 7
        })
        setUpcomingTasks(newUpcomingTask)
    }, [tasks])


    return (
        <>
            <section className='bg-[#2b2b35]  px-4 pt-4'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.21,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <div className='flex text-gray-200 items-center justify-between'>
                        <div className='flex items-center bg-gray-700 px-1 rounded-lg'>
                            <h1 className='lg:text-xl text-sm'>Dashboard</h1>
                            <span className='text-xs lg:text-sm ml-2 text-gray-500'>Panel / Dashboard</span>
                        </div>
                        <div className='text-xs hidden sm:block lg:text-sm text-right'>
                            <p>{getTimeOfDay()},<span className='text-blue-700'> {user?.userInfo?.fullName}</span></p>
                            <p className='mt-1'>Today&apos;s date : {getFormattedDate()}</p>
                        </div>
                    </div>
                    <div className='mt-5 text-gray-200'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <p className='lg:text-lg'>Total task</p>
                                <NavLink to="/panel">
                                    <FontAwesomeIcon className='text-xs text-gray-500' icon={faExternalLinkAlt} />
                                </NavLink>
                            </div>
                            <Reorder.Group
                                as='div'
                                axis='x'
                                values={taskCardsOrder}
                                onReorder={setTaskCardsOrder}
                                className='flex justify-between mt-3 p-1  md:p-4  bg-blue-900 rounded-lg bg-opacity-10'>
                                {
                                    taskCardsOrder.map((taskId) => (<TaskCards key={taskId} card={taskStatisticsCards.find(card => card.id === taskId)} />))
                                }
                            </Reorder.Group>

                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-10 md:h-72'>
                        <div>
                            <Bar data={data} options={options} />
                        </div>
                        <div className='hidden md:block text-xs bg-[#1D1D26] p-5 rounded-md dashboard-calendar'>
                            <FullCalendar
                                plugins={[dayGridPlugin]}
                                initialView='dayGridMonth'
                                events={events}
                                eventContent={renderEventContent}
                                height="90%"
                                aspectRatio={false}
                                headerToolbar={{
                                    left: '',
                                    center: 'title',
                                }}
                            />
                            <div className='flex mt-3 gap-7 justify-center items-center'>
                                <div className='flex justify-center items-center gap-1'>
                                    <div className='w-3 h-3 rounded-full bg-yellow-600'></div>
                                    <span className='text-white font-medium'>In progress</span>
                                </div>
                                <div className='flex justify-center items-center gap-1'>
                                    <div className='w-3 h-3 rounded-full bg-blue-600'></div>
                                    <span className='text-white font-medium'>Completed</span>
                                </div>
                                <div className='flex justify-center items-center gap-1'>
                                    <div className='w-3 h-3 rounded-full bg-red-600'></div>
                                    <span className='text-white font-medium'>Pending</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='flex items-center gap-2 text-gray-200 mt-5'>
                        <p className='lg:text-lg'>Upcoming task</p>
                        <NavLink to="/panel">
                            <FontAwesomeIcon className='text-xs text-gray-500' icon={faExternalLinkAlt} />
                        </NavLink>
                    </div>
                    {
                        upcomingTasks.length > 0 ? (
                            <div className=' mt-3 bg-blue-900 bg-opacity-10 p-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md '>
                                {
                                    upcomingTasks.map(task => (
                                        <div className='bg-gray-950 bg-opacity-40 shadow-custom-dark rounded-md' key={task._id}>
                                            <TodosCard test={true} task={task} />
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='bg-blue-900 bg-opacity-10 mt-3 rounded-md flex justify-center items-center  h-16 lg:h-24'>
                                <div className='relative group flex select-none bg-custom-image sm:w-[45%] lg:w-[30%] justify-center bg-cover bg-left  items-center gap-2 backdrop-blur-2xl text-white text-sm shadow-custom-dark px-4 py-2 rounded-md'>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    <p>There are no upcoming tasks.</p>
                                    <div className='absolute -top-12 md:-top-12 -right-20 hidden bg-[#1D1D26] p-1 text-xs rounded-md group-hover:block'>Upcoming tasks are listed here as a notification if your task has less than 1 week remaining until its due date.</div>
                                </div>

                            </div>
                        )
                    }
                </motion.div>
            </section>
        </>
    )
}

export default Dashboard

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

function TaskCards({ card }) {

    return (
        <Reorder.Item
            as='div'
            whileDrag={{ opacity: 0.5, scale: 1.1 }}
            value={card?.id}
            className='flex cursor-pointer shadow-custom-dark bg-[#1D1D26] rounded-md border border-gray-600 border-l-0 relative p-2  flex-col w-[22%] md:w-[20%] md:h-[85px] items-center justify-center'
        >

            <span className={`h-full w-1 ${card?.spanColor} absolute top-0 left-0 rounded-tl-md rounded-bl-md`}></span>
            {
                card.value ? <span className='lg:text-xl'>{card?.value}</span> : <span className='text-xs'>loading...</span>
            }
            <span className={`text-xs  lg:text-sm ${card?.textColor}`}>{card?.title}</span>

        </Reorder.Item>
    )
}


