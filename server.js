const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const PORT = 3000;

// Login endpoint
app.post('/login', async (req, res) => {
  const { phone } = req.body;
  try {
    // Simulasi validasi nomor telepon
    const registeredNumbers = ['6281234567890', '6285921655444']; // Replace dengan data asli
    if (!registeredNumbers.includes(phone)) {
      return res.json({ status: 'not_registered' });
    }
    res.json({ status: 'success', message: 'Login berhasil!' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan server.' });
  }
});

// Create username endpoint
app.get('/create-username', async (req, res) => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/furinnTeam/scriptSecurity/refs/heads/main/cft'
    );
    const { username } = response.data;
    res.json({ username });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil username.' });
  }
});

// Create password endpoint
app.get('/create-password', async (req, res) => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/furinnTeam/scriptSecurity/refs/heads/main/cft'
    );
    const { password } = response.data;
    res.json({ password });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil password.' });
  }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
