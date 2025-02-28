import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { AppContext } from './context/AppContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContext>
      <RouterProvider router={router} />
    </AppContext>
  </StrictMode>,
)
