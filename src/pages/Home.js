import React, { useState } from 'react';
import { Container, Box, Button, Select, MenuItem, InputLabel, Typography, TextField, FormControl } from '@mui/material';
import "./style.css"
// Bu örnekte kullanılacak örnek JSON verisi
import seferData from './seferData.json';

const Arama = () => {
  const [kalkisYeri, setKalkisYeri] = useState('');
  const [varisYeri, setVarisYeri] = useState('');
  const [seferTarihi, setSeferTarihi] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleArama = () => {
    // JSON verisinde arama işlemi
    const result = seferData.find((sefer) => sefer.kalkis === kalkisYeri && sefer.varis === varisYeri && sefer.tarih === seferTarihi);

    if (result) {
      setSearchResult(`Uygun sefer bulundu: ${result.kalkis} - ${result.varis}, Tarih: ${result.tarih}`);
    } else {
      setSearchResult('Uygun sefer bulunamadı.');
    }
  };

  return (
    <div className='ticketSearch'>
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 4,
            borderRadius: 4,
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Sefer Arama
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="kalkis-yeri-label">Kalkış Yeri</InputLabel>
            <Select
              labelId="kalkis-yeri-label"
              id="kalkis-yeri"
              value={kalkisYeri}
              label="Kalkış Yeri"
              onChange={(e) => setKalkisYeri(e.target.value)}
            >
              <MenuItem value="Istanbul">İstanbul</MenuItem>
              <MenuItem value="Ankara">Ankara</MenuItem>
              <MenuItem value="Izmir">İzmir</MenuItem>

              {/* Diğer kalkış yerleri */}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="varis-yeri-label">Varış Yeri</InputLabel>
            <Select
              labelId="varis-yeri-label"
              id="varis-yeri"
              value={varisYeri}
              label="Varış Yeri"
              onChange={(e) => setVarisYeri(e.target.value)}
            >
              <MenuItem value="Istanbul">İstanbul</MenuItem>
              <MenuItem value="Ankara">Ankara</MenuItem>
              <MenuItem value="Izmir">İzmir</MenuItem>
              {/* Diğer varış yerleri */}
            </Select>
          </FormControl>

          <TextField
            id="sefer-tarihi"
            label="Sefer Tarihi"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{ marginBottom: 2 }}
            value={seferTarihi}
            onChange={(e) => setSeferTarihi(e.target.value)}
          />

          <Button variant="contained" color="primary" onClick={handleArama}>
            Arama Yap
          </Button>

          {searchResult && (
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              {searchResult} <br/>
              <Button href='/ticketdetails' variant="contained" color="primary">
              Sefer Detayları
            </Button>
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Arama;
