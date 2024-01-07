import React, { useState } from 'react';
import { Container, Box, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    try {
      if (!name || !email || !birthdate || !gender || !password) {
        throw new Error('Lütfen tüm alanları doldurun.');
      }

      if (!isEmailValid(email)) {
        throw new Error('Lütfen geçerli bir e-posta adresi giriniz.');
      }

      const response = {
        name,
        email,
        birthdate,
        gender,
        password,
      };

      localStorage.setItem('user', JSON.stringify(response));
      setError('Hesabınız Başarıyla Oluşturuldu! Giriş Yap Sayfasına Yönlendiriliyorsunuz...'); 
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const isUserLoggedIn = () => {
    return !!localStorage.getItem('user');
  };

  return (
    <div className="signupPage">
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 4,
            borderRadius: 4,
            textAlign: 'center',
          }}
        >
          <h2>Kayıt Ol</h2>
          <form>
            <TextField
              label="İsim Soyisim"
              type="text"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="E-mail Adresi"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              type="date"
              fullWidth
              margin="normal"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />

            <InputLabel id="gender-label">Cinsiyet</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              fullWidth
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="male">Erkek</MenuItem>
              <MenuItem value="female">Kadın</MenuItem>
            </Select>

            <TextField
              label="Şifre"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" color="primary" onClick={handleSignup}>
              Kayıt Ol
            </Button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <p>Hesabınız var mı? <a style={{ textDecoration: "none", color: "blue" }} href='/login'>Giriş Yap</a></p>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
