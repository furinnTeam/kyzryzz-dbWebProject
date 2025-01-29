const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const PORT = 3000;
const githubToken = `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`;
const owner = 'furinnTeam';
const repo = 'scriptSecurity';
const filePath = 'cft';

app.post('/login', async (req, res) => {
  const { phone } = req.body;

  try {
    const response = await axios.get(`https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`);
    const data = response.data;

    if (!data.owners.includes(phone)) {
      return res.json({ status: 'not_registered' });
    }
    res.json({ status: 'success', message: 'Login berhasil!' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memverifikasi nomor.' });
  }
});

app.post('/add-username', async (req, res) => {
  const { newUsername } = req.body;

  try {
    const fileResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      headers: { Authorization: `Bearer ${githubToken}` }
    });

    const fileSha = fileResponse.data.sha;
    const fileContent = Buffer.from(fileResponse.data.content, 'base64').toString('utf-8');
    let jsonData = JSON.parse(fileContent);

    if (!jsonData.username.includes(newUsername)) {
      jsonData.username.push(newUsername);
    } else {
      return res.status(400).json({ message: 'Username sudah ada.' });
    }

    const updatedContent = Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64');

    await axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      message: `Menambahkan username: ${newUsername}`,
      content: updatedContent,
      sha: fileSha,
      branch: 'main'
    }, {
      headers: { Authorization: `Bearer ${githubToken}` }
    });

    res.json({ message: 'Username berhasil ditambahkan.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan username.', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
