import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/img/orionbytelogo.png'

const Gerenciamento = () => {
  return (
    <Navbar>
        <Container className="justify-content-center">
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img src={logo} height="50" className="d-inline-block align-top" />{' '}
              <h4 className="h4geren">| Gerenciamento</h4>
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Gerenciamento