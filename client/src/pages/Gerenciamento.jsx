import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/img/orionbytelogo.png'
import Button from 'react-bootstrap/Button';

const Gerenciamento = () => {
  return (
    <>
    <Navbar className="nav-geren">
        <Container className="justify-content-center">
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img src={logo} height="50" className="d-inline-block align-top" />{' '}
              <h4 className="h4geren">| Gerenciamento</h4>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className="div-gerenciamento">
        <h2>Usuários</h2><br />
        <Button>Ver Usuários</Button>
      </div>

      <div className="div-gerenciamento">
        <h2>Vendedores</h2><br />
        <Button>Ver Vendedores</Button>
      </div>

      <div className="div-gerenciamento">
        <h2>Produtos</h2><br />
        <Button>Ver Produtos</Button>
      </div>

      <div className="div-gerenciamento">
        <h2>Vendas</h2><br />
        <Button>Ver Vendas</Button>
      </div>
      </>
  )
}

export default Gerenciamento