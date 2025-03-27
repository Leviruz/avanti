import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert, Form, Modal } from 'react-bootstrap';
import { useCart } from '../context/cartContext';
import axios from 'axios';
import carrinhoVazio from '../assets/img/carrinhovazio.png'

const Carrinho = () => {
  const {
    cart: carrinho,
    removeFromCart: removerItem,
    clearCart: limparCarrinho,
    cartTotal: total,
    selectedSeller,
    setSelectedSeller
  } = useCart();

  const [mensagem, setMensagem] = useState('');
  const [sellers, setSellers] = useState([]);
  const [loadingSellers, setLoadingSellers] = useState(true);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/vendedor');
        setSellers(response.data);
      } catch (error) {
        console.error("Erro ao buscar vendedores:", error);
      } finally {
        setLoadingSellers(false);
      }
    };

    fetchSellers();
  }, []);

  const handleFinalizarCompraClick = () => {
    if (!selectedSeller) {
      setMensagem('Selecione um vendedor antes de finalizar!');
      return;
    }
    setShowCustomerModal(true);
  };

  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleFinalizarCompra = async () => {
    try {
      // Criar o objeto do pedido
      const orderData = {
        sellerId: selectedSeller.id,
        customer: customerData,
        items: carrinho.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: total
      };

      // Enviar para a API
      const response = await axios.post('http://localhost:3000/api/pedidos', orderData);

      // Limpar carrinho e fechar modal
      limparCarrinho();
      setShowCustomerModal(false);
      setMensagem('Compra finalizada com sucesso!');
      setTimeout(() => setMensagem(''), 3000);
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      setMensagem('Erro ao finalizar compra: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <Container className="mt-5">
      <h2>Carrinho de Compras</h2>
      {mensagem && <Alert variant={mensagem.includes('Erro') ? "danger" : "success"}>{mensagem}</Alert>}

      {carrinho.length === 0 ? (
        <div>
          <p>O carrinho está vazio.</p>
          <img
            src={carrinhoVazio}
            className="carrinhoVazioImg"
            alt="Carrinho vazio"
          />
        </div>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Subtotal</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {carrinho.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>R$ {Number(item.price).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>R$ {(Number(item.price) * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => removerItem(item.id)}>Remover</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="mb-4 p-3 border rounded">
            <h4>Selecione o Vendedor</h4>
            {loadingSellers ? (
              <p>Carregando vendedores...</p>
            ) : (
              <Form.Group>
                <Form.Select
                  value={selectedSeller?.id || ''}
                  onChange={(e) => {
                    const sellerId = e.target.value;
                    const seller = sellers.find(s => s.id === Number(sellerId));
                    setSelectedSeller(seller);
                  }}
                  required
                >
                  <option value="">Selecione um vendedor</option>
                  {sellers.map((seller) => (
                    <option key={seller.id} value={seller.id}>
                      {seller.name} - {seller.email}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
          </div>

          <h4>Total: R$ {total.toFixed(2)}</h4>

          <Button
            variant="success"
            onClick={handleFinalizarCompraClick}
            disabled={!selectedSeller}
          >
            Finalizar Compra
          </Button>

          {/* Modal para informações do cliente */}
          <Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Informações do Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={customerData.name}
                    onChange={handleCustomerInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={customerData.email}
                    onChange={handleCustomerInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={customerData.address}
                    onChange={handleCustomerInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={customerData.phone}
                    onChange={handleCustomerInputChange}
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleFinalizarCompra}>
                Confirmar Compra
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Carrinho;