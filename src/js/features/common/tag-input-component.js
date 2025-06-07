// js/features/common/tag-input-component.js

import { obterEtiquetasUnicas } from '../procedures/procedure-data.js'; // Ajuste o caminho conforme sua estrutura real de pastas
import { getTagColor } from '/src/js/utils/color-helpers.js';

/**
 * Cria um chip de etiqueta para exibição.
 * @param {string} tagText O texto da etiqueta.
 * @param {string} tagColor A cor de fundo da etiqueta.
 * @returns {HTMLElement} O elemento <div> do chip.
 */
function createTagChip(tagText, tagColor) { // <-- NOVO PARÂMETRO tagColor
    const chip = document.createElement('div');
    chip.classList.add('tag-chip');
    chip.dataset.tag = tagText; // Armazena o valor da tag no dataset

    // NOVO: Aplica a cor de fundo
    chip.style.backgroundColor = tagColor; 

    const spanText = document.createElement('span');
    spanText.textContent = tagText;
    chip.appendChild(spanText);

    const removeBtn = document.createElement('span');
    removeBtn.classList.add('remove-tag');
    removeBtn.textContent = 'x';
    chip.appendChild(removeBtn);

    return chip;
}

/**
 * Componente para gerenciamento de entrada e exibição de tags (etiquetas).
 *
 * @param {string} inputElementId O ID do input de texto onde o usuário digita as tags.
 * @param {string} displayContainerId O ID do container DIV onde os chips de tags selecionadas serão exibidos.
 * @param {string} suggestionsDropdownId O ID do container DIV para o dropdown de sugestões de autocompletar.
 * @param {string} parentContainerId O ID do container DIV pai que engloba todo o componente de tags (para delegação de clique).
 * @param {Function} [onChangeCallback=() => {}] Callback opcional a ser chamado sempre que a lista de tags selecionadas é modificada (adicionada/removida).
 */
