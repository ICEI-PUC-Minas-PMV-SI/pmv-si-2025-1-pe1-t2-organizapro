export function getIncludesConfig(path) {
    const page = path.split('/').pop() || 'index.html';

    const baseIncludesPath = '/src/includes/';
    const includes = [];

    if (page === 'index.html') {
        includes.push(
            { name: 'header', targetId: 'header', filePath: `${baseIncludesPath}layout/header.html` },
            { name: 'sidebar', targetId: 'sidebar-wrapper', filePath: `${baseIncludesPath}layout/sidebar.html` },

            { name: 'recentUpd', targetId: 'recent-updates-widget-placeholder', filePath: `${baseIncludesPath}widgets/recent-updates-widget.html` },
            { name: 'favoritesWidget', targetId: 'favorites-widget-placeholder', filePath: `${baseIncludesPath}widgets/favorites-widget.html` },
            { name: 'tasksWidget', targetId: 'tasks-widget-placeholder', filePath: `${baseIncludesPath}widgets/tasks-widget.html` },

            { name: 'modalTaskForm', targetId: 'modal-task-form-placeholder', filePath: `${baseIncludesPath}modals/modal-task-form.html` },
            { name: 'modalTaskSidebar', targetId: 'modal-task-sidebar-placeholder', filePath: `${baseIncludesPath}modals/modal-task-sidebar.html` },

            { name: 'modalFormUpdate', targetId: 'modal-form-update-placeholder', filePath: `${baseIncludesPath}modals/modal-form-update.html` },
            { name: 'modalFormProcedure', targetId: 'modal-form-procedure-placeholder', filePath: `${baseIncludesPath}modals/modal-form-procedure.html` },
            { name: 'modalViewProcedure', targetId: 'modal-view-procedure-placeholder', filePath: `${baseIncludesPath}modals/modal-view-procedure.html` },
            { name: 'modalVersionProcedure', targetId: 'modal-version-procedure-placeholder', filePath: `${baseIncludesPath}modals/modal-version-procedure.html` },
            { name: 'modalForgotPassword', targetId: 'modal-forgot-password-placeholder', filePath: `${baseIncludesPath}modals/modal-forgot-password.html` }
        );
    } else if (page === 'control-panel.html') {
        includes.push(
            { name: 'header', targetId: 'header', filePath: `${baseIncludesPath}layout/header.html` },
            { name: 'sidebar', targetId: 'sidebar-wrapper', filePath: `${baseIncludesPath}layout/sidebar.html` },

            { name: 'modalTaskForm', targetId: 'modal-task-form-placeholder', filePath: `${baseIncludesPath}modals/modal-task-form.html` },
            { name: 'modalTaskSidebar', targetId: 'modal-task-sidebar-placeholder', filePath: `${baseIncludesPath}modals/modal-task-sidebar.html` },

            { name: 'modalFormProcedure', targetId: 'modal-form-procedure-placeholder', filePath: `${baseIncludesPath}modals/modal-form-procedure.html` },
            { name: 'modalViewProcedure', targetId: 'modal-view-procedure-placeholder', filePath: `${baseIncludesPath}modals/modal-view-procedure.html` },
            { name: 'modalVersionProcedure', targetId: 'modal-version-procedure-placeholder', filePath: `${baseIncludesPath}modals/modal-version-procedure.html` }
        );
    }

    else if (page === 'upd-panel.html') {
        includes.push(
            { name: 'header', targetId: 'header', filePath: `${baseIncludesPath}layout/header.html` },
            { name: 'sidebar', targetId: 'sidebar-wrapper', filePath: `${baseIncludesPath}layout/sidebar.html` },

            { name: 'modalTaskForm', targetId: 'modal-task-form-placeholder', filePath: `${baseIncludesPath}modals/modal-task-form.html` },
            { name: 'modalTaskSidebar', targetId: 'modal-task-sidebar-placeholder', filePath: `${baseIncludesPath}modals/modal-task-sidebar.html` },

            { name: 'modalFormUpdate', targetId: 'modal-form-update-placeholder', filePath: `${baseIncludesPath}modals/modal-form-update.html` },

        );
    }

    return includes;
}
