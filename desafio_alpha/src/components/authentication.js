import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Authentication({ onLogin, isLoggedIn }) {
    const [credentials, setCredentials] = useState({ taxNumber: '', password: '' });
    const [userData, setUserData] = useState({ name: '', taxNumber: '', mail: '', phone: '', password: '' });
    const [loginError, setLoginError] = useState(null); // State for login errors
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const response = await api.login(credentials);
            console.log('Usuário autenticado:', response);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            onLogin(response);
            navigate('/products');
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            setLoginError('Erro ao realizar login');
        }
    };


    const handleRegister = async () => {
        try {
            if (!userData.name || !userData.taxNumber || !userData.mail || !userData.phone || !userData.password) {
                setRegistrationMessage('Todos os campos são obrigatórios');
                return;
            }

            const response = await api.register(userData);
            console.log('Usuário registrado:', response);
            setRegistrationMessage('Registro realizado com sucesso');
            await handleLogin();
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            setRegistrationMessage('Erro ao registrar usuário');
        }
    };

    const toggleRegistrationForm = () => {
        setShowRegistrationForm(!showRegistrationForm);
        setRegistrationMessage('');
    };

    if (isLoggedIn) {
        return navigate('/products');
    }

    return (
        <div>
            <h2>Autenticação</h2>
            <input type="text" placeholder="CPF/CNPJ" value={credentials.taxNumber} onChange={(e) => setCredentials({ ...credentials, taxNumber: e.target.value })} />
            <input type="password" placeholder="Senha" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button onClick={handleLogin}>Login</button>
            <button onClick={toggleRegistrationForm}>Registrar-se</button>
            {showRegistrationForm && (
                <div>
                    <input type="text" placeholder="Nome" value={userData.name}
                           onChange={(e) => setUserData({...userData, name: e.target.value})}/>
                    <input type="text" placeholder="CPF ou CNPJ" value={userData.taxNumber}
                           onChange={(e) => setUserData({...userData, taxNumber: e.target.value})}/>
                    <input type="text" placeholder="E-mail" value={userData.mail}
                           onChange={(e) => setUserData({...userData, mail: e.target.value})}/>
                    <input type="text" placeholder="Telefone" value={userData.phone}
                           onChange={(e) => setUserData({...userData, phone: e.target.value})}/>
                    <input type="password" placeholder="Senha" value={userData.password}
                           onChange={(e) => setUserData({...userData, password: e.target.value})}/>
                    <button onClick={handleRegister}>Registrar</button>
                    <p>{registrationMessage}</p> {}
                </div>
            )}
        </div>
    );
}

export default Authentication;
