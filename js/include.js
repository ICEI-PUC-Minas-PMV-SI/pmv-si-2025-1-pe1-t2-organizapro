   window.loadHTML = async function(id, fileName) {
     const targetElement = document.getElementById(id);
     if (!targetElement) return;

     // Construir caminho absoluto relativo à raiz do site para includes
     const fullPath = `/includes/${fileName}`;

     try {
       const response = await fetch(fullPath);
       if (!response.ok) throw new Error(`Erro ao carregar "${fileName}": ${response.statusText}`);

       const html = await response.text();
       targetElement.innerHTML = html;
     } catch (error) {
       console.error(`Erro ao carregar "${fileName}":`, error);
     }
   };

   document.addEventListener('DOMContentLoaded', () => {
     const components = ['header', 'sidebar', 'favorites', 'recent-upd', 'tasks'];
     components.forEach(component => loadHTML(component, `${component}.html`));
   });
   