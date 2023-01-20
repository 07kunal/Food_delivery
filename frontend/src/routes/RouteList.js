import React from 'react'
import Home from '../pages/home/Home'
import { Routes, Route } from 'react-router-dom'
import Carts from '../pages/carts/Carts'
import { ToastContainer } from 'react-bootstrap'



function RouteList() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                {/* protected routes */}
                <Route path='/carts' element={<Carts />} />

            </Routes>
            <ToastContainer />
        </div>
    )
}

export default RouteList;