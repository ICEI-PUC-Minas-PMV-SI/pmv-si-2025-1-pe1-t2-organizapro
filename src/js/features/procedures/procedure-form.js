// js/features/procedures/procedure-form.js

// Imports
import { createModalController } from "../../core/modal.js";

import {
    obterEtiquetasUnicas,
    obterTiposUnicos,
    salvarProcedimento,
} from './procedure-data.js';

import { atualizarTabela } from '../../features/common/filter-controls.js';

// Importa o novo componente de tags
import { initTagInputComponent } from '../../features/common/tag-input-component.js';

// Variáveis
let currentEditId = null;
let etiquetasTagComponent = null; // Instância do componente de tags
let formModalController = null; 
let tinyMCEEditor = null; // Instância do editor TinyMCE

// --- Referências aos Elementos DOM do Formulário (declaradas como 'let' para serem atribuídas em init) ---
// Elas serão inicializadas dentro de initProcedureForm()
let botaoCriar;
let fecharModalBtn;
let cancelarBtn;
let salvarBtn;

let tituloProcedimentoInput;
let descricaoProcedimentoInput; // Agora refere-se ao TEXTAREA
let tipoProcedimentoSelect;

let statusProcedimentoSelect;
let arquivoProcedimentoInput;

let customTypeContainer;
let customTypeInput;


// --- Funções de lógica do formulário ---

/**
 * Limpa todos os campos do formulário e oculta os campos customizados.
 * Função registrada no módulo modal para ser chamada ao limpar o conteúdo.
 */
function limparCamposProcedimentoForm() {
    const campos = [
        tituloProcedimentoInput,
        // descricaoProcedimentoInput é manipulado pelo tinyMCEEditor.setContent('')
        statusProcedimentoSelect,
        arquivoProcedimentoInput,
        tipoProcedimentoSelect,
        customTypeInput // Este é para o tipo custom, ainda relevante
    ];

    campos.forEach(el => {
        if (!el) return; // Verifica existência antes de manipular

        if (el.tagName === "SELECT") {
            el.value = (el.id === "statusProcedimento") ? "Ativo" : "";
        } else {
            el.value = "";
        }
    });

    // Limpa as tags selecionadas no NOVO componente de tags
    if (etiquetasTagComponent) {
        etiquetasTagComponent.clearTags();
    }

    // Gerencia o container do tipo customizado (ainda relevante)
    if (customTypeContainer) customTypeContainer.style.display = 'none';

    // NOVO: Limpar o conteúdo do editor TinyMCE
    if (tinyMCEEditor) {
        tinyMCEEditor.setContent(''); // Método do TinyMCE para limpar o conteúdo
    }
}

/**
 * Fecha o modal e garante a limpeza do formulário.
 */
function fecharModalProcedimento() {
    if (formModalController) {
        formModalController.fechar();
        formModalController.dispararLimpeza();
    }
    currentEditId = null;
}

/**
 * Popula um elemento <select> com opções dinâmicas.
 * Esta função é AGORA USADA APENAS para o SELECT DE TIPO.
 * @param {HTMLSelectElement} selectElement - Select a ser populado.
 * @param {string[]} options - Array de opções para popular.
 * @param {string} [customOptionValue='custom'] - Valor da opção "custom".
 */
function popularSelect(selectElement, options, customOptionValue = 'custom') {
    if (!selectElement) return;

    let customOption = null;
    Array.from(selectElement.options).forEach(opt => {
        if (opt.value === customOptionValue) {
            customOption = opt;
        }
    });

    selectElement.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione...';
    selectElement.appendChild(defaultOption);

    options.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue;
        selectElement.appendChild(option);
    });

    if (customOption && !options.includes(customOptionValue)) {
        selectElement.appendChild(customOption);
    }
}

/**
 * Valida os dados do formulário antes de salvar.
 * @returns {boolean} True se válido, false caso contrário.
 */
