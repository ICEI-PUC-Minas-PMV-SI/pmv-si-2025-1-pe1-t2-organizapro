// src/js/features/tasks/task-data.js

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.info('DEBUG: Tarefas salvas no localStorage.');
    } catch (e) {
        console.error('ERRO: Falha ao salvar tarefas no localStorage:', e);
        alert('Não foi possível salvar as tarefas. O armazenamento local pode estar cheio ou inacessível.');
    }
}

export function getTasks() {
    console.info('DEBUG: Obtendo tarefas. Total:', tasks.length);
    return tasks;
}

export function obterTarefaPorId(id) {
    const tarefaEncontrada = tasks.find(task => task.id === id);
    console.info(`DEBUG: Buscando tarefa por ID ${id}. Encontrada: ${Boolean(tarefaEncontrada)}`);
    return tarefaEncontrada;
}

function gerarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export function salvarTarefa(tarefaDados, id = null) {
    if (!tarefaDados.titulo || typeof tarefaDados.titulo !== 'string') {
        console.warn('WARN: Título inválido ou ausente na tarefa.');
        return null;
    }

    let targetTask = null;
    let isNewTask = false;

    if (id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            targetTask = { ...tasks[index], ...tarefaDados };
            if (tarefaDados.status) {
                targetTask.status = tarefaDados.status;
                targetTask.concluida = (tarefaDados.status === 'concluido');
            }
            tasks[index] = targetTask;
            console.info(`DEBUG: Tarefa com ID ${id} atualizada.`);
        } else {
            console.warn(`WARN: Tentativa de atualizar tarefa com ID ${id} não encontrada. Criando nova.`);
            isNewTask = true;
        }
    } else {
        isNewTask = true;
    }

    if (isNewTask) {
        targetTask = {
            id: gerarIdUnico(),
            titulo: tarefaDados.titulo,
            descricao: tarefaDados.descricao || '',
            tags: Array.isArray(tarefaDados.tags) ? tarefaDados.tags : [],
            dataVencimento: tarefaDados.dataVencimento || '',
            status: tarefaDados.status || 'a-fazer',
            concluida: tarefaDados.status === 'concluido',
            criadaEm: new Date().toISOString()
        };
        tasks.push(targetTask);
        console.info('DEBUG: Nova tarefa criada com ID:', targetTask.id);
    }

    saveTasks();
    return targetTask;
}

export function excluirTarefa(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks();
        console.info(`DEBUG: Tarefa com ID ${id} excluída.`);
        return true;
    }
    console.warn(`WARN: Tentativa de excluir tarefa com ID ${id} não encontrada.`);
    return false;
}

export function toggleConcluida(id, concluida) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.concluida = concluida;
        task.status = concluida ? 'concluido' : (task.status === 'concluido' ? 'a-fazer' : task.status);
        
        saveTasks();
        console.info(`DEBUG: Status conclusão da tarefa ${id} para ${concluida}. Novo status: ${task.status}`);
        return true;
    }
    console.warn(`WARN: Tarefa com ID ${id} não encontrada para toggleConcluida.`);
    return false;
}

export function atualizarStatusTarefa(id, newStatus) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = newStatus;
        task.concluida = (newStatus === 'concluido');
        saveTasks();
        console.info(`DEBUG: Status da tarefa ${id} atualizado para '${newStatus}'. Concluída: ${task.concluida}`);
        return true;
    }
    console.warn(`WARN: Tarefa com ID ${id} não encontrada para atualizarStatusTarefa.`);
    return false;
}

export function getUniqueTaskTags() {
    const allTags = tasks.flatMap(task => task.tags || []);
    const uniqueTags = [...new Set(allTags)];
    console.info('DEBUG: Etiquetas únicas obtidas:', uniqueTags.length);
    return uniqueTags.sort();
}

export function getUniqueTaskTypes() {
    const types = new Set();
    getTasks().forEach(task => {
        if (task.type) types.add(task.type);
    });
    return Array.from(types).sort();
}

export function getUniqueTaskDueDates() { 
    const dates = new Set();
    getTasks().forEach(task => {
        if (task.dataVencimento && new Date(task.dataVencimento).toString() !== 'Invalid Date') { 
            dates.add(task.dataVencimento);
        }
    });
    const uniqueDatesArray = Array.from(dates);
    return uniqueDatesArray.sort((a, b) => b.localeCompare(a));
}

function formatDateToISO(date) {
    if (!date || isNaN(date.getTime())) {
        return null;
    }
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

function startOfDay(dateInput) {
    const d = new Date(dateInput);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function getTarefasDeHoje() {
    const hojeISO = formatDateToISO(new Date());
    if (hojeISO === null) return [];

    return tasks.filter(task => {
        if (task.concluida) return false; 

        if (!task.dataVencimento) return false;

        const taskDate = new Date(task.dataVencimento);
        if (isNaN(taskDate.getTime())) {
            console.warn(`WARN: Invalid 'dataVencimento' for task: ${task.id} - ${task.dataVencimento}`);
            return false;
        }
        return formatDateToISO(taskDate) === hojeISO;
    });
}

export function getTarefasProximos7Dias() {
    const hojeInicio = startOfDay(new Date());
    const daqui7DiasFim = new Date(hojeInicio);
    daqui7DiasFim.setDate(hojeInicio.getDate() + 7);
    daqui7DiasFim.setHours(23, 59, 59, 999); 

    return tasks.filter(task => {
        if (task.concluida) return false;

        if (!task.dataVencimento) return false;

        const taskDateInicio = startOfDay(new Date(task.dataVencimento));
        if (isNaN(taskDateInicio.getTime())) {
            console.warn(`WARN: Invalid 'dataVencimento' for task: ${task.id} - ${task.dataVencimento}`);
            return false;
        }
        
        return taskDateInicio.getTime() >= hojeInicio.getTime() && taskDateInicio.getTime() <= daqui7DiasFim.getTime();
    });
}