// ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.getOneProduct(id);
                setProduct(response);
            } catch (error) {
                console.error('Erro ao obter detalhes do produto:', error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div>
            <h2>Detalhes do Produto</h2>
            {product ? (
                <div>
                    <p>ID: {product.id}</p>
                    <p>Nome: {product.name}</p>
                    <p>Descrição: {product.description}</p>
                    <p>Preço: {product.price}</p>
                </div>
            ) : (
                <p>Carregando detalhes do produto...</p>
            )}
        </div>
    );
}

export default ProductDetail;
