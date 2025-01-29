const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Logika untuk Toggle Tema
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDarkTheme = document.body.classList.contains('dark-theme');

  // Ganti Ikon Berdasarkan Tema
  themeIcon.innerHTML = isDarkTheme
    ? '<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 010-16 8 8 0 010 16z"/>' // Bulan
    : '<path d="M12 4a1 1 0 01-1-1V2a1 1 0 112 0v1a1 1 0 01-1 1zM12 22a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM4.22 4.22a1 1 0 01-.02-1.41l.7-.7a1 1 0 111.42 1.42l-.7.7a1 1 0 01-1.4-.01zM20.48 19.6a1 1 0 01-.02-1.41l.7-.7a1 1 0 111.42 1.42l-.7.7a1 1 0 01-1.4-.01zM4 12a1 1 0 01-1-1H2a1 1 0 010-2h1a1 1 0 011 1zM22 12a1 1 0 01-1-1h1a1 1 0 010 2h-1a1 1 0 01-1-1zM4.22 19.78a1 1 0 01-.02-1.41l.7-.7a1 1 0 111.42 1.42l-.7.7a1 1 0 01-1.4-.01zM20.48 4.4a1 1 0 01-.02-1.41l.7-.7a1 1 0 111.42 1.42l-.7.7a1 1 0 01-1.4-.01zM12 6a6 6 0 100 12 6 6 0 000-12z"/>'; // Matahari
});


// LOGIN HANDLER
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const phone = document.getElementById('phone').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });

  const result = await response.json();
  if (result.status === 'not_registered') {
    document.getElementById('notRegistered').style.display = 'block';
  } else {
    alert(result.message);
    document.getElementById('notRegistered').style.display = 'none';
  }
});

// USERNAME CREATION HANDLER
document.getElementById('createUserForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;

  const response = await fetch('/create-username', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  });

  const result = await response.json();
  if (result.status === 'success') {
    document.getElementById('result').style.display = 'block';
  } else {
    alert('Gagal menambahkan username. Coba lagi nanti.');
  }
});
