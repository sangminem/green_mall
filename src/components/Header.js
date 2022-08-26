import React, { Component } from 'react'
import {Button, Navbar, Container, Nav, NavDropdown, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

const Header = () => {
    return (<>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">GREEN MALL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="카테고리" id="category-nav-dropdown">
                        <NavDropdown.Item href="/category">인테리어</NavDropdown.Item>
                        <NavDropdown.Item href="/category">가구</NavDropdown.Item>                       
                        <NavDropdown.Item href="/category">식물</NavDropdown.Item>                       
                    </NavDropdown>
                    <NavDropdown title="관리자" id="admin-nav-dropdown">
                        <NavDropdown.Item href="/register">상품 등록/수정</NavDropdown.Item>
                        <NavDropdown.Item href="/">상품 조회</NavDropdown.Item>                       
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}

export default Header;