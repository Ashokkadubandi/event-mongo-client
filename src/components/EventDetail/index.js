import React, { useEffect, useState } from 'react'
import NavBar from '../contextProvider/context'
import { IoMdClose } from 'react-icons/io'
import { IoMdMenu } from 'react-icons/io'
import './index.css'
import { useParams } from 'react-router-dom'

let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']


const EventDetail = () => {
  const {id} = useParams()
  const [eventObj,setEventObj] = useState({})
  let modify;
  if(eventObj.name !== undefined){
    let date = eventObj.date.split("-")
    modify = `${date[0]} ${months[date[1]-1]}, ${date[2].slice(0,2)}`
  }

  const getApiData = async () => {
    let url = process.env.REACT_APP_API_LOGURL
    let res = await fetch(`${url}/events/${id}`)
    let data = await res.json()
    if(res.ok === true){
      setEventObj(data.event)
    }
  }

  useEffect(() => {
    getApiData()

  },[])

  return (
    <div className='event-main'>
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
      <div className='event-screen'>
        {eventObj === undefined ? <p>No data found</p> : 
        <>
        <img src={eventObj.imgUrl} alt={eventObj.name}/>
        <div className='text-container'>
          <h2>{eventObj.name}</h2>
          <p>{eventObj.description}</p>
          <button>
          <p className='event-d'>{modify!== undefined ? modify : ''}</p>
          </button>
        </div>
        </>}
      </div>
    </div>
  )
}

export default EventDetail