export function initTagInputComponent(inputElementId, displayContainerId, suggestionsDropdownId, parentContainerId, onChangeCallback = () => {}) { // <--- ASSINATURA DA FUNÇÃO CORRIGIDA AQUI!
    // Obtenção das referências aos elementos DOM
    const tagInput = document.getElementById(inputElementId);
    const selectedTagsDisplay = document.getElementById(displayContainerId);
    const suggestionsDropdown = document.getElementById(suggestionsDropdownId);
    // Obtém o container pai diretamente pelo ID
    const tagInputContainer = document.getElementById(parentContainerId); 

    // Validação de elementos DOM essenciais
    if (!tagInput || !selectedTagsDisplay || !suggestionsDropdown || !tagInputContainer) {
        console.error('Erro: Um ou mais elementos do componente de tags não foram encontrados. Verifique os IDs HTML e o ID do container pai.');
        // Retorna um objeto dummy para evitar ReferenceErrors se os elementos não existirem
        return {
            setTags: () => { console.warn('TagInputComponent não inicializado devido a erro de DOM.'); },
            getTags: () => [],
            clearTags: () => { console.warn('TagInputComponent não inicializado devido a erro de DOM.'); }
        };
    }

    let selectedTags = new Set(); // Usa Set para garantir a unicidade das tags atualmente selecionadas no componente
    let availableSuggestions = []; // Armazena a lista de sugestões filtradas atualmente visíveis

    /**
     * Renderiza (ou re-renderiza) os chips de tags selecionadas no `selectedTagsDisplay`.
     * Após a renderização, notifica o callback `onChangeCallback` com a lista atual de tags.
     */
    function renderSelectedTags() {
    selectedTagsDisplay.innerHTML = '';
    selectedTags.forEach(tag => {
        const tagColor = getTagColor(tag); // <-- OBTÉM A COR
        const chip = createTagChip(tag, tagColor); // <-- PASSA A COR PARA createTagChip
        selectedTagsDisplay.appendChild(chip);
    });
        // Garante que onChangeCallback é uma função antes de chamar.
        if (typeof onChangeCallback === 'function') { 
            onChangeCallback(Array.from(selectedTags)); // Notifica o observador externo
        } else {
            // Este console.warn é mais para depuração, normalmente não deve ocorrer
            console.warn('onChangeCallback não é uma função, ou não foi fornecido corretamente na inicialização.');
        }
    }

    /**
     * Adiciona uma tag à lista de `selectedTags` (se não estiver já presente) e re-renderiza.
     * Após a adição, limpa o input e esconde as sugestões.
     * @param {string} tagText O texto da tag a ser adicionada.
     */
    function addTag(tagText) {
        const trimmedTag = tagText.trim();
        if (!trimmedTag) return; // Ignora tags vazias ou apenas espaços

        // Verifica se a tag já está presente nos chips selecionados.
        // Se sim, não faz nada além de limpar o input e manter o foco.
        if (selectedTags.has(trimmedTag)) {
            tagInput.value = '';
            suggestionsDropdown.style.display = 'none';
            tagInput.focus();
            return;
        }

        // Adiciona a tag ao Set de tags selecionadas. Set naturalmente garante unicidade.
        selectedTags.add(trimmedTag);
        renderSelectedTags(); // Re-renderiza o display de chips com a nova tag
        tagInput.value = ''; // Limpa o input de texto após a adição
        suggestionsDropdown.style.display = 'none'; // Esconde o dropdown de sugestões
        tagInput.focus(); // Mantém o foco no input para permitir a adição contínua
    }

    /**
     * Remove uma tag da lista de `selectedTags` e re-renderiza.
     * @param {string} tagText O texto da tag a ser removida.
     */
    function removeTag(tagText) {
        if (selectedTags.delete(tagText)) { // Tenta remover a tag do Set
            renderSelectedTags(); // Se a remoção foi bem-sucedida, re-renderiza o display de chips
            // Se o input de tags ainda tem foco e está vazio, re-mostra as sugestões completas.
            if (document.activeElement === tagInput && !tagInput.value) {
                updateSuggestions(''); // Chamada com query vazia para mostrar todas as sugestões disponíveis
            }
        }
    }

    /**
     * Atualiza a lista de sugestões disponíveis (`availableSuggestions`) e exibe/oculta o `suggestionsDropdown`.
     * As sugestões são filtradas com base na `query` e excluem tags já selecionadas.
     * @param {string} query O texto atual no input, usado para filtrar sugestões.
     */
    function updateSuggestions(query) {
        // Obtém todas as etiquetas únicas do armazenamento global (como localStorage)
        const uniqueEtiquetasGlobais = obterEtiquetasUnicas(); 
        
        // Filtra as sugestões:
        // 1. A tag deve conter a `query` (se a `query` não for vazia).
        // 2. A tag NÃO deve já estar presente no `selectedTags` (para não sugerir o que já está selecionado).
        availableSuggestions = uniqueEtiquetasGlobais.filter(tag =>
            (query === '' || tag.toLowerCase().includes(query.toLowerCase())) &&
            !selectedTags.has(tag)
        );

        suggestionsDropdown.innerHTML = ''; // Limpa o conteúdo atual do dropdown de sugestões

        // Condição para mostrar ou esconder o dropdown:
        // Ele deve ser visível SOMENTE se houver sugestões disponíveis.
        if (availableSuggestions.length > 0) {
            availableSuggestions.forEach(tag => {
                const item = document.createElement('div');
                item.classList.add('tag-suggestion-item');
                item.textContent = tag;
                item.dataset.tag = tag; // Armazena a tag no dataset para fácil acesso no evento de clique
                suggestionsDropdown.appendChild(item);
            });
            suggestionsDropdown.style.display = 'block'; // Torna o dropdown visível
        } else {
            suggestionsDropdown.style.display = 'none'; // Esconde o dropdown se não houver sugestões
        }
    }

    // --- Configuração dos Event Listeners ---

    // 1. Evento 'input' no campo de texto:
    //    Disparado a cada tecla digitada. Responsável por atualizar a lista de sugestões em tempo real (autocompletar).
    tagInput.addEventListener('input', () => {
        updateSuggestions(tagInput.value);
    });

    // 2. Evento 'focus' no campo de texto:
    //    Disparado quando o input ganha foco (clique direto no input, tab para o input).
    //    Sempre atualiza as sugestões com o valor atual do input, mostrando todas se o input estiver vazio.
    tagInput.addEventListener('focus', () => {
        updateSuggestions(tagInput.value);
    });

    // 3. Evento 'click' no container pai (`tagInputContainer`):
    //    Este é o listener chave para o clique em qualquer lugar do container que não seja o input ou um chip.
    //    Ele garante que o `tagInput` receba o foco e as sugestões apareçam.
    tagInputContainer.addEventListener('click', (e) => {
        // Verifica se o clique não foi diretamente no input, nem em um chip de remoção, nem em um item de sugestão.
        // E também verifica se o `tagInput` não tem foco atualmente (para evitar chamar `focus()` repetidamente).
        if (e.target !== tagInput &&
            !e.target.closest('.tag-chip') && // Se o clique foi no chip ou no "x"
            !e.target.closest('.tag-suggestion-item') && // Se o clique foi em uma sugestão
            document.activeElement !== tagInput) {
            
            tagInput.focus(); // Força o foco no input
        }
    });

    // 4. Evento 'keydown' no campo de texto:
    //    Para adicionar tags ao pressionar 'Enter' ou 'vírgula'.
    tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault(); // Impede a submissão do formulário (no Enter) ou a inserção da vírgula no campo
            addTag(tagInput.value); // Tenta adicionar a tag digitada
        }
    });

    // 5. Evento 'click' no dropdown de sugestões (`suggestionsDropdown`):
    //    Usa delegação de eventos para capturar cliques em itens de sugestão.
    suggestionsDropdown.addEventListener('click', (e) => {
        const item = e.target.closest('.tag-suggestion-item');
        if (item) {
            addTag(item.dataset.tag); // Adiciona a tag cujo item foi clicado
        }
    });

    // 6. Evento 'click' no display de tags selecionadas (`selectedTagsDisplay`):
    //    Usa delegação de eventos para capturar cliques nos botões de remoção ('x') dos chips.
    selectedTagsDisplay.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-tag');
        if (removeBtn) {
            const chip = removeBtn.closest('.tag-chip');
            if (chip) {
                removeTag(chip.dataset.tag); // Remove a tag associada ao chip clicado
            }
        }
    });

    // 7. Evento 'blur': Disparado quando o input perde o foco. Esconde o dropdown de sugestões após um breve atraso.
    tagInput.addEventListener('blur', () => {
        // Um pequeno atraso é crucial para permitir que o clique em um item de sugestão seja processado antes do dropdown desaparecer.
        // Sem isso, o dropdown some antes do clique.
        setTimeout(() => {
            suggestionsDropdown.style.display = 'none';
        }, 150);
    });


    // --- Métodos de Exposição (API do componente) ---
    // Esses métodos permitem que outros módulos (como `procedure-form.js`) interajam com este componente.
    return {
        /**
         * Define as tags que devem ser exibidas como selecionadas.
         * Usado principalmente para preencher o formulário em modo de edição.
         * @param {string[]} tags Um array de strings representando as tags a serem definidas.
         */
        setTags: (tags) => {
            selectedTags.clear(); // Limpa todas as tags selecionadas atualmente
            // Adiciona as novas tags, garantindo que sejam limpas (trimadas) e válidas
            tags.forEach(tag => {
                const trimmedTag = tag.trim();
                if (trimmedTag) {
                    selectedTags.add(trimmedTag);
                }
            });
            renderSelectedTags(); // Re-renderiza o display de chips para refletir as novas tags
            tagInput.value = ''; // Garante que o input de texto esteja limpo
            suggestionsDropdown.style.display = 'none'; // Garante que as sugestões estejam escondidas ao definir tags programaticamente
        },
        /**
         * Retorna as tags que estão atualmente selecionadas e exibidas no componente.
         * @returns {string[]} Um array das tags selecionadas.
         */
        getTags: () => Array.from(selectedTags), // Converte o Set para Array antes de retornar
        /**
         * Limpa todas as tags selecionadas e reseta o componente para seu estado inicial.
         * Usado para resetar o formulário.
         */
        clearTags: () => {
            selectedTags.clear(); // Remove todas as tags do Set
            renderSelectedTags(); // Limpa o display de chips
            tagInput.value = ''; // Limpa o input de texto
            suggestionsDropdown.style.display = 'none'; // Esconde sugestões
        }
    };
}