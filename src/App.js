import Login from './components/Login';
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import './App.css'
import NavBar from './components/contextProvider/context';
import { useState } from 'react';
import Events from './components/Events';


function App(){
  const [navstatus,setNavstatus] = useState(false)

  // const navStatus = () => {
  //   setNavstatus(!navstatus)
  // }
  return (
    <NavBar.Provider value={{navstatus,setNavstatus}}>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/event/:id' element={<Events/>}/>
      </Routes>
    </NavBar.Provider>
  )
}
export default App;
