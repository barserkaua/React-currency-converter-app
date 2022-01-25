import { Navbar, Container, Nav } from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import React from 'react';

import './header.css';

export default function Header() {
    return (
     <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand>
                <NavLink to='/' className='brand-link'>
                    Currency Exchanger
                </NavLink>
            </Navbar.Brand>
                <Nav className="me-auto">

                    <NavLink
                        to="/converter"
                        className='nav-link-page mx-3 my-3'
                    >
                        Converter</NavLink>
            </Nav>
        </Container>
    </Navbar>
  );
}
