import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardProduct from '../components/CardProduct';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carrossel from '../components/Carrossel'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/produtos');
        const firstEightProducts = response.data.slice(0, 8);
        setProducts(firstEightProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Carregando produtos...</div>;
  if (error) return <div>Erro ao carregar produtos: {error}</div>;

  const novidades = products.slice(0, 4);
  const promocoes = products.slice(4, 8);

  return (
    <>
    <Carrossel />
    <Container className="my-4"><br />
      <h2 className="mb-4">Queridinhos da Galera</h2><br />
      <Row xs={1} md={2} lg={4} className="g-4 mb-5">
        {novidades.map((product) => (
          <Col key={product.id}>
            <CardProduct product={product} />
          </Col>
        ))}
      </Row>
      <br />
      <h2 className="mb-4">Novidades da Semana</h2><br />
      <Row xs={1} md={2} lg={4} className="g-4">
        {promocoes.map((product) => (
          <Col key={product.id}>
            <CardProduct product={product} />
          </Col>
        ))}
      </Row>
    </Container><br /><br />
    </>
  );
};

export default Home;