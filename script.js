document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  let icon = document.getElementById('themeToggle');
  icon.textContent = document.body.classList.contains('dark-theme') ? '🌞' : '🌙';
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
