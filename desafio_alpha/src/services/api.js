// services/api.js

const BASE_URL = 'https://interview.t-alpha.com.br';

const api = {
    login: async (credentials) => {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(`${BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return response.json();
    },

    getAllProducts: async () => {
        const response = await fetch(`${BASE_URL}/api/products/get-all-products`);
        return response.json();
    },

    getOneProduct: async (id) => {
        const response = await fetch(`${BASE_URL}/api/products/get-one-product/${id}`);
        return response.json();
    },

    createProduct: async (productData) => {
        const response = await fetch(`${BASE_URL}/api/products/create-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        return response.json();
    },

    updateProduct: async (id, productData) => {
        const response = await fetch(`${BASE_URL}/api/products/update-product/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        return response.json();
    },

    deleteProduct: async (id) => {
        const response = await fetch(`${BASE_URL}/api/products/delete-product/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },
};

export default api;
