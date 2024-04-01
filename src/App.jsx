import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './component/Register'
import Login from './component/Login'
import NotFound from './component/NotFound'
import Food from './component/Food'
import Private from './component/Private'
import Diet from './component/Diet'

import { UserContext } from './context/UserContext'
import { useEffect, useState } from 'react'


function App() 
{

  // ------------------Variables------------------

  const [loggedUser,setLoggedUser] = useState(JSON.parse(localStorage.getItem("app-user")));

  return (
    <>

      <UserContext.Provider value={{loggedUser, setLoggedUser}}>

        <BrowserRouter>
        
            <Routes>

                <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/food' element={< Private Component={Food}/>}/>
                <Route path='/diet' element={< Private Component={Diet}/>}/>
                <Route path='/*' element={<NotFound/>}/>

            </Routes>
        
        </BrowserRouter>

      </UserContext.Provider>    

    </>
  )
}

export default App
