// productList.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function ProductList() {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");

    const fetchProducts = async () => {
        try {
            if (!token) {
                console.error('Token de autenticação não disponível');
                return;
            }
            const response = await api.getAllProducts(token);
            setProducts(response);
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
        }
    };

    const handleGetProducts = async () => {
        try {
            await fetchProducts();
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            if (!token) {
                console.error('Token de autenticação não disponível');
                return;
            }
            await api.deleteProduct(id, token);
            await fetchProducts();
            console.log('Produto deletado com sucesso');
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Produtos</h2>
            <button onClick={handleGetProducts}>Listar Todos os Produtos</button>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                        <button onClick={() => handleDeleteProduct(product.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
            <Link to="/products/add">Cadastrar Produto</Link>
            <Link to="/products/search">Buscar Produto</Link>
        </div>
    );
}

export default ProductList;
