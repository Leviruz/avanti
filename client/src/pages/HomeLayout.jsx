import React, { useState } from 'react'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import '../app.css'

// Adicionando a funcionalidade de pesquisa no Header
const HomeLayout = () => {
  const [results, setResults] = useState([]);

// Função de busca - realiza a requisição ao backend
  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:5001/search?query=${query}`);
      const data = await response.json();
      setResults(data); // Atualiza os resultados da pesquisa
    } catch (error) {
      console.error('Erro ao buscar produto', error);
    }
  };

  return (
        <>
          {/* Header agora contém o campo de busca e envia ao termo pai */}
          <Header onSearch={handleSearch} />

          <div>
            {/* Exibição dos resultados da pesquisa */}
            {results.map((product) => (
            <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Preço: R$ {typeof product.price === 'number' ? product.price.toFixed(2) : 'Preço inválido'}</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} width="100" />}
          </div>
        ))}
        </div>
          <Outlet/> 
          <Footer/>
        </>
  );
};

export default HomeLayout;