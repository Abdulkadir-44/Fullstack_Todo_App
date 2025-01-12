import AppRouter from './routes/AppRouter'
import { BrowserRouter as Router } from "react-router-dom"
import Deneme from "./components/GoogleWithLogin"
import { Toaster } from "sonner"

const App = () => {
  //fullname,email,password,

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