import { createModalController } from "../../core/modal.js";
import {
    obterEtiquetasUnicas,
    obterTiposUnicos,
    salvarProcedimento,
    obterProcedimentoPorId,
    criarNovaVersaoProcedimento
} from './procedure-data.js';
import { atualizarTabela } from '../../features/common/filter-controls.js';
import { initTagInputComponent } from '../../features/common/tag-input-component.js';

let currentEditId = null;
let etiquetasTagComponent = null;
let formModalController = null;
let tinyMCEEditor = null;

let botaoCriar, fecharModalBtn, cancelarBtn, salvarBtn;
let tituloProcedimentoInput, descricaoProcedimentoInput, tipoProcedimentoSelect;
let statusProcedimentoSelect, arquivoProcedimentoInput;
let customTypeContainer, customTypeInput;

function limparCamposProcedimentoForm() {
    const campos = [
        tituloProcedimentoInput,
        statusProcedimentoSelect,
        arquivoProcedimentoInput,
        tipoProcedimentoSelect,
        customTypeInput
    ];

    campos.forEach(el => {
        if (!el) return;
        if (el.tagName === "SELECT") {
            el.value = (el.id === "statusProcedimento") ? "Ativo" : "";
        } else {
            el.value = "";
        }
    });

    if (etiquetasTagComponent) etiquetasTagComponent.clearTags();
    if (customTypeContainer) customTypeContainer.style.display = 'none';
    if (tinyMCEEditor) tinyMCEEditor.setContent('');
}

function fecharModalProcedimento() {
    if (formModalController) {
        formModalController.fechar();
        formModalController.dispararLimpeza();
    }
    currentEditId = null;
}

