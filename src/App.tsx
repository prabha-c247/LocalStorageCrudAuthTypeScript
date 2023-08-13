import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './component/Users';
import Create  from './component/Create';
import Update  from './component/Update';
import LoginPage from './component/LoginPage';
import SignUp from './component/SignUp';
import UserAuth from './component/UserAuth';
// import {useState} from 'react'



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserAuth><Users/></UserAuth>} />
        <Route path="/create" element={<UserAuth><Create  /></UserAuth>} />
        <Route path='/login' element={<LoginPage />}/>        
        <Route path="/update/:id" element={<UserAuth><Update/></UserAuth>} />
        <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
