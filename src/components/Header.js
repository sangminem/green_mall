import React, { Component } from 'react'
import {Button, Navbar, Container, Nav, NavDropdown, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

const Header = () => {
    return (<>
        {/* <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>GREEN MALL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link>Home</Nav.Link>
                    <NavDropdown title="카테고리" id="category-nav-dropdown">
                        <Nav.Item>
                          <Link to="/category/interior">인테리어</Link>
                        </Nav.Item>
                        <Link to="/category/furniture">가구</Link>
                        <Link to="/category/plant">식물</Link>
                    </NavDropdown>
                    <NavDropdown title="관리자" id="admin-nav-dropdown">
                        <NavDropdown.Item>상품 등록/수정</NavDropdown.Item>
                        <NavDropdown.Item>상품 조회</NavDropdown.Item>                       
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> */}
        <Navbar bg="light" variant="light">
            <Container>
            <Navbar.Brand as={Link} to="/">GREEN MALL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/category/interior">인테리어</Nav.Link>
                <Nav.Link as={Link} to="/category/furniture">가구</Nav.Link>
                <Nav.Link as={Link} to="/category/plant">식물/데코</Nav.Link>
                <Nav.Link as={Link} to="/productMng">상품관리</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    </>)
}

export default Header;