// import Login from './components/Login';
import Home from './components/Home';
import './App.css'
import NavBar from './components/contextProvider/context';
import { useState } from 'react';

function App(){
  const [navstatus,setNavstatus] = useState(false)

  // const navStatus = () => {
  //   setNavstatus(!navstatus)
  // }
  return (
    <NavBar.Provider value={{navstatus,setNavstatus}}>
    <Home/>
    </NavBar.Provider>
  )
}
export default App;
