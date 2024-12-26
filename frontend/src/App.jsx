import AppRouter from './routes/AppRouter'
import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from "sonner"
import Modal from "./components/Modal/ModalOfAddNote"
const App = () => {


  return (
     <Router>
       <Toaster
         duration={1500}
         position='top-center'
         className='mt-8'
         richColors />
       <AppRouter />
     </Router>
    
  )
}

export default App