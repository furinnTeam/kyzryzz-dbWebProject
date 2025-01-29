const themeToggle = document.getElementById('themeToggle');
const loginForm = document.getElementById('loginForm');
const phoneInput = document.getElementById('phone');
const loginSection = document.getElementById('loginSection');
const usernameSection = document.getElementById('usernameSection');
const createUserButton = document.getElementById('createUserButton');
const credentials = document.getElementById('credentials');
const usernameDisplay = document.getElementById('username');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.textContent = '☽';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');

  themeToggle.textContent = isDark ? '☽' : '☀︎';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const phone = phoneInput.value.trim();

  const registeredNumbers = ['6281234567890', '6285921655444'];
  if (!registeredNumbers.includes(phone)) {
    document.getElementById('notRegistered').style.display = 'block';
    return;
  }

  loginSection.style.display = 'none';
  usernameSection.style.display = 'block';
});

createUserButton.addEventListener('click', async () => {
  try {
    const username = `user${Math.floor(Math.random() * 10000)}`;
    usernameDisplay.textContent = username;
    credentials.style.display = 'block';
  } catch (error) {
    alert('Gagal membuat username. Coba lagi nanti.');
    console.error(error);
  }
});
