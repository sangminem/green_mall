import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav,  
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoCartOutline } from "react-icons/io5";
import { Tabs } from "antd";
import CategoryPage from "../pages/CategoryPage";

const Header = () => {
  return (
    <>
      <Navbar bg="light" variant="light" className="g-header">
        <Container>
          <Navbar.Brand as={Link} to="/">
            GREEN MALL
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/category/furniture">
              가구
            </Nav.Link>
            <Nav.Link as={Link} to="/category/plant">
              식물/데코
            </Nav.Link>
            <Nav.Link as={Link} to="/category/pet">
              반려동물
            </Nav.Link>
            <Nav.Link as={Link} to="/category/sale">
              SALE
            </Nav.Link>
            <Nav.Link as={Link} to="/productMng">
              상품관리
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <IoCartOutline />
            </Nav.Link>
          </Nav>       
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
