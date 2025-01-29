const express = require('express');
const axios = require('axios');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

const PORT = 3000;
const githubToken = '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';
const owner = 'furinnTeam';
const repo = 'scriptSecurity';
const branch = 'main';
const filePath = 'cft';

app.post('/login', async (req, res) => {
  const { phone } = req.body;

  try {
    const response = await axios.get(`https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/${branch}/${filePath}`);
    const data = response.data.owners;

    if (!data.includes(phone)) {
      return res.json({ status: 'not_registered' });
    }
    res.json({ status: 'success', message: 'Login berhasil!' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memverifikasi nomor.' });
  }
});

app.post('/create-username', async (req, res) => {
  const { newUsername } = req.body;

  try {
    const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const fileResponse = await axios.get(fileUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
    });

    const content = Buffer.from(fileResponse.data.username, 'base64').toString('utf-8');
    const updatedContent = `${content}\n${newUsername}`;
    const base64Content = Buffer.from(updatedContent).toString('base64');

    await axios.put(
      fileUrl,
      {
        message: `Menambahkan username ${newUsername}`,
        content: base64Content,
        sha: fileResponse.data.sha,
        branch: branch,
      },
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ status: 'success', message: 'Username berhasil ditambahkan!', username: newUsername });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan username.' });
  }
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
