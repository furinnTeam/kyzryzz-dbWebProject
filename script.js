const themeToggle = document.getElementById('themeToggle');
const loginForm = document.getElementById('loginForm');
const phoneInput = document.getElementById('phone');
const loginSection = document.getElementById('loginSection');
const usernameSection = document.getElementById('usernameSection');
const createUserButton = document.getElementById('createUserButton');
const credentials = document.getElementById('credentials');
const usernameDisplay = document.getElementById('username');
const ipOption = document.getElementById('ipOption');
const copyUsernameButton = document.getElementById('copyUsernameButton');
const addIpButton = document.getElementById('addIpButton');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☽' : '☀︎';
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const phone = phoneInput.value.trim();

  try {
    const response = await fetch("https://raw.githubusercontent.com/furinnTeam/scriptSecurity/main/cft");
    const data = await response.json();

    if (!data.owners.includes(phone)) { 
      document.getElementById('notRegistered').style.display = 'block';
    } else {
      loginSection.style.display = 'none';
      usernameSection.style.display = 'block';
    }
  } catch (error) {
    alert('Terjadi kesalahan saat memverifikasi nomor.');
  }
});

createUserButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/create-username');
    const { username } = await response.json();

    usernameDisplay.textContent = username;
    credentials.style.display = 'block';
    copyUsernameButton.style.display = 'block';
    ipOption.style.display = 'block';
  } catch (error) {
    alert('Gagal membuat username. Coba lagi nanti.');
  }
});

copyUsernameButton.addEventListener('click', () => {
  navigator.clipboard.writeText(usernameDisplay.textContent).then(() => {
    alert('Username berhasil disalin!');
  });
});

addIpButton.addEventListener('click', async () => {
  try {
    const ip = await fetch('https://api64.ipify.org?format=json').then(res => res.json()).then(data => data.ip);
    const url = 'http://accip.nvlgroup.my.id/api/Kyzry/ip';

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip_address: ip })
    });

    const result = await response.json();
    alert(result ? `IP ${ip} berhasil ditambahkan.` : `Gagal menambahkan IP ${ip}.`);
  } catch (error) {
    alert('Terjadi kesalahan saat menambahkan IP.');
  }
});
