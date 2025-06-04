export function initControlPanel() {
  const botaoCriar = document.querySelector(".button--criar");
  const modal = document.getElementById("modal-procedimento");
  const fechar = document.getElementById("fechar-modal");
  const cancelar = document.getElementById("cancelar");
  const salvar = document.getElementById("salvar");
  const tabela = document.getElementById("tabela-procedimentos");
  const botaoFiltroFavoritos = document.getElementById("filtro-favoritos");
  const tituloModal = document.getElementById("tituloModal");

  let filtrarFavoritos = false;
  let editIndex = null;

  function abrirModal() {
    modal.style.display = "flex";
  }

  function fecharModal() {
    modal.style.display = "none";
  }

  function limparFormulario() {
    document.getElementById("tituloProcedimento").value = "";
    document.getElementById("descricaoProcedimento").value = "";
    document.getElementById("etiquetasProcedimento").value = "";
    document.getElementById("statusProcedimento").value = "Ativo";
    document.getElementById("arquivoProcedimento").value = "";
    editIndex = null;
  }

  // Função para alterar só o texto do título mantendo o "×" do fechar
  function setTituloModal(texto) {
    // O primeiro childNode é o texto, o segundo é o botão fechar (span)
    tituloModal.childNodes[0].nodeValue = texto + " ";
  }

  function renderizarTabela() {
    const procedimentos = JSON.parse(localStorage.getItem("procedimentos")) || [];
    tabela.innerHTML = "";

    procedimentos.forEach((procedimento, index) => {
      if (procedimento.arquivado || procedimento.status.toLowerCase() === "inativo") return;
      if (filtrarFavoritos && !procedimento.favorito) return;

      const tr = document.createElement("tr");
      tr.dataset.index = index;

      tr.innerHTML = `
        <td>${procedimento.titulo}</td>
        <td>${procedimento.etiquetas.map(tag => `<span class="tag">${tag}</span>`).join(" ")}</td>
        <td>${procedimento.ultimaAtualizacao}</td>
        <td>${procedimento.status}</td>
        <td class="actions">
          <span class="material-symbols-outlined" title="Visualizar">visibility</span>
          <span class="material-symbols-outlined editar" title="Editar">edit</span>
          <span class="material-symbols-outlined favoritar" title="Favoritar" style="color:${procedimento.favorito ? '#b71c1c' : 'var(--color-text)'}; font-variation-settings: 'FILL' ${procedimento.favorito ? 1 : 0};">favorite</span>
          <span class="material-symbols-outlined" title="Duplicar">content_copy</span>
          <span class="material-symbols-outlined" title="Gerar PDF">picture_as_pdf</span>
          <span class="material-symbols-outlined arquivar" title="Arquivar">archive</span>
        </td>
      `;

      tabela.appendChild(tr);
    });

    // Eventos dos botões Favoritar, Editar e Arquivar
    document.querySelectorAll(".favoritar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.closest("tr").dataset.index;
        toggleFavorito(idx);
      });
    });

    document.querySelectorAll(".editar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.closest("tr").dataset.index;
        editarProcedimento(idx);
      });
    });

    document.querySelectorAll(".arquivar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.closest("tr").dataset.index;
        arquivarProcedimento(idx);
      });
    });
  }

  function toggleFavorito(index) {
    const procedimentos = JSON.parse(localStorage.getItem("procedimentos")) || [];
    procedimentos[index].favorito = !procedimentos[index].favorito;
    localStorage.setItem("procedimentos", JSON.stringify(procedimentos));
    renderizarTabela();
  }

  function arquivarProcedimento(index) {
    const procedimentos = JSON.parse(localStorage.getItem("procedimentos")) || [];
    procedimentos[index].arquivado = true;
    procedimentos[index].status = "Inativo";
    procedimentos[index].ultimaAtualizacao = new Date().toLocaleDateString("pt-BR");
    localStorage.setItem("procedimentos", JSON.stringify(procedimentos));
    renderizarTabela();
  }

  function editarProcedimento(index) {
    const procedimentos = JSON.parse(localStorage.getItem("procedimentos")) || [];
    const proc = procedimentos[index];
    editIndex = index;

    document.getElementById("tituloProcedimento").value = proc.titulo;
    document.getElementById("descricaoProcedimento").value = proc.descricao;
    document.getElementById("etiquetasProcedimento").value = proc.etiquetas.join(", ");
    document.getElementById("statusProcedimento").value = proc.status;

    setTituloModal("Editar Procedimento");
    abrirModal();
  }

  function salvarProcedimento() {
    const titulo = document.getElementById("tituloProcedimento").value.trim();
    const descricao = document.getElementById("descricaoProcedimento").value.trim();
    const etiquetasInput = document.getElementById("etiquetasProcedimento").value;
    const etiquetas = etiquetasInput ? etiquetasInput.split(",").map(e => e.trim()) : [];
    const status = document.getElementById("statusProcedimento").value;
    const arquivoInput = document.getElementById("arquivoProcedimento");
    const nomeArquivo = arquivoInput.files[0]?.name || null;

    if (!titulo) {
      alert("Por favor, preencha o título do procedimento.");
      return;
    }

    const procedimentos = JSON.parse(localStorage.getItem("procedimentos")) || [];
    const dataAtual = new Date().toLocaleDateString("pt-BR");
    const arquivadoAutomatico = status.toLowerCase() === "inativo";

    if (editIndex !== null) {
      const fav = procedimentos[editIndex].favorito || false;
      procedimentos[editIndex] = {
        ...procedimentos[editIndex],
        titulo,
        descricao,
        etiquetas,
        status,
        arquivo: nomeArquivo || procedimentos[editIndex].arquivo,
        ultimaAtualizacao: dataAtual,
        arquivado: arquivadoAutomatico,
        favorito: fav,
      };
      editIndex = null;
    } else {
      procedimentos.push({
        titulo,
        descricao,
        etiquetas,
        status,
        arquivo: nomeArquivo || "",
        ultimaAtualizacao: dataAtual,
        arquivado: arquivadoAutomatico,
        favorito: false,
      });
    }

    localStorage.setItem("procedimentos", JSON.stringify(procedimentos));
    renderizarTabela();
    fecharModal();
    limparFormulario();
  }

  botaoCriar.addEventListener("click", () => {
    limparFormulario();
    setTituloModal("Novo Procedimento");
    abrirModal();
  });

  fechar.addEventListener("click", () => {
    fecharModal();
    limparFormulario();
  });

  cancelar.addEventListener("click", () => {
    fecharModal();
    limparFormulario();
  });

  salvar.addEventListener("click", salvarProcedimento);

  botaoFiltroFavoritos.addEventListener("click", () => {
    filtrarFavoritos = !filtrarFavoritos;

    const icone = botaoFiltroFavoritos.querySelector(".material-symbols-outlined");
    if (icone) {
      icone.textContent = filtrarFavoritos ? "favorite" : "favorite_border";
      icone.style.fontVariationSettings = filtrarFavoritos ? "'FILL' 1" : "'FILL' 0";
    }

    if (filtrarFavoritos) {
      botaoFiltroFavoritos.classList.add("ativo");
    } else {
      botaoFiltroFavoritos.classList.remove("ativo");
    }
    
    renderizarTabela();
  });

  renderizarTabela();
}
