import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie'
import './index.css'

let user = {name:'',email:'',password:''}

const envUrl = process.env.REACT_APP_API_LOGURL

const apiStatus = {
    pending:'PEN',
    success:'SUC',
    failure : 'FAIL'
}

const Login = () => {

const [userData,changeUserData] = useState(user)
const [state,changeState] = useState('REG')
const [api,changeApiStatus] = useState('')
const [errorMsg,changeErrorMsg] = useState('')


const redirectPage = data => {
    Cookies.set('jwt',data.jwtToken,{expires:10})
    return <Navigate to='/' replace/>
}

const getLogApi = async () => {
    changeApiStatus(apiStatus.pending)
    changeErrorMsg('')
    const url = `${envUrl}/user/login`
    const {name,password} = userData
    const userDetail = {username:name,password}
    const opt = {
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(userDetail)
    }
    const response = await fetch(url,opt)
    const data = await response.json()
    if(response.ok === true){
        changeUserData(user)
        changeApiStatus(apiStatus.success)
        redirectPage(data)
    }
}

const getRegApi = async () => {
    // https://event-mongo-server-1.onrender.com
    changeApiStatus(apiStatus.pending)
    changeErrorMsg('')
    const url = `${envUrl}/user/register`
    const {name,email,password} = userData
    const userDetail = {username:name,email,password}
    const opt = {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userDetail)
    }
    const response = await fetch(url,opt)
    const data = await response.json()
    if(response.ok === true){
        changeState('LOG')
        changeUserData(user)
        changeApiStatus(apiStatus.success)
    }else{
        changeErrorMsg(data.mes)
        changeApiStatus(apiStatus.failure)
        changeUserData((pre) =>{
            return {...pre,name:''}
        })
    }

}


const submitFormDetails = event => {
    event.preventDefault()
    state === 'REG' ? getRegApi() : getLogApi()
    
}

const nameChange = (e) => {
    changeUserData({...userData,name:e.target.value})
}
const emailChange = (e) => {
    changeUserData({...userData,email:e.target.value})
}
const passChange = (e) => {
    changeUserData({...userData,password:e.target.value})
}

const changeStatus = data => {
    if(data === 'REG'){
        changeState('REG')
    }else if(data === 'LOG'){
        changeUserData(user)
        changeState('LOG')
    }
}

const Loader = () => (
    <ClipLoader
        color={"#000000"}
        loading={true}
        size={36}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
)

if(Cookies.get('jwt') !== undefined){
    return <Navigate to='/' replace/>
}

  return (
    <div className='login-app'>
      <form className='form-control' onSubmit={submitFormDetails}>
      <h1>Streaming<span>Events</span></h1>
        <label htmlFor='name'>Name</label>
        <input onChange={nameChange} value={userData.name} id='name' />
        {state === 'REG' && <label htmlFor='email'>Email</label>}
        {state === 'REG' && <input value={userData.email} onChange={emailChange} id='email' />}
        <label htmlFor='pass'>Password</label>
        <input value={userData.password} onChange={passChange} id='pass' />
        {api==='PEN' ? <Loader/> : <button>{state==='LOG' ? 'Login' : 'Submit'}</button>}
        <p className='error'>{errorMsg}</p>
        <div className='action-detail'>
            <p onClick={() => changeStatus('REG')}>Register</p>
            <p onClick={() => changeStatus('LOG')} className='login'>Login</p>
        </div>
      </form>
    </div>
  )
}

export default Login
