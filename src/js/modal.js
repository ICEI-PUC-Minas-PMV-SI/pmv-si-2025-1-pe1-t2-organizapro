const element = document.getElementById("modal-procedimento");
const tituloModalElement = document.getElementById("tituloModal"); // Renomeado para evitar conflito com a propriedade 'titulo' do objeto

export const modal = {
  element,
  titulo: tituloModalElement, // Usando a variável com nome diferente

  abrir() {
    if (this.element) this.element.style.display = "flex";
  },

  fechar() {
    if (this.element) this.element.style.display = "none";
  },

  limparFormulario() {
    // IDs dos campos a serem limpos.
    // Atualizados para refletir os IDs únicos que discutimos para os campos customizados.
    const campos = [
      "tituloProcedimento",
      "descricaoProcedimento",
      "etiquetasProcedimento", // O select principal de etiquetas
      "statusProcedimento",
      "arquivoProcedimento",
      "tipoProcedimento",      // O select principal de tipo
      "custom-type-input",     // ID do input para tipo customizado (era "custom-type")
      "custom-etiquetas-input" // ID do input para etiqueta customizada (ADICIONADO)
    ];

    campos.forEach(id => {
      const el = document.getElementById(id);
      if (!el) {
        // console.warn(`Elemento com ID '${id}' não encontrado em limparFormulario.`);
        return;
      }

      if (el.tagName === "SELECT") {
        el.value = id === "statusProcedimento" ? "Ativo" : ""; // Default para status é 'Ativo', outros selects são resetados
      } else {
        el.value = ""; // Limpa inputs de texto, file, etc.
      }
    });

    // Esconde os containers dos campos customizados
    const customTipoContainer = document.getElementById("custom-type-container"); // ID do container de tipo customizado
    if (customTipoContainer) customTipoContainer.style.display = "none";

    const customEtiquetaContainer = document.getElementById("custom-etiquetas-container"); // ID do container de etiqueta customizada (ADICIONADO)
    if (customEtiquetaContainer) customEtiquetaContainer.style.display = "none";
  },

  setTitulo(texto) {
    // Adicionada verificação para 'this.titulo'
    if (this.titulo) {
      this.titulo.textContent = texto; // Removido o espaço extra no final se não for intencional
    } else {
      // console.warn("Elemento do título do modal não encontrado.");
    }
  }
};