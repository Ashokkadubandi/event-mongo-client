import React, { useState } from 'react'
import Cookies from 'js-cookie'
import './index.css'
import NavBar from '../contextProvider/context'
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


const SideBar = () => {
  const navigate = useNavigate()
  const [userDetail,setUserDetail] = useState(JSON.parse(localStorage.getItem('userDetails')))

  const getLogout = () => {
    Cookies.remove('jwt')
    navigate('/login')
  }

  return (
    <NavBar.Consumer>
      {value => {
        const {navstatus,setNavstatus} = value
        let navbarStatus = navstatus ? 'collapse' : ''
        const clearStateRules = () => {
          setNavstatus(!navstatus)
          getLogout()
        }
        return (
          <div className={`sidebar ${navbarStatus}`}>
              <div className='user-info'>
                <div className='user-detail'>
                  <h4>{userDetail.name}</h4>
                  <p>{userDetail.mail}</p>
                </div>
                <FaRegUserCircle color='red' size={'3rem'}/>
              </div>
              <button onClick={() => clearStateRules()}>Logout</button>
          </div>
        )
      }}
    </NavBar.Consumer>
  )
}

export default SideBar
