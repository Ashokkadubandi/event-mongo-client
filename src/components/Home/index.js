import React from 'react'
import SideBar from '../Sidebar'
import Main from '../Main'
import './index.css'
import Cookies from 'js-cookie'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import EventDetail from '../EventDetail'
// import {jwtDecode} from 'jwt-decode'


const Home = (props) => {
  const path = useLocation()
  const {id} = useParams()
  if(Cookies.get('jwt') === undefined){
    return <Navigate to='/login' replace />
  }

  return (
    <div className='home-container'>
      <SideBar/>
      {path.pathname === `/event/${id}` ? <EventDetail/> : <Main/>}
    </div>
  )
}

export default Home
