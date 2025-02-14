const themeToggle = document.getElementById('themeToggle');
const loginForm = document.getElementById('loginForm');
const phoneInput = document.getElementById('phone');
const loginSection = document.getElementById('loginSection');
const usernameSection = document.getElementById('usernameSection');
const usernameForm = document.getElementById('usernameForm');
const newUsernameInput = document.getElementById('newUsername');
const usernameResult = document.getElementById('usernameResult');
const usernameDisplay = document.getElementById('usernameDisplay');
const copyUsernameButton = document.getElementById('copyUsernameButton');
const ipOption = document.getElementById('ipOption');
const addIpButton = document.getElementById('addIpButton');
const notRegistered = document.getElementById('notRegistered');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☽' : '☀︎';
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const phone = phoneInput.value.trim();

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    const data = await response.json();

    if (data.status === 'not_registered') {
      notRegistered.style.display = 'block';
    } else {
      loginSection.style.display = 'none';
      usernameSection.style.display = 'block';
    }
  } catch (error) {
    alert('Terjadi kesalahan saat memverifikasi nomor.');
  }
});

usernameForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newUsername = newUsernameInput.value.trim();

  try {
    const response = await fetch('/create-username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUsername }),
    });
    const data = await response.json();

    if (data.status === 'success') {
      usernameDisplay.textContent = data.username;
      usernameResult.style.display = 'block';
      copyUsernameButton.style.display = 'block';
      ipOption.style.display = 'block';
    } else {
      alert('Gagal menambahkan username. Coba lagi nanti.');
    }
  } catch (error) {
    alert('Gagal menambahkan username. Coba lagi nanti.');
  }
});

copyUsernameButton.addEventListener('click', () => {
  navigator.clipboard.writeText(usernameDisplay.textContent).then(() => {
    alert('Username berhasil disalin!');
  });
});

addIpButton.addEventListener('click', async () => {
  try {
    const ip = await fetch('https://api64.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => data.ip);
    const url = 'http://accip.nvlgroup.my.id/api/Kyzry/ip';

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip_address: ip }),
    });

    const result = await response.json();
    alert(result ? `IP ${ip} berhasil ditambahkan.` : `Gagal menambahkan IP ${ip}.`);
  } catch (error) {
    alert('Terjadi kesalahan saat menambahkan IP.');
  }
});
