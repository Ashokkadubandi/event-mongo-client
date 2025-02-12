import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import './index.css'
import Loader from '../Loader/Loader'
import NavBar from '../contextProvider/context'
import { Link, useNavigate } from 'react-router-dom';

const initialList = []

const apiStatusConstants = {
  pending:'PEN',
  success:'SUC',
  filure:'Fail'
}

const envUrl = process.env.REACT_APP_API_LOGURL

const Main = () => {

  const [eventsList,updateEvents] = useState(initialList)
  const [apiStatus,setApiStatus] = useState(apiStatusConstants.pending)
  const navigate = useNavigate()

  const removeAcc = () => {
    Cookies.remove('jwt')
    navigate('/login')

  }


  const getEVents = async (prop) => {
    let query='';
    let cat='';
    if(prop !== undefined){
      switch(prop.type){
        case 'upt':
          query = 'true'
          break
        case 'upf':
          query = 'false'
          break
        case 'cat':
          if(prop.target === 'All'){
            cat = ''
          }else{
            cat = prop.target
          }
          break
        default:
          query = ''
          cat = ''
          break
      }
    }
    
    setApiStatus(apiStatusConstants.pending)
    const url = `${envUrl}/events?category=${cat}&upcoming=${query}`
    const response = await fetch(url)
    const data = await response.json()
    if(response.ok === true){
      setApiStatus(apiStatusConstants.success)
      updateEvents(data.event)
    }

  }

  useEffect(() => {
    getEVents()

  },[])

  const renderLoad = () => {
    return (
      <Loader/>
    )
  }

  const renderData = () => {
    return (
      <ul className='events-container'>
        {eventsList.map(each => {
          let {date,name,imgUrl,_id} = each
          
          date = date.split("-")
          let Modifydate = `${date[0]}-${date[1]}-${date[2].slice(0,2)}`
          return (
            <Link to={`/event/${_id}`} className='link'>
              <li key={name}>
              <img src={imgUrl} alt={`${name}`}/>
                <div className='event-content'>
                <h1 className='event-name'>{name}</h1>
                <p className='event-time'>{Modifydate}</p>
                </div>
            </li>
            </Link>
          )

        })}
      </ul>
    )
  }

  const renderFail = () => {}

  const changeFilterOption = event => {
    getEVents({type:'cat',target:event.target.value})
  }

  const renderEventsScreen = () => {
    switch(apiStatus){
      case "PEN":
        return renderLoad()
      case "SUC":
        return renderData()
      case "FAIL":
        return renderFail()
      default:
        return null
    }
  }



  return (
    <div className='main'>
      <button className='log-out' onClick={() => removeAcc()}>
        <span>Logout</span><RiLogoutCircleRLine/>
      </button>
      <NavBar.Consumer>
        {value => {
          const {navstatus,setNavstatus} = value
          return (
            <div className='mob-view'>
              {navstatus ? 
              <button onClick={() => setNavstatus(!navstatus)}>
                <IoMdClose/>
              </button>:
              <button onClick={() => setNavstatus(!navstatus)}>
                <IoMdMenu/>  
              </button>}
            </div>
          )
        }}
      </NavBar.Consumer>
      {/* <div className='event-banner'>Banner</div> */}
      <ul className='filters-list'>
        <div className='filter-btn'>
          <li onClick={() => getEVents({type:'upt'})}>
            <button>Comming soon</button>
          </li>
          <li onClick={() => getEVents({type:'upf'})}>
            <button>Past events</button>
          </li>
        </div>
        <div className='category-filters'>
          <select onChange={changeFilterOption}>
            <option>All</option>
            <option>Music</option>
            <option>Tech</option>
            <option>Gaming</option>
          </select> 
        </div>
      </ul>
      <h1>Events</h1>
      <div className='events-show-container'>
        {renderEventsScreen()}
      </div>
    </div>
  )
}

export default Main
