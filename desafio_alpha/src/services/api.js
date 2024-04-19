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

    getAllProducts: async (token) => {
        const response = await fetch(`${BASE_URL}/api/products/get-all-products`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    },

    getOneProduct: async (id, token) => {
        const response = await fetch(`${BASE_URL}/api/products/get-one-product/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    },

    createProduct: async (productData, token) => {
        const response = await fetch(`${BASE_URL}/api/products/create-product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData),
        });
        return response.json();
    },

    updateProduct: async (id, productData, token) => {
        const response = await fetch(`${BASE_URL}/api/products/update-product/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData),
        });
        return response.json();
    },

    deleteProduct: async (id, token) => {
        const response = await fetch(`${BASE_URL}/api/products/delete-product/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    },
};

export default api;
