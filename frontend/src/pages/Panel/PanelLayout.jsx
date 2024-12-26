import { Outlet } from "react-router-dom"
import { getAllTasks } from "../../services"
import { useDispatch } from "react-redux"
import { setAllTasks, setError, setLoading } from "../../redux/taskSlice"
import { useEffect } from 'react';
import PanelHeader from '../../components/PanelHeader';




const PanelLayout = () => {

    // const { tasks } = useSelector(store => store.tasks)
    const dispatch = useDispatch()

    //ilk başta db'den çektik ve reduxa attık daha sonra redux içinde http istekleri atsak nasıl olur
    useEffect(() => {
        dispatch(setLoading())
        getAllTasks().then(data => {
            dispatch(setAllTasks(data.notes))
        }).catch(err =>{
            dispatch(setError(err))
            console.log(err)
        })
    }, [])


    return (
        <div className='min-h-screen bg-[#2b2b35] pb-3'>
            <PanelHeader />
            <Outlet />
        </div>
    )
}

export default PanelLayout
