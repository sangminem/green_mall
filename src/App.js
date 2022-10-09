import React, { Component, Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { Layout, Tabs } from "antd";
import { BrowserRouter, Route, Routes, useHistory } from "react-router-dom";

import MainPage from "./pages/MainPage";
import CategoryPage from "./pages/CategoryPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import ProductMngPage from "./pages/ProductMngPage";
import Header from "./components/Header";
const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header/>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
          marginTop: 64,
        }}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/productMng" element={<ProductMngPage />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
