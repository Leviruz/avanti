import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardProduct from '../components/CardProduct';

const Vitrine = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/produtos');
        setProdutos(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Erro ao buscar produtos:', err);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) return <Container className="my-5 text-center"><p>Carregando produtos...</p></Container>;
  if (error) return <Container className="my-5 text-center text-danger"><p>Erro ao carregar produtos: {error}</p></Container>;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Nossos Produtos</h1>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {produtos.map((produto) => (
          <Col key={produto.id}>
            <CardProduct product={produto} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Vitrine;