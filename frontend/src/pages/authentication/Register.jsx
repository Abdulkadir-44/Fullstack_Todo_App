import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { motion } from "framer-motion"
import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { validateEmail } from "../../utils/helper"
import { toast } from 'sonner'
import { SignUp } from "../../services"
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



const Register = () => {

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    if (!userInfo.fullName) {
      toast.error("Please enter your fullname !")
      return;
    }
    if (!userInfo.email) {
      toast.error("Please enter an email !")
      return;
    }
    if (!validateEmail(userInfo.email)) {
      toast.error("Please enter a valid email !")
      return;
    }
    if (!userInfo.password) {
      toast.error("Please enter a password !")
    }

    //fetch işlemi
    SignUp(userInfo)
      .then(data => {
        toast.success(data.message)
        setTimeout(() => {
          navigate("/auth/login", { replace: true })
        }, 500);
      })
      .catch(error => {
        toast.error(error.message)
      })

  }

  return (
    <div className='min-h-screen bg-custom-image bg-cover bg-center flex justify-center items-center py-10 2xl:py-0'>

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
            htmlFor="fullName"
          >
            Full Name
          </motion.label>

          <input
            value={userInfo.fullName}
            onChange={e => setUserInfo({ ...userInfo, fullName: e.target.value })}
            type="text"
            name="fullName"
            id="fullName"
            className=' mt-2 bg-[#596170] mb-4 w-full px-2 py-3  rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 transition duration-200 ease-in-out' />

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
            Sign Up
          </button>

          <div className="flex items-center justify-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 ">Or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className='text-sm overflow-hidden'>
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
          </div>

          <div className='flex items-center justify-center gap-4 mt-4 '>
            Already have an account ?
            <NavLink to="/auth/login" className='text-blue-700 underline' href="#">Sign in</NavLink>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Register

/*


*/