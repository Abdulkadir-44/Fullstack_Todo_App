import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import ModalOfChangePassword from '../../components/Modal/ModalOfChangePassword'
import { motion } from "framer-motion"
import ModalOfChangeFullname from '../../components/Modal/ModalOfChangeFullname'
import ModalOfChangeAvatar from "../../components/Modal/ModalOfChangeAvatar"

const Profile = () => {

  const { user } = useSelector(store => store.user)
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >

      <div className="container mx-auto px-4 p-4">
        <div className='bg-blue-900 bg-opacity-10 p-4 pb-8 rounded-md'>
          <div className="bg-gray-950 py-4 bg-opacity-30  shadow-custom-dark rounded-lg px-4 ">
            <div>
              <div className="flex items-center flex-col">
                <div className='flex relative items-center'>
                  {/* <FontAwesomeIcon className='absolute right-20 shadow-custom-avatar bg-opacity-50 top-12 text-sm text-white bg-green-500 p-1 rounded-full z-50' icon={faCamera} /> */}
                  {/* https://via.placeholder.com/100 */}
                  <img
                    src={user.userInfo.avatar ? user.userInfo.avatar : "https://via.placeholder.com/100"}
                    alt="Profil Fotoğrafı"
                    className="w-24 h-24 rounded-full"
                  />
                  <ModalOfChangeAvatar />
                </div>
                <div className='mt-3'>
                  <h2 className="text-sm text-center text-gray-200 font-medium">Kullanıcı E-mail</h2>
                  <p className=" text-sm bg-gray-100 bg-opacity-60 py-1 px-2 mt-1 rounded-lg">{user.userInfo.email ? user.userInfo.email : "example@gmail.com"}</p>
                </div>
              </div>

              {/* Kişisel Bilgiler */}
              <div className="mt-6">
                <div className="grid grid-cols-1 gap-4">
                  {/* Ad Soyad Input */}
                  <div className='relative'>
                    {/* <label className="text-sm text-gray-200 mb-1 block">Ad Soyad</label> */}
                    <input
                      disabled
                      defaultValue={user.userInfo.fullName ? user.userInfo.fullName : "John Doe"}
                      type="text"
                      className="w-full p-2 border text-xs border-gray-300 bg-gray-300 rounded-md outline-none"
                    />
                    <FontAwesomeIcon className='absolute right-2 top-1/2 -translate-y-1/2 text-blue-900' icon={faUser} />
                  </div>

                  {/* Email Input */}
                  <div className='relative'>
                    {/* <label className="text-sm text-gray-200 mb-1 block">E-posta</label> */}
                    <input
                      disabled
                      defaultValue={user.userInfo.email ? user.userInfo.email : "example@gmail.com"}
                      type="email"
                      className="w-full p-2 border text-xs border-gray-100 bg-gray-300 rounded-md outline-none"
                    />
                    <FontAwesomeIcon className='absolute right-2 top-1/2 -translate-y-1/2 text-blue-900' icon={faEnvelope} />
                  </div>
                  <div className='flex items-center gap-4'>
                    <ModalOfChangePassword />
                    <ModalOfChangeFullname />
                    {/* <button className='bg-blue-700 text-white py-1 px-2 rounded-md text-sm'>Kullanıcı Adı değiştir</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  )
}

export default Profile