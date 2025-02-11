import React from 'react'
import SideBar from '../Sidebar'
import Main from '../Main'
import './index.css'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const Home = () => {
  if(Cookies.get('jwt') === undefined){
    return <Navigate to='/login' replace />
  }
  return (
    <div className='home-container'>
      <SideBar/>
      <Main/>
    </div>
  )
}

export default Home
