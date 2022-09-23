import React, { Component, Fragment, useState } from 'react'
import {Button, Navbar, Container, Nav, NavDropdown, Row, Col} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

import Main from "./pages/Main";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Signup from './pages/Signup';
import Header from './components/Header';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/detail" element={ <Detail/> }/> 
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </Fragment>
  )
}

export default App;