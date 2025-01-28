const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const PORT = 3000;
const GITHUB_TOKEN = 'GANTI_DENGAN_TOKEN_GITHUB_ANDA';
const OWNER = 'furinnTeam';
const REPO = 'cft';
const BRANCH = 'main';

app.post('/login', async (req, res) => {
  const { phone } = req.body;
  const registeredNumbers = ['6281234567890', '6285921655444'];

  if (!registeredNumbers.includes(phone)) {
    return res.json({ status: 'not_registered' });
  }
  res.json({ status: 'success', message: 'Login berhasil!' });
});

app.post('/create-username', async (req, res) => {
  const { username } = req.body;
  try {
    const filePath = `usernames/${Date.now()}.txt`;
    const content = Buffer.from(username).toString('base64');

    await axios.put(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`, {
      message: `Menambahkan username: ${username}`,
      content,
      branch: BRANCH
    }, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });

    res.json({ status: 'success', message: 'Username berhasil ditambahkan!' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Gagal menambahkan username.' });
  }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
