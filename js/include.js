function loadHTML(id, file) {
  const targetElement = document.getElementById(id);
  if (!targetElement) return Promise.resolve(); 

  return fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Erro ao carregar "${file}": ${response.statusText}`);
      return response.text();
    })
    .then(html => {
      targetElement.innerHTML = html;
    })
    .catch(error => console.error(`Erro ao carregar "${file}":`, error));
}
