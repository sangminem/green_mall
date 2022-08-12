import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, { Fragment } from 'react';

import Main from "./pages/Main";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Signup from './pages/Signup';

const App = () => {
  return (
    <Fragment>
      {/* <Header/> */}
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/category" element={<Category/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
        {/* <Footer/> */}
    </Fragment>
  );
}

export default App;
