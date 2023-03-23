import React, { useContext, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';


export default function AllRoutes() {
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="*" element={<Home />} />
        </Routes>
    )
}