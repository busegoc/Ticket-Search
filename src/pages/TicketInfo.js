import React, { useState } from 'react';
import { Button, CardContent, Grid, TextField, Typography, Card, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import "./style.css";
import card from "../images/credit-card.png";
import { useNavigate } from 'react-router-dom';

const SeferDetaylari = ({ sefer }) => {
    const [seciliKoltuklar, setSeciliKoltuklar] = useState([]);
    const [odemeSayfa, setOdemeSayfa] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryDate: '',
        cvc: '',
    });
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Form doğrulama işlemleri
        if (!formData.cardNumber || !formData.cardHolderName || !formData.expiryDate || !formData.cvc) {
            setSnackbarMessage('Lütfen tüm alanları doldurun.');
            setSnackbarOpen(true);
            return;
        }

     
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSnackbarMessage('Ödeme işlemi başarıyla tamamlandı!');
            setSnackbarOpen(true);
        }, 2000);
    };

    const handleKoltukSecimi = (koltuk) => {
        if (seciliKoltuklar.includes(koltuk)) {
            setSeciliKoltuklar(seciliKoltuklar.filter((secili) => secili !== koltuk));
        } else {
            if (seciliKoltuklar.length < 5) {
                setSeciliKoltuklar([...seciliKoltuklar, koltuk]);
            } else {
                setSnackbarMessage('En fazla 5 koltuk seçebilirsiniz.');
                setSnackbarOpen(true);
            }
        }
    };
    const handleBiletAramaSayfasinaDon = () => {
        navigate('/ticketsearch');
    };
    const handleOdemeSayfasinaGit = () => {
        if (seciliKoltuklar.length > 0) {
            setOdemeSayfa(true);
        } else {
            setSnackbarMessage('Lütfen en az bir koltuk seçiniz.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <div>
                <Typography variant="h4" gutterBottom>
                    <h3>Sefer Detayları</h3>
                </Typography>
                <div className='ticketDetails'>
                    <Typography variant="h6" gutterBottom>
                        Koltuk Düzeni:
                    </Typography>
                </div>
                <div className='busStyle'>
                    {Array.from({ length: 8 }, (_, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
                            {Array.from({ length: 4 }, (_, colIndex) => {
                                const koltukNumarasi = rowIndex * 4 + colIndex + 1;
                                return (
                                    <div
                                        key={koltukNumarasi}
                                        onClick={() => handleKoltukSecimi(koltukNumarasi)}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            margin: '10px',
                                            borderRadius: '5px',
                                            backgroundColor: seciliKoltuklar.includes(koltukNumarasi) ? 'red' : 'green',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: 'white',
                                        }}
                                    >
                                        {koltukNumarasi}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className='otherDetails'>
                    <Typography variant="h6" gutterBottom>
                        Seçilen Koltuklar: {seciliKoltuklar.join(', ')}
                    </Typography>
                </div>
                <div className='otherDetails'>
                    <Typography variant="h6" gutterBottom>
                        Ücret: {seciliKoltuklar.length * 250} TL
                    </Typography>
                </div>

                <div className='otherDetails'>
                    <Button variant="contained" color="primary" onClick={handleOdemeSayfasinaGit}>
                        Ödeme Yap
                    </Button>
                </div>

                {odemeSayfa && (
                    <>
                        <div className='stayInTheMiddle'>
                            <Typography variant="h4" gutterBottom>
                                Ödeme Detayları
                            </Typography>
                        </div>

                        <div className='card'>
                            <Card className='creditCard' elevation={3}>
                                <CardContent className='card'>
                                    <Grid container spacing={3}>
                                        <Grid item xs={5}>
                                            <form onSubmit={handleSubmit}>
                                                <TextField
                                                    label="Kart Numarası"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleChange}
                                                />
                                                <TextField
                                                    label="Kart Sahibinin Adı"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="cardHolderName"
                                                    value={formData.cardHolderName}
                                                    onChange={handleChange}
                                                />
                                                <TextField
                                                    label="Son Kullanma Tarihi"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={handleChange}
                                                />
                                                <TextField
                                                    label="CVC"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="cvc"
                                                    value={formData.cvc}
                                                    onChange={handleChange}
                                                />
                                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                                                    Ödemeyi Tamamla
                                                </Button>
                                            </form>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </div>

                        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                            <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                                {snackbarMessage}
                            </MuiAlert>
                        </Snackbar>
                        {loading && (
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <CircularProgress size={100} thickness={4} />
                            </div>
                        )}
                        <div className='stayInTheMiddle'>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBiletAramaSayfasinaDon}
                                style={{ marginTop: '16px' }}
                            >
                                Farklı Bir Sefer Ara
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default SeferDetaylari;
