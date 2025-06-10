export function initLogin() {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const messageDiv = document.getElementById('errorMessage');

  // Usuários simulados (backend fake)
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
      messageDiv.textContent = 'Por favor, preencha todos os campos.';
      messageDiv.style.color = 'red';
      return;
    }

    const user = fakeUsers.find(u => u.email === email && u.password === password);

    if (user) {
      messageDiv.textContent = 'Login efetuado com sucesso!';
      messageDiv.style.color = 'green';

      setTimeout(() => {
        window.location.href = '/src/index.html';  
      }, 1000);
    } else {
      messageDiv.textContent = 'Email ou senha incorretos.';
      messageDiv.style.color = 'red';
    }
  });
}
