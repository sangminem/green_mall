import React, { Component } from 'react'
import {Button, Navbar, Container, Nav, NavDropdown, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

const Header = () => {
    return (<>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>GREEN MALL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link>Home</Nav.Link>
                    <NavDropdown title="카테고리" id="category-nav-dropdown">
                        <Link to="/category/interior">인테리어</Link>
                        <Link to="/category/furniture">가구</Link>
                        <Link to="/category/plant">식물</Link>
                        {/* <NavDropdown.Item><Link to="/category">인테리어</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to="/category/furniture">가구</Link></NavDropdown.Item>                       
                        <NavDropdown.Item><Link to="/category">식물</Link></NavDropdown.Item>                        */}
                    </NavDropdown>
                    <NavDropdown title="관리자" id="admin-nav-dropdown">
                        <NavDropdown.Item>상품 등록/수정</NavDropdown.Item>
                        <NavDropdown.Item>상품 조회</NavDropdown.Item>                       
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}

export default Header;