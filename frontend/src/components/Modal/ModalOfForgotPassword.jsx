import { motion } from "framer-motion"
import { useState } from "react"
import { forgotPassword } from "../../services"

const ModalOfForgotPassword = ({ isOpen, onClose }) => {

    if (!isOpen) return null

    
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            setError('')
            setMessage('')
            const response = await forgotPassword(email);
            setMessage(response.message)

            setTimeout(() => {
                onClose()
            }, 2000)

        } catch (error) {
            setError(error.message)

        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1F1F26] p-6 rounded-lg w-[90%] max-w-md"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white text-lg font-semibold">Şifre Sıfırlama</h3>
                    <button
                        onClick={onClose}
                        className="text-white  bg-red-500 px-2 py-1 rounded-md"
                    >
                        ✕
                    </button>
                </div>

                <p className="text-gray-300 text-sm mb-4">
                    Şifrenizi sıfırlamak için e-posta adresinizi girin. Size sıfırlama bağlantısı göndereceğiz.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-white text-xs italic" htmlFor="reset-email">
                            E-posta
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="reset-email"
                            className="mt-2 bg-[#596170] w-full px-2 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 transition duration-200 ease-in-out text-white"
                            placeholder="ornek@email.com"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600">{error}</div>
                    )}

                    {message && (
                        <div className="text-sm text-green-600">{message}</div>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-3 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                        >
                            İptal
                        </button>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:bg-blue-700 transition duration-200"
                        >
                            {isLoading ? 'Gönderiliyor...' : 'Sıfırlama Linki Gönder'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default ModalOfForgotPassword 