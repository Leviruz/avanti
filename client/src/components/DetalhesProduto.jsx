import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Image, Button, Spinner, Alert, InputGroup, Form } from 'react-bootstrap';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { useCart } from '../context/cartContext';
import { FaPlus, FaMinus } from "react-icons/fa";

const DetalhesProduto = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produtos/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return 'https://via.placeholder.com/300x200?text=Sem+Imagem';
        const relativePath = imagePath.replace(/^.*[\\\/]uploads[\\\/]/, '');
        return `http://localhost:3000/uploads/${relativePath}`;
    };

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
    };

    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" />
        </Container>
    );

    if (error) return (
        <Container className="mt-5">
            <Alert variant="danger">Erro ao carregar produto: {error}</Alert>
        </Container>
    );

    if (!product) return (
        <Container className="mt-5">
            <Alert variant="warning">Produto não encontrado</Alert>
        </Container>
    );

    const handleComprarAgora = () => {
        addToCart({
            ...product,
            quantity: 1 
        });
        navigate('/carrinho');
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity: quantity
        });
        alert(`${quantity} ${product.name} adicionado(s) ao carrinho!`);
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <Container className="my-5 detalhes-produto-container">
            <Row>
                <Col md={6}>
                    <Image
                        src={getImageUrl(product.images?.[selectedImageIndex])}
                        fluid
                        className="main-product-image mb-3"
                        alt={product.name}
                    />

                    <div className="thumbnail-container">
                        {product.images?.slice(0, 4).map((image, index) => (
                            <div
                                key={index}
                                className={`thumbnail-item ${index === selectedImageIndex ? 'active' : ''}`}
                                onClick={() => handleThumbnailClick(index)}
                            >
                                <Image
                                    src={getImageUrl(image)}
                                    fluid
                                    className="thumbnail-image"
                                    alt={`Miniatura ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </Col>

                <Col md={6}>
                    <h1>{product.name}</h1>
                    <h3 className="text-primary my-4">R$ {Number(product.price).toFixed(2)}</h3>
                    <p className="text-muted">{product.description}</p>

                    <div className="mb-4">
                        <label htmlFor="quantity" className="form-label">Quantidade:</label>
                        <InputGroup style={{ width: '150px' }}>
                            <Button
                                variant="outline-secondary"
                                onClick={decreaseQuantity}
                                disabled={quantity <= 1}
                            >
                                <FaMinus />
                            </Button>
                            <Form.Control
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="text-center"
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={increaseQuantity}
                            >
                                <FaPlus />
                            </Button>
                        </InputGroup>
                    </div>

                    <div className="d-flex gap-3 mt-4">
                        <Button variant="outline-primary" size="lg" className="d-flex align-items-center gap-2" onClick={handleComprarAgora}>
                            Comprar <FaPlus />
                        </Button>
                        <Button variant="outline-success" className="d-flex align-items-center gap-2" onClick={handleAddToCart}>
                            Adicionar ao Carrinho <TbShoppingCartPlus />
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DetalhesProduto;