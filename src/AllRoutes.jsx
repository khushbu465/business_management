import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Page/LoginPage'
import HomePage from './Page/HomePage'

const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/dashboard' element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes
