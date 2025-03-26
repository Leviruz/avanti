import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TbShoppingCartPlus } from "react-icons/tb";
import { useCart } from '../context/cartContext';

const CardProduct = ({ product }) => {

  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      ...product,
      quantity: 1
    });
  };

  const navigate = useNavigate();

  const getFirstImage = () => {
    if (product.images && product.images.length > 0) {
      const imagePath = product.images[0];
      const relativePath = imagePath.replace(/^.*[\\\/]uploads[\\\/]/, '');
      return `http://localhost:3000/uploads/${relativePath}`;
    }
    return 'https://via.placeholder.com/300x200?text=Sem+Imagem';
  };

  const handleDetailsClick = () => {
    navigate(`/produto/${product.id}`);
  };

  return (
    <Card className="h-100 product-card fixed-height-card">
      <div className="card-img-container">
        <Card.Img
          variant="top"
          src={getFirstImage()}
          alt={product.name}
          className="card-img-top"
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="flex-grow-1">
          {product.description && product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description || 'Sem descrição'}
        </Card.Text>
        <div className="mt-auto">
          <Card.Text className="fw-bold text-primary">
            R$ {Number(product.price).toFixed(2)}
          </Card.Text>
          <div className="button-group">
            <Button
              variant="outline-primary"
              onClick={handleDetailsClick}
              className="detalhes"
            >
              Ver Detalhes
            </Button>
            <Button
              variant="outline-success"
              className="cart-btn"
              title="Adicionar ao carrinho"
              onClick={handleAddToCart}
            >
              <TbShoppingCartPlus />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

CardProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    stock: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default CardProduct;