import React from 'react'
import Home from '../pages/home/Home'
import { Routes, Route } from 'react-router-dom'
import Carts from '../pages/carts/Carts'
import { ToastContainer } from "react-toastify";
import PrivateRoutes from '../component/PrivateRoutes';



function RouteList() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                {/* protected routes */}
                <Route path='/carts' element={<PrivateRoutes />}>

                    <Route path='/carts' element={<Carts />} />

                </Route>
            </Routes>
            <ToastContainer />
        </div>
    )
}

export default RouteList;