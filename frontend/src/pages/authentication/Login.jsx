import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { motion } from "framer-motion"
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { userLogin } from "../../redux/userSlice"
import { validateEmail } from "../../utils/helper"
import { toast } from 'sonner'
import { login } from "../../services"
import AuthComponent from "./AuthComponent"

const outDivVariants = {
  hidden: {
    opacity: 0,
    y: -250
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
}

const labelVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2
    }
  }
}

const headerVariants = {
  hidden: {
    opacity: 0,
    x: -100
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.3
    }
  }
}

const Login = () => {

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!userInfo.email) {
        toast.error("Please enter your email !")
        return;
      }
      if (!validateEmail(userInfo.email)) {
        toast.error("Please enter a valid email !")
        return;
      }

      if (!userInfo.password) {
        toast.error("Please enter your password !")
        return;
      }

      login(userInfo).then(data => {
        dispatch(userLogin(data))
        navigate("/panel", { replace: true })
        toast.success(`Welcome to NoteFlow ${data.userInfo.fullName}`)
      }).catch(err => {
        toast.error(err.message)
      })

    } catch (err) {
      toast.error("Server error,Please try again later.")
    }
  }




  return (
    <div className='min-h-screen bg-custom-image bg-cover bg-top flex justify-center items-center py-10 2xl:py-0 '>
      <motion.div
        variants={outDivVariants}
        initial='hidden'
        animate='visible'
        className=' bg-[#1F1F26]  w-[70%] sm:w-[50%] lg:w-[40%] xl:w-[35%] h-auto px-5 py-5 rounded-lg shadow-custom-dark'>
        <div className='text-center mb-6'>
          <motion.h2
            variants={headerVariants}
            className='text-white text-base'
          >
            Welcome to
            <span className='text-lg lg:text-xl text-blue-900 ml-2 font-semibold '>NoteFlow !</span>
          </motion.h2>
        </div>
        <form onSubmit={handleSubmit} className='text-white text-xs'>
          <motion.label
            variants={labelVariants}
            className='italic'
            htmlFor="email"
          >
            Email
          </motion.label>

          <input
            value={userInfo.email}
            onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
            type="text"
            name="emal"
            id="email"
            className=' mt-2 bg-[#596170] mb-4 w-full px-2 py-3  rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 transition duration-200 ease-in-out' />

          <motion.label
            variants={labelVariants}
            className='italic' htmlFor="password"
          >
            Password
          </motion.label>

          <input
            value={userInfo.password}
            onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
            type="password"
            name="password"
            id="password"
            className=' mt-2 bg-[#596170] mb-4 w-full px-2 py-3  rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 transition duration-200 ease-in-out' />

          <button
            type='submit'
            className='px-6 py-3 w-full bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700  transition duration-200 ease-in-out'
          >
            Log in
          </button>

          <div className="flex items-center justify-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 ">Or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <div className='text-sm'>
            {/* <button
              className='flex justify-center items-center gap-4 px-6 py-2 w-full bg-red-700 text-white rounded-lg shadow-lg hover:bg-gray-300 hover:text-red-700 transition duration-200 ease-in-out'
            >
              <FontAwesomeIcon icon={faGoogle} />
              Sign in with Google
            </button> */}
            <AuthComponent/>
            <button
              className='mt-3 flex justify-center items-center gap-4 px-6 py-2 w-full bg-blue-900 text-gray-200 rounded-lg shadow-lg hover:bg-gray-200 hover:text-blue-700 transition duration-200 ease-in-out'
            >
              <FontAwesomeIcon icon={faFacebook} />
              Sign in with Facebook
            </button>
            <button
              className='mt-3 flex justify-center items-center gap-4 px-6 py-2 w-full bg-green-800 text-white rounded-lg shadow-lg hover:bg-gray-300 hover:text-green-800 transition duration-200 ease-in-out'
            >
              <FontAwesomeIcon icon={faGithub} />
              Sign in with Github
            </button>
            {/* <AuthComponent /> */}
          </div>
          <div className='flex items-center justify-center gap-4 mt-4 '>
            Already have not an account ?
            <NavLink to="/auth/sign-up" className='text-blue-700 underline' href="#">Sign up</NavLink>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login

/*


<div className='text-sm'>
            <button
              className='flex justify-center items-center gap-4 px-6 py-2 w-full bg-red-700 text-white rounded-lg shadow-lg hover:bg-gray-300 hover:text-red-700 transition duration-200 ease-in-out'
            >
              <FontAwesomeIcon icon={faGoogle} />
              Sign In with Google
            </button>
            <button
              className='mt-3 flex justify-center items-center gap-4 px-6 py-2 w-full bg-blue-900 text-gray-200 rounded-lg shadow-lg hover:bg-gray-200 hover:text-blue-700 transition duration-200 ease-in-out'
            >
              <FontAwesomeIcon icon={faFacebook} />
              Sign In with Facebook
            </button>
            <button
              className='mt-3 flex justify-center items-center gap-4 px-6 py-2 w-full bg-green-800 text-white rounded-lg shadow-lg hover:bg-gray-300 hover:text-green-800 transition duration-200 ease-in-out'
            >
              <FontAwesomeIcon icon={faGithub} />
              Sign In with Google
            </button>
          </div>

*/