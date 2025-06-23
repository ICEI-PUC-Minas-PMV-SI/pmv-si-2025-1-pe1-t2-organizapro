import { createModalController } from "../../utils/modal-controller.js";
import { salvarUpdate } from './upd-data.js';
import { initTagInputComponent } from '../../features/common/tag-input-component.js';
import { renderizarAtualizacoes, criarCardPainel } from './upd-renderer.js';

let currentEditId = null;
let etiquetasTagComponent = null;
let tinyMCEEditor = null;

let tituloUpdateInput, descricaoUpdateInput, statusUpdateSelect;

function limparCamposUpdateForm() {
    [tituloUpdateInput, statusUpdateSelect].forEach(el => {
        if (!el) return;
        if (el.tagName === "SELECT") {
            el.value = (el.id === "statusUpdate") ? "Ativo" : "";
        } else {
            el.value = "";
        }
    });
    etiquetasTagComponent?.clearTags();
    tinyMCEEditor?.setContent('');
}

function fecharModalUpdate() {
    if (window.formModalController) {
        window.formModalController.fechar();
        window.formModalController.dispararLimpeza();
    }
    currentEditId = null;
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

    const etiquetasFinal = etiquetasTagComponent ? etiquetasTagComponent.getTags() : [];

    const dadosDoFormulario = {
        titulo,
        descricao,
        etiquetas: etiquetasFinal,
        status,
    };

    await salvarUpdate(dadosDoFormulario, currentEditId);
    alert(currentEditId ? "Update atualizado com sucesso!" : "Nova atualização salva com sucesso!");

    fecharModalUpdate();

    await renderizarAtualizacoes('panel-cards-container', criarCardPainel);
}

export function setUpdateForEditing(update) {
    if (!window.formModalController) {
        console.error("formModalController não está inicializado para setUpdateForEditing.");
        return;
    }

    currentEditId = update.id || null;
    window.formModalController.setTitulo("Editar Update");
    window.formModalController.dispararLimpeza();

    if (tituloUpdateInput) tituloUpdateInput.value = update.titulo || "";
    if (tinyMCEEditor) tinyMCEEditor.setContent(update.descricao || "");
    else if (descricaoUpdateInput) descricaoUpdateInput.value = update.descricao || "";
    if (statusUpdateSelect) statusUpdateSelect.value = update.status || "Ativo";

    if (etiquetasTagComponent) {
        if (update.etiquetas) etiquetasTagComponent.setTags(update.etiquetas);
        else etiquetasTagComponent.clearTags();
    }

    window.formModalController.abrir();
}

export function initUpdateForm() {
    const controllerInstance = createModalController('modal-form-update', 'tituloModal');
    if (!controllerInstance) {
        console.error("Falha ao criar o modal controller.");
        return null;
    }
    window.formModalController = controllerInstance;

    tituloUpdateInput = document.getElementById("tituloUpdate");
    descricaoUpdateInput = document.getElementById("descricaoUpdate");
    statusUpdateSelect = document.getElementById("statusUpdate");

    if (!tituloUpdateInput || !descricaoUpdateInput || !statusUpdateSelect) {
        console.error("Elementos essenciais do formulário não encontrados.");
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
            setup: editor => { tinyMCEEditor = editor; }
        });
    } else {
        console.warn("Elemento 'descricaoUpdateInput' não encontrado, TinyMCE não será inicializado.");
    }

    const salvarBtn = document.getElementById("salvar-upd");
    const fecharModalBtn = document.getElementById("fechar-modal-upd");
    const cancelarBtn = document.getElementById("cancelar-upd");

    if (salvarBtn) salvarBtn.addEventListener('click', handleSaveUpdate);
    else console.warn("Botão 'salvar-upd' não encontrado.");

    if (fecharModalBtn) fecharModalBtn.addEventListener('click', fecharModalUpdate);
    if (cancelarBtn) cancelarBtn.addEventListener('click', fecharModalUpdate);

    limparCamposUpdateForm();

    return controllerInstance;
}