function validarFormulario() {
    const titulo = tituloProcedimentoInput?.value.trim() || "";
    let tipoSelecionado = tipoProcedimentoSelect?.value || "";

    if (tipoSelecionado === 'custom') {
        if (!customTypeInput?.value.trim()) {
            alert('Por favor, informe o tipo personalizado.');
            return false;
        }
        tipoSelecionado = customTypeInput.value.trim();
    }

    if (!titulo) {
        alert("Por favor, preencha o título do procedimento.");
        return false;
    }

    const etiquetasArray = etiquetasTagComponent ? etiquetasTagComponent.getTags() : [];
    
    return true;
}

/**
 * Handler para o clique no botão "Salvar".
 * Valida, salva e atualiza a tabela.
 * @param {Event} event
 */
function handleSaveProcedimento(event) {
    event.preventDefault();

    if (!validarFormulario()) return;

    const titulo = tituloProcedimentoInput.value.trim();
    // Obtém a descrição do editor TinyMCE
    const descricao = tinyMCEEditor ? tinyMCEEditor.getContent() : descricaoProcedimentoInput.value.trim(); 
    const status = statusProcedimentoSelect.value;
    const nomeArquivo = arquivoProcedimentoInput?.files[0]?.name || "";

    const tipoFinal = tipoProcedimentoSelect.value === 'custom'
        ? customTypeInput.value.trim()
        : tipoProcedimentoSelect.value;

    const etiquetasFinal = etiquetasTagComponent ? etiquetasTagComponent.getTags() : [];

    salvarProcedimento({
        titulo,
        descricao, // <-- AGORA VEM DO CONTEÚDO DO EDITOR
        etiquetas: etiquetasFinal,
        status,
        tipo: tipoFinal,
        arquivo: nomeArquivo
    }, currentEditId);

    atualizarTabela();
    fecharModalProcedimento();
}

/**
 * Preenche o formulário com os dados de um procedimento para edição ou duplicação.
 * @param {Object} procedimento - Objeto com os dados do procedimento a ser preenchido.
 * @param {boolean} [isDuplicating=false] - Indica se a operação é de duplicação.
 */
export function setProcedimentoParaEdicao(procedimento, isDuplicating = false) {
    if (!formModalController) {
        console.error("setProcedimentoParaEdicao chamado antes da inicialização de formModalController.");
        return;
    }

    currentEditId = isDuplicating ? null : procedimento.id;

    // 1. Define o TÍTULO DO MODAL
    if (isDuplicating) {
        formModalController.setTitulo("Duplicar Procedimento");
    } else {
        formModalController.setTitulo("Editar Procedimento");
    }

    // 2. Dispara a limpeza do formulário (reseta todos os campos)
    formModalController.dispararLimpeza();

    // 3. Preenche os campos do formulário
    if (tituloProcedimentoInput) {
        tituloProcedimentoInput.value = isDuplicating ? (procedimento.titulo || "") + " (cópia)" : (procedimento.titulo || '');
    }

    // Preencher o conteúdo do editor TinyMCE
    if (tinyMCEEditor) {
        tinyMCEEditor.setContent(procedimento.descricao || ''); // Define o conteúdo do editor
    } else if (descricaoProcedimentoInput) { // Fallback se o editor não inicializou
        descricaoProcedimentoInput.value = procedimento.descricao || '';
    }

    if (statusProcedimentoSelect) statusProcedimentoSelect.value = procedimento.status || 'Ativo';

    popularSelect(tipoProcedimentoSelect, obterTiposUnicos(), 'custom');

    if (tipoProcedimentoSelect) {
        const tiposExistentes = obterTiposUnicos();
        if (procedimento.tipo && tiposExistentes.includes(procedimento.tipo)) {
            tipoProcedimentoSelect.value = procedimento.tipo;
            if (customTypeContainer) customTypeContainer.style.display = 'none';
            if (customTypeInput) customTypeInput.value = '';
        } else if (procedimento.tipo) {
            tipoProcedimentoSelect.value = 'custom';
            if (customTypeContainer) customTypeContainer.style.display = 'block';
            if (customTypeInput) customTypeInput.value = procedimento.tipo;
        } else {
            tipoProcedimentoSelect.value = '';
            if (customTypeContainer) customTypeContainer.style.display = 'none';
            if (customTypeInput) customTypeInput.value = '';
        }
    }

    if (etiquetasTagComponent && procedimento.etiquetas) {
        etiquetasTagComponent.setTags(procedimento.etiquetas);
    } else if (etiquetasTagComponent) {
        etiquetasTagComponent.clearTags();
    }

    if (arquivoProcedimentoInput) arquivoProcedimentoInput.value = '';

    formModalController.abrir();
}

