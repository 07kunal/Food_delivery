import React from 'react'
import Home from '../pages/home/Home'
import { Routes, Route } from 'react-router-dom'
import Carts from '../pages/carts/Carts'
import { ToastContainer } from "react-toastify";
import PrivateRoutes from '../component/PrivateRoutes';

import Orders from '../pages/orders/Orders'

function RouteList() {
    return (
        <div>
            <Routes>

                {/* protected routes */}
                <Route path='/carts' element={<PrivateRoutes />}>

                    <Route path='/carts' element={<Carts />} />

                </Route>
                <Route path='/orders' element={<PrivateRoutes />}>

                    <Route path='/orders' element={<Orders />} />

                </Route>
                <Route path='/' element={<Home />} />
            </Routes>
            <ToastContainer />
        </div>
    )
}

export default RouteList;