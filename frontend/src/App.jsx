import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import AuthLayout from './layouts/AuthLayout'
import UserLayout from './layouts/UserLayout'
import Home from './pages/public/Home'
import Login from './pages/auth/Login'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<UserLayout />}>
                        <Route index element={<Home />} />
                    </Route>

                    <Route path='/login' element={<AuthLayout />}>
                        <Route index element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App