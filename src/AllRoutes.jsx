import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './Page/LoginPage'
import HomePage from './Page/HomePage'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/" replace />
    }

    return children
}

const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route
                    path='/dashboard'
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes
