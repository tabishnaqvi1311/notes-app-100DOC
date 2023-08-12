import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import { Alert } from '@mui/material'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Alert/>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div >
      </BrowserRouter>
    </>
  )
}

export default App
