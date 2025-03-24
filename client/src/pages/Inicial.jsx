import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/img/orionbytelogo.png'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Gerenciamento = () => {
  return (
    <>
      <Navbar>
        <Container className="justify-content-center">
          <Navbar.Brand href="#home">
            <img src={logo} height="50" className="d-inline-block align-top" />{' '}
            <h4 className="h4geren"></h4>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className="container-inicio">
        <div className="d-flex flex-column gap-2 mb-2">
          <Button className="button-inicio" size="lg">
            <Link to={"/gerenciamento"} className="text-decoration-none text-white">Gerenciar Loja</Link>
          </Button>
          <br/>
          <Button className="button-inicio" size="lg">
            <Link to={"home"} className="text-decoration-none text-white">Comprar Produtos</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Gerenciamento