import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StorecontextProvider from './context/StoreContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <StorecontextProvider>
      <App />
    </StorecontextProvider>
  </StrictMode>,
)
