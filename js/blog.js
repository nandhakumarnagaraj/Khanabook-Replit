/**
 * KhanaBook POS — Blog Page Logic (shared functions in site.js)
 */

function initBlogSearch() {
  const searchInput = document.getElementById('blog-search');
  const cards = document.querySelectorAll('.blog-card');
  if (!searchInput || cards.length === 0) return;
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const desc  = card.querySelector('p')?.textContent?.toLowerCase() || '';
      card.style.display = (title.includes(query) || desc.includes(query)) ? '' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initBlogSearch();
});
