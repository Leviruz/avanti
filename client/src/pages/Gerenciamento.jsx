import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/img/orionbytelogo.png'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Gerenciamento = () => {

  const [clientes, setClientes] = useState([]);
  const [mostrarClientes, setMostrarClientes] = useState(false);
  const [vendedores, setVendedores] = useState([]);
  const [mostrarVendedores, setMostrarVendedores] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    images: []
  });
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showVendedorModal, setShowVendedorModal] = useState(false);
  const [clienteData, setClienteData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [vendedorData, setVendedorData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [produtos, setProdutos] = useState([]);
  const [mostrarProdutos, setMostrarProdutos] = useState(false);

  async function handleAddCliente() {
    try {
      const response = await axios.post('http://localhost:3000/api/cliente', clienteData);
      alert(`Cliente criado! ID: ${response.data.id}`);
      setClienteData({ name: '', email: '', address: '', phone: '' });
      setShowClienteModal(false);

      if (mostrarClientes) {
        const response = await axios.get('http://localhost:3000/api/cliente');
        setClientes(response.data);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao criar cliente: ' + (error.response?.data?.error || error.message));
    }
  }

  function handleClienteInputChange(e) {
    const { name, value } = e.target;
    setClienteData({ ...clienteData, [name]: value });
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

  async function handleAddVendedor() {
    try {
      const response = await axios.post('http://localhost:3000/api/vendedor', vendedorData);
      alert(`Vendedor criado! ID: ${response.data.id}`);
      setVendedorData({ name: '', email: '', phone: '' });
      setShowVendedorModal(false);

      if (mostrarVendedores) {
        const response = await axios.get('http://localhost:3000/api/vendedor');
        setVendedores(response.data);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao criar vendedor: ' + (error.response?.data?.error || error.message));
    }
  }

  function handleVendedorInputChange(e) {
    const { name, value } = e.target;
    setVendedorData({ ...vendedorData, [name]: value });
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
        setVendedores(response.data);
      } catch (error) {
        console.error(error);
        alert('Erro ao deletar vendedor: ' + (error.response?.data?.error || error.message));
      }
    }
  }

  function handleProductInputChange(e) {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files).slice(0, 4);
    setProductData({ ...productData, images: files });
  }

  async function handleAddProduct() {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);

      productData.images.forEach((image) => {
        formData.append('images', image);
      });

      await axios.post('http://localhost:3000/api/produtos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Produto adicionado com sucesso!');
      setProductData({ name: '', description: '', price: '', stock: '', images: [] });
      setShowProductModal(false);

      if (mostrarProdutos) {
        const response = await axios.get('http://localhost:3000/api/produtos');
        setProdutos(response.data);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao adicionar produto: ' + (error.response?.data?.error || error.message));
    }
  }

  async function toggleProdutos() {
    if (!mostrarProdutos) {
      try {
        const response = await axios.get('http://localhost:3000/api/produtos');
        setProdutos(response.data);
        setMostrarProdutos(true);
      } catch (error) {
        console.error(error);
        alert('Erro ao buscar produtos: ' + (error.response?.data?.error || error.message));
      }
    } else {
      setMostrarProdutos(false);
    }
  }

  async function deletarProduto(id) {
    if (window.confirm(`Tem certeza que deseja deletar o produto de ID ${id}?`)) {
      try {
        await axios.delete(`http://localhost:3000/api/produtos/${id}`);
        alert(`Produto ${id} deletado com sucesso!`);
        const response = await axios.get('http://localhost:3000/api/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error(error);
        alert('Erro ao deletar produto: ' + (error.response?.data?.error || error.message));
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

        <Button onClick={() => setShowClienteModal(true)}>Adicionar Cliente</Button>

        <Modal show={showClienteModal} onHide={() => setShowClienteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Novo Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Cliente</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={clienteData.name}
                  onChange={handleClienteInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={clienteData.email}
                  onChange={handleClienteInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={clienteData.address}
                  onChange={handleClienteInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={clienteData.phone}
                  onChange={handleClienteInputChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowClienteModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAddCliente}>
              Salvar Cliente
            </Button>
          </Modal.Footer>
        </Modal>

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

        <Button onClick={() => setShowVendedorModal(true)}>Adicionar Vendedor</Button>

        <Modal show={showVendedorModal} onHide={() => setShowVendedorModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Novo Vendedor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Vendedor</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={vendedorData.name}
                  onChange={handleVendedorInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={vendedorData.email}
                  onChange={handleVendedorInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={vendedorData.phone}
                  onChange={handleVendedorInputChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowVendedorModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAddVendedor}>
              Salvar Vendedor
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="div-gerenciamento">
        <h2>Produtos</h2><br />
        <Button onClick={toggleProdutos}>
          {mostrarProdutos ? 'Ocultar Produtos' : 'Ver Produtos'}
        </Button><br /><br />

        {mostrarProdutos && (
          <div className="div-tabela-produtos">
            <h3>Lista de Produtos:</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.name}</td>
                    <td>{produto.description}</td>
                    <td>R$ {Number(produto.price).toFixed(2)}</td>
                    <td>{produto.stock}</td>
                    <td>
                      <Button variant="danger" onClick={() => deletarProduto(produto.id)}>
                        Deletar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        <Button onClick={() => setShowProductModal(true)}>Adicionar Produto</Button>
      </div>

      <Modal show={showProductModal} onHide={() => setShowProductModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Produto</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={productData.name}
                onChange={handleProductInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={productData.description}
                onChange={handleProductInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                required
                min="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade em Estoque</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={productData.stock}
                onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagens do Produto (Máx. 4)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              <Form.Text muted>
                Selecione até 4 imagens para o produto.
              </Form.Text>
              {productData.images.length > 0 && (
                <div className="mt-2">
                  <strong>Imagens selecionadas:</strong>
                  <ul>
                    {productData.images.map((img, idx) => (
                      <li key={idx}>{img.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProductModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Salvar Produto
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="div-gerenciamento">
        <h2>Vendas</h2><br />
        <Button>Ver Vendas</Button>
      </div>
    </>
  )
}

export default Gerenciamento