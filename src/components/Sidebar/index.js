import React from 'react'
import './index.css'
import NavBar from '../contextProvider/context'

const SideBar = () => {
  return (
    <NavBar.Consumer>
      {value => {
        const {navstatus} = value
        let navbarStatus = navstatus ? 'collapse' : ''
        return (
          <div className={`sidebar ${navbarStatus}`}>
              <div className='userInfo'>User Ashok</div>
          </div>
        )
      }}
    </NavBar.Consumer>
  )
}

export default SideBar
