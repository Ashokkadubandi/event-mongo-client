import React from 'react'
import SideBar from '../Sidebar'
import Main from '../Main'
import './index.css'

const Home = () => {
  return (
    <div className='home-container'>
      <SideBar/>
      <Main/>
    </div>
  )
}

export default Home
