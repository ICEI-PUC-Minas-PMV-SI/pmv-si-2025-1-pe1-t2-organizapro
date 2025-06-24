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

function parseDateLocalYYYYMMDD(dateString) {
    if (!dateString) return null;
    const parts = dateString.split('-');
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
}

export function salvarTarefa(tarefaDados, id = null) {

    console.info('DEBUG salvarTarefa, tags recebidas:', tarefaDados.tags);

    if (!tarefaDados.titulo || typeof tarefaDados.titulo !== 'string') {
        console.warn('WARN: Título inválido ou ausente na tarefa.');
        return null;
    }

    let targetTask = null;
    let isNewTask = false;
    let dataVencISO = '';

    if (tarefaDados.dataVencimento) {
        const dt = parseDateLocalYYYYMMDD(tarefaDados.dataVencimento);
        if (dt) {
            dataVencISO = dt.toISOString();
        } else {
            console.warn('WARN: Data de vencimento inválida', tarefaDados.dataVencimento);
        }
    }

    if (id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            targetTask = { ...tasks[index], ...tarefaDados };
            targetTask.dataVencimento = dataVencISO;
            targetTask.tags = Array.isArray(tarefaDados.tags) ? tarefaDados.tags : [];
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
            dataVencimento: dataVencISO,
            status: tarefaDados.status || 'a-fazer',
            concluida: tarefaDados.status === 'concluido',
            criadaEm: new Date().toISOString()
        };
        tasks.push(targetTask);
        console.info('DEBUG: Nova tarefa criada com ID:', targetTask.id);
    }

    saveTasks();

    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
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
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
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

function startOfLocalDay(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

export function getTarefasDeHoje() {
    const hojeInicio = startOfLocalDay(new Date());

    return tasks.filter(task => {
        if (task.concluida) return false;
        if (!task.dataVencimento) return false;

        const taskDate = startOfLocalDay(new Date(task.dataVencimento));
        if (isNaN(taskDate.getTime())) {
            console.warn(`WARN: Data inválida para tarefa: ${task.id} - ${task.dataVencimento}`);
            return false;
        }

        return taskDate.getTime() === hojeInicio.getTime();
    });
}

export function getTarefasProximos7Dias() {
    const hojeInicio = startOfLocalDay(new Date());
    const daqui7DiasFim = new Date(hojeInicio);
    daqui7DiasFim.setDate(hojeInicio.getDate() + 7);
    daqui7DiasFim.setHours(23, 59, 59, 999);

    return tasks.filter(task => {
        if (task.concluida) return false;
        if (!task.dataVencimento) return false;

        const taskDate = startOfLocalDay(new Date(task.dataVencimento));
        if (isNaN(taskDate.getTime())) {
            console.warn(`WARN: Data inválida para tarefa: ${task.id} - ${task.dataVencimento}`);
            return false;
        }

        return taskDate.getTime() >= hojeInicio.getTime() && taskDate.getTime() <= daqui7DiasFim.getTime();
    });
}
