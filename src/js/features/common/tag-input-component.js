import { obterEtiquetasUnicas } from '../procedures/procedure-data.js';
import { getTagColor } from '/src/js/utils/color-helpers.js';

function createTagChip(tagText, tagColor) {
    console.log('Criando chip para:', tagText, 'com cor:', tagColor);

    const chip = document.createElement('div');
    chip.classList.add('tag');
    chip.dataset.tag = tagText;
    chip.style.backgroundColor = tagColor || getTagColor(tagText);

    const spanText = document.createElement('span');
    spanText.textContent = tagText;
    chip.appendChild(spanText);

    const removeBtn = document.createElement('span');
    removeBtn.classList.add('remove-tag');
    removeBtn.textContent = 'x';
    chip.appendChild(removeBtn);

    return chip;
}


export function initTagInputComponent(inputElementId, displayContainerId, suggestionsDropdownId, parentContainerId, onChangeCallback = () => { }) {
    const tagInput = document.getElementById(inputElementId);
    const selectedTagsDisplay = document.getElementById(displayContainerId);
    const suggestionsDropdown = document.getElementById(suggestionsDropdownId);
    const tagInputContainer = document.getElementById(parentContainerId);

    if (!tagInput || !selectedTagsDisplay || !suggestionsDropdown || !tagInputContainer) {
        console.error('Erro: Um ou mais elementos do componente de tags não foram encontrados.');
        return {
            setTags: () => { console.warn('TagInputComponent não inicializado devido a erro de DOM.'); },
            getTags: () => [],
            clearTags: () => { console.warn('TagInputComponent não inicializado devido a erro de DOM.'); }
        };
    }

    let selectedTags = new Set();
    let availableSuggestions = [];

    function renderSelectedTags() {
        selectedTagsDisplay.innerHTML = '';
        selectedTags.forEach(tag => {
            const tagColor = getTagColor(tag);
            console.log('Renderizando tag:', tag, 'com cor:', tagColor);
            const chip = createTagChip(tag, tagColor);
            selectedTagsDisplay.appendChild(chip);
        });
        if (typeof onChangeCallback === 'function') {
            onChangeCallback(Array.from(selectedTags));
        }
    }


    function addTag(tagText) {
        const trimmedTag = tagText.trim();
        if (!trimmedTag) return;

        console.log('Chamando addTag com:', trimmedTag);

        if (selectedTags.has(trimmedTag)) {
            tagInput.value = '';
            suggestionsDropdown.style.display = 'none';
            tagInput.focus();
            return;
        }

        selectedTags.add(trimmedTag);
        console.log('addTag - tags agora:', Array.from(selectedTags));

        renderSelectedTags();
        tagInput.value = '';
        suggestionsDropdown.style.display = 'none';
        tagInput.focus();
    }

    function removeTag(tagText) {
        if (selectedTags.delete(tagText)) {
            renderSelectedTags();
            if (document.activeElement === tagInput && !tagInput.value) {
                updateSuggestions('');
            }
        }
    }

    function updateSuggestions(query) {
        query = (typeof query === 'string') ? query : '';
        const uniqueEtiquetasGlobais = obterEtiquetasUnicas();
        availableSuggestions = uniqueEtiquetasGlobais.filter(tag =>
            (query === '' || tag.toLowerCase().includes(query.toLowerCase())) &&
            !selectedTags.has(tag)
        );

        suggestionsDropdown.innerHTML = '';

        if (availableSuggestions.length > 0) {
            availableSuggestions.forEach(tag => {
                const item = document.createElement('div');
                item.classList.add('tag-suggestion-item');
                item.textContent = tag;
                item.dataset.tag = tag;
                suggestionsDropdown.appendChild(item);
            });
            suggestionsDropdown.style.display = 'block';
        } else {
            suggestionsDropdown.style.display = 'none';
        }
    }

    tagInput.addEventListener('input', () => {
        updateSuggestions(tagInput.value);
        if (tagInput.value.trim() !== '') {
            suggestionsDropdown.style.display = 'block';
        } else {
            suggestionsDropdown.style.display = 'none';
        }
    });


    tagInput.addEventListener('focus', () => {
        // Se input vazio, mostra todas as sugestões
        if (tagInput.value.trim() === '') {
            updateSuggestions('');   // mostra todas sugestões
            suggestionsDropdown.style.display = 'block';
        } else {
            // Se tiver texto, mostra só sugestões filtradas
            updateSuggestions(tagInput.value);
            suggestionsDropdown.style.display = 'block';
        }
    });

    tagInputContainer.addEventListener('mouseleave', () => {
        if (document.activeElement !== tagInput) {
            suggestionsDropdown.style.display = 'none';
        }
    });

    tagInputContainer.addEventListener('click', (e) => {
        if (e.target !== tagInput &&
            !e.target.closest('.tag') &&
            !e.target.closest('.tag-suggestion-item') &&
            document.activeElement !== tagInput) {
            tagInput.focus();
        }
    });

    tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(tagInput.value);
        }
    });

    suggestionsDropdown.addEventListener('mousedown', (e) => {
        const item = e.target.closest('.tag-suggestion-item');
        if (item) {
            addTag(item.dataset.tag);
        }
    });


    selectedTagsDisplay.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-tag');
        if (removeBtn) {
            const chip = removeBtn.closest('.tag');
            if (chip) {
                removeTag(chip.dataset.tag);
            }
        }
    });

    tagInput.addEventListener('blur', () => {
        setTimeout(() => {
            if (!suggestionsDropdown.contains(document.activeElement)) {
                suggestionsDropdown.style.display = 'none';
            }
        }, 150);
    });

    return {
        setTags: (tags) => {
            selectedTags.clear();
            tags.forEach(tag => {
                const trimmedTag = tag.trim();
                if (trimmedTag) {
                    selectedTags.add(trimmedTag);
                }
            });
            renderSelectedTags();
            tagInput.value = '';
            suggestionsDropdown.style.display = 'none';
        },
        getTags: () => Array.from(selectedTags),
        clearTags: () => {
            selectedTags.clear();
            renderSelectedTags();
            tagInput.value = '';
            suggestionsDropdown.style.display = 'none';
        },

        addTag: addTag,

        atualizarSugestoes: (query = '') => {
            updateSuggestions(query);
        }

    };
}
