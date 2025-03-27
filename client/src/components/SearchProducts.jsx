import React, { useState } from 'react';

function SearchProducts() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5001/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar produtos..."
      />
      <button onClick={handleSearch}>Pesquisar</button>

      <div>
        {results.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
             {/* Tratamento condicional do campo "price" */}
            <p>Preço: R$ {typeof product.price === 'number' ? product.price.toFixed(2) : 'Preço inválido'}</p>     
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} width="100" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchProducts;