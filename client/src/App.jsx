import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Login from './components/Login'

function App() {

  const {showLogin} =useContext(AppContext);
  return (
    <>
      {showLogin  && <Login/>}
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default App
