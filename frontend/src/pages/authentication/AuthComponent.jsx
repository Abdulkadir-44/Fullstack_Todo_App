import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

//burda eğer google ile giriş işlemi başarılı olursa dönen google responsundan ilgili bilgileri ayıklayıp veritabınana istek atmamız lazım 
//daha sonra bunun kaydedilmesi lazım

const AuthComponent = () => {

  const login = useGoogleLogin({
    onSuccess: response => {
      const decoded = jwtDecode(response.credential)
      console.log(decoded);
    },
    onError: () => {
      console.log("Login failed !");
    }
  })

  return (
    <button
      className='flex justify-center items-center gap-4 px-6 py-2 w-full bg-red-700 text-white rounded-lg shadow-lg hover:bg-gray-300 hover:text-red-700 transition duration-200 ease-in-out'
      onClick={login}>
      <FontAwesomeIcon icon={faGoogle} />
      Sign in with Google
    </button>
  );
};

export default AuthComponent;
