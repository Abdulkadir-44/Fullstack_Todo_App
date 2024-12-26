import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store } from "./redux/store.js"
import { Provider } from "react-redux"
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'


createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
)
