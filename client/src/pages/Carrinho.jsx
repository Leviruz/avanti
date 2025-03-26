import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert, Form } from 'react-bootstrap';
import { useCart } from '../context/cartContext';
import axios from 'axios';

const Carrinho = () => {
  const {
    cart: carrinho,
    removeFromCart: removerItem,
    clearCart: finalizarCompra,
    cartTotal: total,
    selectedSeller,
    setSelectedSeller
  } = useCart();

  const [mensagem, setMensagem] = useState('');
  const [sellers, setSellers] = useState([]);
  const [loadingSellers, setLoadingSellers] = useState(true);

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

  const handleFinalizarCompra = () => {
    if (!selectedSeller) {
      setMensagem('Selecione um vendedor antes de finalizar!');
      return;
    }

    finalizarCompra();
    setMensagem('Compra finalizada com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
  };

  return (
    <Container className="mt-5">
      <h2>Carrinho de Compras</h2>
      {mensagem && <Alert variant={selectedSeller ? "success" : "danger"}>{mensagem}</Alert>}

      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
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
            onClick={handleFinalizarCompra}
            disabled={!selectedSeller}
          >
            Finalizar Compra
          </Button>
        </>
      )}
    </Container>
  );
};

export default Carrinho;