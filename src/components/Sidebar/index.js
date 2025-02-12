import React from 'react'
import Cookies from 'js-cookie'
import './index.css'
import NavBar from '../contextProvider/context'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate()

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
                  <p>Ashok</p>
                  <p>ashok@2025</p>
                </div>
              </div>
              <button onClick={() => clearStateRules()}>Logout</button>
          </div>
        )
      }}
    </NavBar.Consumer>
  )
}

export default SideBar
