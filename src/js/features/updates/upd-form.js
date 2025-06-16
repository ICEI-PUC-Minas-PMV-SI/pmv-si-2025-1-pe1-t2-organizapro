import { createModalController } from "../../utils/modal-controller.js";
import { salvarUpdate, obterUpdatePorId } from './upd-data.js';
import { initTagInputComponent } from '../../features/common/tag-input-component.js';
import { renderizarAtualizacoes } from './upd-renderer.js';
import { criarCardPadrao } from './upd-renderer.js';

let currentEditId = null;
let etiquetasTagComponent = null;
let tinyMCEEditor = null;


let tituloUpdateInput, descricaoUpdateInput, statusUpdateSelect, arquivoUpdateInput, customTypeContainer, customTypeInput;

function limparCamposUpdateForm() {
    const campos = [
        tituloUpdateInput,
        statusUpdateSelect,
        arquivoUpdateInput,
        customTypeInput
    ];

    campos.forEach(el => {
        if (el) {
            if (el.tagName === "SELECT") {
                el.value = (el.id === "statusUpdate") ? "Ativo" : "";
            } else {
                el.value = "";
            }
        }
    });

    etiquetasTagComponent?.clearTags();
    if (customTypeContainer) customTypeContainer.style.display = 'none';
    tinyMCEEditor?.setContent('');
}

function fecharModalUpdate() {
    if (window.formModalController) {
        window.formModalController.fechar();
        window.formModalController.dispararLimpeza();
    }
    currentEditId = null;
}

function popularSelect(selectElement, options, customOptionValue = 'custom') {
    if (!selectElement) return;
}

function validarFormulario() {
    const titulo = tituloUpdateInput?.value.trim() || "";

    if (!titulo) {
        alert("Por favor, preencha o título da atualização.");
        tituloUpdateInput?.focus();
        return false;
    }

    return true;
}

async function handleSaveUpdate(event) {
    event.preventDefault();

    if (!validarFormulario()) return;

    const titulo = tituloUpdateInput.value.trim();
    const descricao = tinyMCEEditor ? tinyMCEEditor.getContent() : descricaoUpdateInput.value.trim();
    const status = statusUpdateSelect.value;
    const nomeArquivo = arquivoUpdateInput?.files[0]?.name || "";

    const etiquetasFinal = etiquetasTagComponent ? etiquetasTagComponent.getTags() : [];

    const dadosDoFormulario = {
        titulo,
        descricao,
        etiquetas: etiquetasFinal,
        status,
        arquivo: nomeArquivo
    };

    if (currentEditId) {
        const criarNovaVersao = confirm("Deseja criar uma nova versão desta atualização?");
        if (criarNovaVersao) {
            alert("Lógica de criação de nova versão precisa ser implementada ou importada!");
        } else {
            await salvarUpdate(dadosDoFormulario, currentEditId);
            alert("Update atualizado com sucesso!");
        }
    } else {
        await salvarUpdate(dadosDoFormulario);
        alert("Nova atualização salva com sucesso!");
    }

    fecharModalUpdate();

    await renderizarAtualizacoes('panel-cards-container', criarCardPadrao);
}

export function setUpdateForEditing(update, isDuplicando = false) {
    if (!window.formModalController) {
        console.error("formModalController não está inicializado para setUpdateForEditing. Verifique a ordem de initUpdateForm.");
        return;
    }

    currentEditId = isDuplicando ? null : update.id;
    window.formModalController.setTitulo(isDuplicando ? "Duplicar Update" : "Editar Update");
    window.formModalController.dispararLimpeza();

    const tituloBase = (update.titulo || "").replace(/\s*\(versão\s*\d+\)$/i, "").trim();
    if (tituloUpdateInput) {
        tituloUpdateInput.value = isDuplicando ? `${tituloBase} (cópia)` : tituloBase;
    }

    if (tinyMCEEditor) {
        tinyMCEEditor.setContent(update.descricao || '');
    } else if (descricaoUpdateInput) {
        descricaoUpdateInput.value = update.descricao || '';
    }

    if (statusUpdateSelect) {
        statusUpdateSelect.value = update.status || 'Ativo';
    }

    if (etiquetasTagComponent) {
        if (update.etiquetas) {
            etiquetasTagComponent.setTags(update.etiquetas);
        } else {
            etiquetasTagComponent.clearTags();
        }
    }

    if (arquivoUpdateInput) arquivoUpdateInput.value = '';

    window.formModalController.abrir();
}

export function initUpdateForm() {

    const controllerInstance = createModalController('modal-form-update', 'tituloModal');
    if (!controllerInstance) {
        console.error("Falha ao criar o modal controller. createModalController retornou null.");
        return null;
    }
    window.formModalController = controllerInstance;

    const botaoCriar = document.querySelector(".button--criar");
    const fecharModalBtn = document.getElementById("fechar-modal-upd");
    const cancelarBtn = document.getElementById("cancelar-upd");
    const salvarBtn = document.getElementById("salvar-upd");

    tituloUpdateInput = document.getElementById("tituloUpdate");
    descricaoUpdateInput = document.getElementById("descricaoUpdate");
    statusUpdateSelect = document.getElementById("statusUpdate");
    arquivoUpdateInput = document.getElementById("arquivoUpdate");
    customTypeContainer = document.getElementById('custom-type-container');
    customTypeInput = document.getElementById('custom-type-input');

    if (!tituloUpdateInput || !descricaoUpdateInput || !statusUpdateSelect) {
        console.error("Um ou mais elementos essenciais do formulário de atualização não foram encontrados no DOM.");
    }

    controllerInstance.definirCallbackDeLimpeza(limparCamposUpdateForm);

    etiquetasTagComponent = initTagInputComponent(
        'etiquetasInput',
        'selected-tags-display',
        'etiquetas-suggestions',
        'etiquetas-container',
        updatedTags => console.log('Etiquetas atualizadas:', updatedTags)
    );

    if (descricaoUpdateInput) {
        tinymce.init({
            target: descricaoUpdateInput,
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
            setup: editor => {
                tinyMCEEditor = editor;
            }
        });
    } else {
        console.warn("Elemento 'descricaoUpdateInput' não encontrado, TinyMCE não será inicializado.");
    }

    if (salvarBtn) {
        salvarBtn.addEventListener('click', handleSaveUpdate);
    } else {
        console.warn("Botão 'salvar-upd' não encontrado no modal do formulário.");
    }

    if (fecharModalBtn) fecharModalBtn.addEventListener('click', fecharModalUpdate);
    if (cancelarBtn) cancelarBtn.addEventListener('click', fecharModalUpdate);

    limparCamposUpdateForm();

    return controllerInstance;
}