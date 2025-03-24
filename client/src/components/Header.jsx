import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../assets/img/orionbytelogo.png'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar expand="lg" className="navbar">
            <Container>
                <Navbar.Brand>
                    <Link to={"/"}>
                    <img src={logo} height="50" className="d-inline-block align-top" alt="OrionByte logo" />
                    </Link>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />  
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='m-auto nav'>
                        <Link to={"/home"} className="nav-link">Início</Link>
                        <Link to={"/vitrine"} className="nav-link">Vitrine</Link>
                        <Link to={"/carrinho"} className="nav-link">Carrinho</Link>
                    </Nav>
                    
                    <Form className="d-flex">
                        <Form.Control type="text" placeholder="Pesquisar" className="me-2" />
                        <Button type="submit" className='botao-submit'><FaSearch /></Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
