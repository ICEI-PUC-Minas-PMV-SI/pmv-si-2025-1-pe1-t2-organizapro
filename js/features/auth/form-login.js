export function initLogin() {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const messageDiv = document.getElementById('errorMessage');

  const fakeUsers = [
    { email: 'teste@exemplo.com', password: '123456' },
    { email: 'user2@exemplo.com', password: 'senha2' }
  ];

  if (!loginForm || !emailInput || !passwordInput || !messageDiv) {
    console.error('Elementos do formulário de login não encontrados no DOM.');
    return;
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showMessage('Por favor, preencha todos os campos.', 'error');
      return;
    }

    const userExists = fakeUsers.some(u => u.email === email && u.password === password);

    if (userExists) {
      showMessage('Login efetuado com sucesso!', 'success');
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 1000);
    } else {
      showMessage('Email ou senha incorretos.', 'error');
    }
  });

  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.style.color = type === 'success' ? 'green' : 'red';
  }
}