function popularSelect(selectElement, options, customOptionValue = 'custom') {
    if (!selectElement) return;

    const customOption = Array.from(selectElement.options).find(opt => opt.value === customOptionValue);
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

function validarFormulario() {
    const titulo = tituloProcedimentoInput?.value.trim() || "";
    const tipoSelecionado = tipoProcedimentoSelect?.value || "";
    const tipoFinal = tipoSelecionado === 'custom' ? customTypeInput?.value.trim() : tipoSelecionado;

    if (tipoSelecionado === 'custom' && !customTypeInput?.value.trim()) {
        alert('Por favor, informe o tipo personalizado.');
        customTypeInput.focus();
        return false;
    }

    if (!titulo) {
        alert("Por favor, preencha o título do procedimento.");
        tituloProcedimentoInput.focus();
        return false;
    }

    if (!tipoFinal) {
        alert("Por favor, preencha o tipo do procedimento.");
        tipoProcedimentoSelect.focus();
        return false;
    }

    return true;
}

async function handleSaveProcedimento(event) {
    event.preventDefault();

    if (!validarFormulario()) return;

    const titulo = tituloProcedimentoInput.value.trim();
    const descricao = tinyMCEEditor ? tinyMCEEditor.getContent() : descricaoProcedimentoInput.value.trim();
    const status = statusProcedimentoSelect.value;
    const nomeArquivo = arquivoProcedimentoInput?.files[0]?.name || "";

    const tipoFinal = tipoProcedimentoSelect.value === 'custom'
        ? customTypeInput.value.trim()
        : tipoProcedimentoSelect.value;

    const etiquetasFinal = etiquetasTagComponent ? etiquetasTagComponent.getTags() : [];

    const dadosDoFormulario = {
        titulo,
        descricao,
        etiquetas: etiquetasFinal,
        status,
        tipo: tipoFinal,
        arquivo: nomeArquivo
    };

    if (currentEditId) {
        const criarNovaVersao = confirm("Deseja criar uma nova versão deste procedimento?");

        if (criarNovaVersao) {
            const novaVersao = criarNovaVersaoProcedimento(currentEditId, dadosDoFormulario);
            if (novaVersao) {
                alert("Nova versão do procedimento criada e a anterior inativada com sucesso!");
            } else {
                alert("Erro ao criar nova versão do procedimento. Verifique o console.");
            }
        } else {
            await salvarProcedimento(dadosDoFormulario, currentEditId);
            alert("Procedimento atualizado com sucesso!");
        }
    } else {
        await salvarProcedimento(dadosDoFormulario);
        alert("Novo procedimento salvo com sucesso!");
    }

    atualizarTabela();
    fecharModalProcedimento();
}

export function setProcedimentoParaEdicao(procedimento, isDuplicating = false) {
    if (!formModalController) {
        console.error("formModalController não inicializado.");
        return;
    }

    currentEditId = isDuplicating ? null : procedimento.id;
    formModalController.setTitulo(isDuplicating ? "Duplicar Procedimento" : "Editar Procedimento");
    formModalController.dispararLimpeza();

    const tituloBase = (procedimento.titulo || "").replace(/\s*\(versão\s*\d+\)$/i, "").trim();
    tituloProcedimentoInput.value = isDuplicating ? `${tituloBase} (cópia)` : tituloBase;

    if (tinyMCEEditor) {
        tinyMCEEditor.setContent(procedimento.descricao || '');
    } else if (descricaoProcedimentoInput) {
        descricaoProcedimentoInput.value = procedimento.descricao || '';
    }

    statusProcedimentoSelect.value = procedimento.status || 'Ativo';

    popularSelect(tipoProcedimentoSelect, obterTiposUnicos(), 'custom');

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

    if (etiquetasTagComponent && procedimento.etiquetas) {
        etiquetasTagComponent.setTags(procedimento.etiquetas);
    } else if (etiquetasTagComponent) {
        etiquetasTagComponent.clearTags();
    }

    if (arquivoProcedimentoInput) arquivoProcedimentoInput.value = '';

    formModalController.abrir();
}

export function initProcedureForm() {
    formModalController = createModalController('modal-procedure', 'tituloModal');
    if (!formModalController) {
        console.error("Falha ao inicializar o modal do formulário de procedimento.");
        return;
    }

    botaoCriar = document.querySelector(".button--criar");
    fecharModalBtn = document.getElementById("fechar-modal");
    cancelarBtn = document.getElementById("cancelar");
    salvarBtn = document.getElementById("salvar");
    tituloProcedimentoInput = document.getElementById("tituloProcedimento");
    descricaoProcedimentoInput = document.getElementById("descricaoProcedimento");
    tipoProcedimentoSelect = document.getElementById('tipoProcedimento');
    statusProcedimentoSelect = document.getElementById("statusProcedimento");
    arquivoProcedimentoInput = document.getElementById("arquivoProcedimento");
    customTypeContainer = document.getElementById('custom-type-container');
    customTypeInput = document.getElementById('custom-type-input');

    formModalController.definirCallbackDeLimpeza(limparCamposProcedimentoForm);

    etiquetasTagComponent = initTagInputComponent(
        'etiquetasInput',
        'selected-tags-display',
        'etiquetas-suggestions',
        'etiquetas-container',
        updatedTags => console.log('Etiquetas atualizadas:', updatedTags)
    );

    if (botaoCriar) {
        botaoCriar.addEventListener('click', () => {
            formModalController.setTitulo("Novo Procedimento");
            formModalController.dispararLimpeza();
            popularSelect(tipoProcedimentoSelect, obterTiposUnicos(), 'custom');
            formModalController.abrir();
            currentEditId = null;
        });
    }

    if (fecharModalBtn) fecharModalBtn.addEventListener('click', fecharModalProcedimento);
    if (cancelarBtn) cancelarBtn.addEventListener('click', fecharModalProcedimento);
    if (salvarBtn) salvarBtn.addEventListener('click', handleSaveProcedimento);

    if (tipoProcedimentoSelect && customTypeContainer && customTypeInput) {
        tipoProcedimentoSelect.addEventListener('change', () => {
            if (tipoProcedimentoSelect.value === 'custom') {
                customTypeContainer.style.display = 'block';
                customTypeInput.focus();
            } else {
                customTypeContainer.style.display = 'none';
                customTypeInput.value = '';
            }
        });
    }

    if (descricaoProcedimentoInput) {
        tinymce.init({
            target: descricaoProcedimentoInput,
            height: 300,
            menubar: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor',
                'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | help',
            setup: function (editor) {
                tinyMCEEditor = editor;
            }
        });
    }

    limparCamposProcedimentoForm();
}