// Inicializa a lógica do formulário de procedimentos.
export function initProcedureForm() {
    // 1. INICIALIZA O MÓDULO MODAL PRINCIPAL PRIMEIRO
    const modalInitialized = formModalController = createModalController('modal-procedure', 'tituloModal');
    if (!modalInitialized) {
        console.error("Falha ao inicializar o modal do formulário de procedimento. Funcionalidade será limitada.");
        return;
    }

    // 2. CAPTURA AS REFERÊNCIAS DOM DOS ELEMENTOS DO FORMULÁRIO AQUI DENTRO.
    botaoCriar = document.querySelector(".button--criar");
    fecharModalBtn = document.getElementById("fechar-modal");
    cancelarBtn = document.getElementById("cancelar");
    salvarBtn = document.getElementById("salvar");
    tituloProcedimentoInput = document.getElementById("tituloProcedimento");
    descricaoProcedimentoInput = document.getElementById("descricaoProcedimento"); // Refere-se ao TEXTAREA
    tipoProcedimentoSelect = document.getElementById('tipoProcedimento');
    statusProcedimentoSelect = document.getElementById("statusProcedimento");
    arquivoProcedimentoInput = document.getElementById("arquivoProcedimento");
    customTypeContainer = document.getElementById('custom-type-container');
    customTypeInput = document.getElementById('custom-type-input');

    // 3. Registra a função de limpeza do formulário no módulo modal.
    formModalController.definirCallbackDeLimpeza(limparCamposProcedimentoForm);

    // 4. Inicializa o componente de tags
    etiquetasTagComponent = initTagInputComponent(
        'etiquetasInput',
        'selected-tags-display',
        'etiquetas-suggestions',
        'etiquetas-container', // ID do container pai do componente de tags
        (updatedTags) => {
            console.log('Etiquetas do formulário atualizadas:', updatedTags);
        }
    );

    // 5. Adiciona os event listeners aos botões
    if (botaoCriar) {
        botaoCriar.addEventListener('click', () => {
            if (formModalController) {
                formModalController.setTitulo("Novo Procedimento");
                formModalController.dispararLimpeza();
                popularSelect(tipoProcedimentoSelect, obterTiposUnicos(), 'custom');
                formModalController.abrir();
                currentEditId = null;
            }
        });
    }

    if (fecharModalBtn) fecharModalBtn.addEventListener('click', fecharModalProcedimento);
    if (cancelarBtn) cancelarBtn.addEventListener('click', fecharModalProcedimento);
    if (salvarBtn) salvarBtn.addEventListener('click', handleSaveProcedimento);

    if (tipoProcedimentoSelect && customTypeContainer && customTypeInput) {
        tipoProcedimentoSelect.addEventListener('change', function() {
            customTypeContainer.style.display = this.value === 'custom' ? 'block' : 'none';
            if (this.value !== 'custom') customTypeInput.value = '';
        });
    }

    // NOVO: Inicializa o editor TinyMCE no textarea de descrição
    // Garante que o tinymce está disponível globalmente antes de chamar init
    if (typeof tinymce !== 'undefined') {
        tinymce.init({
            selector: '#descricaoProcedimento', // Usa o ID do seu textarea
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount', // Plugins essenciais
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bulllist indent outdent | emoticons charmap | removeformat | searchreplace | code | help', // Barra de ferramentas
            menubar: 'file edit view insert format tools table help', // Menu superior
            height: 300, // Altura padrão do editor em pixels
            branding: false, // Remove a marca d'água "Powered by TinyMCE"
            setup: function(editor) {
                editor.on('init', function() {
                    tinyMCEEditor = editor; // Guarda a instância do editor
                    console.log('TinyMCE Editor inicializado no campo de descrição.');
                });
            } // Corrigido: Fechamento correto da função setup
        });
    } else {
        console.error("TinyMCE não está definido. Verifique se o script do TinyMCE foi carregado corretamente no HTML.");
    }
}