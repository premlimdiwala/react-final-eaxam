import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AddTask from './assets/pages/AddTask'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowTask from './assets/pages/ShowTask';
import Header from './assets/pages/Header';


function App() {
  

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<ShowTask/>}></Route>
      <Route path='/Addtask' element={<AddTask/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
