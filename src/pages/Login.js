import React, { useState } from 'react';
import { Container, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import "./style.css";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      if (!isEmailValid(email)) {
        throw new Error('Lütfen Geçerli Bir Mail Adresi Giriniz.');
      }

      const response = {
        email,
        password,
      };

      const user = localStorage.getItem('user', JSON.stringify(response));
     
      if( user.includes(response.email) && user.includes(response.password)){
        setError("Giriş Başarılı!")
        navigate("/ticketsearch")
      }else{
        setError("Kullancı Adı veya Parola Hatalı!")
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const isUserLoggedIn = () => {
    return !!localStorage.getItem('user');
  };

  return (
    <div className='loginPage'>
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 4,
            borderRadius: 4,
            textAlign: 'center',
          }}
        >
          <h1><em>bg Seyehat</em></h1>
          <h1>Hoşgeldiniz!</h1>
          <h2 style={{ textAlign: "left" }}>Giriş Yap</h2>
          <form>
            <TextField
              label="E-mail Adresi"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Şifre"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" color="primary" onClick={handleLogin}>
              Giriş
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Hesabınız yok mu? <a style={{ textDecoration: "none", color: "blue" }} href='/signup'>Hesap Oluştur</a></p>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
