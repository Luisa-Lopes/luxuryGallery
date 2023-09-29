import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import Photos from './pages/Photos';
import Topics from './pages/Topics';
import Favorites from './pages/Favorites';
import People from './pages/People';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Users/>} path="/users/:username"/>
            <Route element={<Photos/>} path='/photos'/>
            <Route element={<Topics/>} path='/topics/:name'/>
            <Route element={<Favorites/>} path='/favorites'/>
            <Route element={<People/>} path='/people'/>
        </Routes>
    </BrowserRouter>

);


