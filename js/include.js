function fixLogoLink() {
  const links = document.querySelectorAll('a[href="index.html"], a[href="./index.html"], a.logo');
  links.forEach(link => {
    link.href = 'index.html';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const basePath = 'includes/'; 

  const includes = ["header", "sidebar", "tasks", "recent-upd", "favorites"];

  Promise.all(
    includes.map(id => loadHTML(id, `${basePath}${id}.html`))
  )
    .then(() => {
      fixLogoLink();
    })
    .catch(err => {
      console.error("Erro ao carregar includes:", err);
    });
});
