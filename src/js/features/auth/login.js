// src/js/features/auth/login.js

import { loadHTML } from '../../utils/include-loader.js';
import { initLogin } from './form-login.js';
import { initForgotPassword } from './forgot-password.js';

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
  togglePassword.addEventListener('click', function () {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    this.textContent = isPassword ? 'visibility_off' : 'visibility';
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  initLogin();

  try {
    await loadHTML('modal-forgot-password-placeholder', '/src/includes/modals/modal-forgot-password.html');

    initForgotPassword(
      '.options a[href="#"]',
      'modal-forgot-password',
      'forgotPasswordModalTitle',
      'recoveryEmail',
      'sendRecoveryLink',
      'recoveryMessage'
    );
  } catch (error) {
    console.error('Erro ao carregar ou inicializar o modal de recuperação de senha:', error);
  }
});
