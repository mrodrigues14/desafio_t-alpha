import React, { useState } from 'react';
import api from '../services/api';

function ProductForm() {
    const [productData, setProductData] = useState({ name: '', description: '', price: 0, stock: 0 });

    const handleCreateProduct = async () => {
        try {
            const response = await api.createProduct(productData);
            console.log('Produto criado:', response);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
        }
    };

    return (
        <div>
            <h2>Formulário de Produto</h2>
            <input type="text" placeholder="Nome" value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} />
            <input type="text" placeholder="Descrição" value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
            <input type="number" placeholder="Preço" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
            <input type="number" placeholder="Estoque" value={productData.stock} onChange={(e) => setProductData({ ...productData, stock: e.target.value })} />
            <button onClick={handleCreateProduct}>Criar Produto</button>
        </div>
    );
}

export default ProductForm;
