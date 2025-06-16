import { createModalController } from '../../utils/modal-controller.js';

export function initForgotPassword(linkSelector, modalId, titleId, emailInputId, sendButtonId, messageId) {
  const forgotPasswordLink = document.querySelector(linkSelector);
  const recoveryEmailInput = document.getElementById(emailInputId);
  const sendRecoveryLinkButton = document.getElementById(sendButtonId);
  const recoveryMessage = document.getElementById(messageId);
  const closeModalBtn = document.getElementById('closeForgotPasswordModal');

  if (!forgotPasswordLink || !recoveryEmailInput || !sendRecoveryLinkButton || !recoveryMessage) {
    console.error('Erro: Elementos necessários para recuperação de senha não encontrados. Verifique IDs/seletores.');
    return;
  }

  const modalController = createModalController(modalId, titleId);
  if (!modalController) {
    console.error('Erro: Falha ao inicializar controlador do modal. Verifique modalId e titleId.');
    return;
  }

  forgotPasswordLink.addEventListener('click', e => {
    e.preventDefault();
    modalController.abrir();
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modalController.fechar());
  }

  modalController.definirCallbackDeLimpeza(() => {
    recoveryEmailInput.value = '';
    recoveryMessage.textContent = '';
    recoveryMessage.classList.remove('success', 'error');
  });

  sendRecoveryLinkButton.addEventListener('click', () => {
    const email = recoveryEmailInput.value.trim();

    if (!email) return showMessage('Por favor, digite seu e-mail.', 'error');
    if (!validateEmail(email)) return showMessage('Formato de e-mail inválido.', 'error');

    showMessage('Enviando link...', '');

    setTimeout(() => {
      if (email.includes('@')) {
        showMessage(`Um link para redefinir sua senha foi enviado para ${email}. Verifique sua caixa de entrada (e spam)!`, 'success');
      } else {
        showMessage('E-mail não encontrado em nossos registros. Verifique e tente novamente.', 'error');
      }
    }, 1500);
  });

  function showMessage(text, type) {
    recoveryMessage.textContent = text;
    recoveryMessage.classList.remove('success', 'error');
    if (type) recoveryMessage.classList.add(type);
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
