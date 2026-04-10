import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './HomePage.jsx'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const CurrentPage = pathname === '/v2' ? App : HomePage

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentPage />
  </StrictMode>,
)
