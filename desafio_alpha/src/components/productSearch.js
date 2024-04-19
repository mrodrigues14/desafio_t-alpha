// productSearch.js

import React, { useState } from 'react';
import api from '../services/api';

function ProductSearch() {
    const [productId, setProductId] = useState('');
    const [product, setProduct] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const handleSearchProduct = async () => {
        try {
            if (!productId || !token) {
                console.error('ID do produto ou token de autenticação não disponível');
                return;
            }

            const response = await api.getOneProduct(productId, token);
            setProduct(response);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
        }
    };

    return (
        <div>
            <h2>Buscar Produto</h2>
            <input
                type="text"
                placeholder="ID do Produto"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
            />
            <button onClick={handleSearchProduct}>Buscar</button>
            {product && (
                <div>
                    <p>ID: {product.id}</p>
                    <p>Nome: {product.name}</p>
                    <p>Descrição: {product.description}</p>
                    <p>Preço: {product.price}</p>
                </div>
            )}
        </div>
    );
}

export default ProductSearch;
