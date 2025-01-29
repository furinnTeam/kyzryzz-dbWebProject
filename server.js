const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const PORT = 3000;
const githubToken = `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`;
const owner = 'furinnTeam';
const repo = 'scriptSecurity';
const branch = 'main';

app.post('/login', async (req, res) => {
  const { phone } = req.body; 

  try {
    const response = await axios.get("https://raw.githubusercontent.com/furinnTeam/scriptSecurity/main/cft");

    if (!response.data.owners.includes(phone)) {
      return res.json({ status: 'not_registered' });
    }
    res.json({ status: 'success', message: 'Login berhasil!' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memverifikasi nomor.' });
  }
});

app.get('/create-username', async (req, res) => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/furinnTeam/scriptSecurity/main/cft'
    );
    const { username } = response.data;
    res.json({ username });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil username.' });
  }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
