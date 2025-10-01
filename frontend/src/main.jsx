import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Welcome } from './pages/welcome';
import { Login } from './pages/login';
import { Register } from './pages/register';
import {NewPassword} from './pages/newPassword'
import {ReturnPassword} from './pages/returnPassword'
import { Chat } from './pages/chat';

const root = createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
       <Route path='/newpassword' element={<NewPassword/>}/>
       <Route path='/returnPassword' element={<ReturnPassword/>}/>
       <Route path='/chat' element={<Chat/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
