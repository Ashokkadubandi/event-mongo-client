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
              <div className='user-info'>
                <div className='user-detail'>
                  <p>Ashok</p>
                  <p>ashok@2025</p>
                </div>
              </div>
              <button>Logout</button>
          </div>
        )
      }}
    </NavBar.Consumer>
  )
}

export default SideBar
