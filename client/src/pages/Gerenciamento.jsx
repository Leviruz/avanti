import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/img/orionbytelogo.png'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';

const Gerenciamento = () => {

  const [clientes, setClientes] = useState([]);
  const [mostrarClientes, setMostrarClientes] = useState(false);
  const [vendedores, setVendedores] = useState([]);
  const [mostrarVendedores, setMostrarVendedores] = useState(false);

  async function addCliente() {

    let nomeCliente = prompt("Digite o nome do cliente");
    let emailCliente = prompt("Digite o email do cliente");
    let enderecoCliente = prompt("Digite o endereço do cliente");
    let telefoneCliente = prompt("Digite o telefone do cliente");

    try {
      const response = await axios.post('http://localhost:3000/api/cliente', {
        name: nomeCliente,
        email: emailCliente,
        address: enderecoCliente,
        phone: telefoneCliente
      });
      alert(`Cliente criado! ID: ${response.data.id}`);
    } catch (error) {
      console.error(error);
      setMessage('Erro ao criar cliente: ' + error.response?.data?.error || error.message);
    }
  }

  async function toggleClientes() {
    if (!mostrarClientes) {
      try {
        const response = await axios.get('http://localhost:3000/api/cliente');
        setClientes(response.data);
        setMostrarClientes(true);
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar clientes: ' + (error.response?.data?.error || error.message));
      }
    } else {
      setMostrarClientes(false);
    }
  }

  async function deletarCliente(id) {
    if (window.confirm(`Tem certeza que deseja deletar o cliente de ID ${id}?`)) {
      try {
        await axios.delete(`http://localhost:3000/api/cliente/${id}`);
        alert(`Cliente ${id} deletado com sucesso!`);
        const response = await axios.get('http://localhost:3000/api/cliente');
        setClientes(response.data);
      } catch (error) {
        console.error(error);
        alert('Erro ao deletar cliente: ' + (error.response?.data?.error || error.message));
      }
    }
  }

  async function addVendedor() {
    let nomeVendedor = prompt("Digite o nome do vendedor");
    let emailVendedor = prompt("Digite o email do vendedor");
    let telefoneVendedor = prompt("Digite o telefone do vendedor");
  
    try {
      const response = await axios.post('http://localhost:3000/api/vendedor', {
        name: nomeVendedor,
        email: emailVendedor,
        phone: telefoneVendedor
      });
      alert(`Vendedor criado! ID: ${response.data.id}`);
    } catch (error) {
      console.error(error);
      alert('Erro ao criar vendedor: ' + (error.response?.data?.error || error.message));
    }
  }

  async function toggleVendedores() {
    if (!mostrarVendedores) {
      try {
        const response = await axios.get('http://localhost:3000/api/vendedor');
        setVendedores(response.data);
        setMostrarVendedores(true);
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar Vendedores: ' + (error.response?.data?.error || error.message));
      }
    } else {
      setMostrarVendedores(false);
    }
  }

  async function deletarVendedor(id) {
    if (window.confirm(`Tem certeza que deseja deletar o vendedor de ID ${id}?`)) {
      try {
        await axios.delete(`http://localhost:3000/api/vendedor/${id}`);
        alert(`Vendedor ${id} deletado com sucesso!`);
        const response = await axios.get('http://localhost:3000/api/vendedor');
        setClientes(response.data);
      } catch (error) {
        console.error(error);
        alert('Erro ao deletar vendedor: ' + (error.response?.data?.error || error.message));
      }
    }
  }

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
        <h2>Clientes</h2><br />
        <Button onClick={toggleClientes}>{mostrarClientes ? 'Ocultar Clientes' : 'Ver Clientes'}</Button><br /><br />

        {mostrarClientes && (
          <div className="div-tabela-clientes">
            <h3>Lista de Clientes:</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Endereço</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.name}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.address}</td>
                    <td>{cliente.phone}</td>
                    <td>
                      <Button variant="danger" onClick={() => deletarCliente(cliente.id)}>
                        Deletar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        <Button onClick={addCliente}>Adicionar Cliente</Button>
      </div>

      <div className="div-gerenciamento">
        <h2>Vendedores</h2><br />
        <Button onClick={toggleVendedores}>{mostrarVendedores ? 'Ocultar Vendedores' : 'Ver Vendedores'}</Button><br /><br />

        {mostrarVendedores && (
          <div className="div-tabela-vendedores">
            <h3>Lista de Vendedores:</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {vendedores.map((vendedor) => (
                  <tr key={vendedor.id}>
                    <td>{vendedor.id}</td>
                    <td>{vendedor.name}</td>
                    <td>{vendedor.email}</td>
                    <td>{vendedor.phone}</td>
                    <td>
                      <Button variant="danger" onClick={() => deletarVendedor(vendedor.id)}>
                        Deletar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        <Button onClick={addVendedor}>Adicionar Vendedor</Button>
      </div>

      <div className="div-gerenciamento">
        <h2>Produtos</h2><br />
        <Button>Ver Produtos</Button><br /><br />
        <Button>Adicionar Produto</Button>
      </div>

      <div className="div-gerenciamento">
        <h2>Vendas</h2><br />
        <Button>Ver Vendas</Button>
      </div>
    </>
  )
}

export default Gerenciamento