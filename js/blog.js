/**
 * KhanaBook POS — Blog Page Logic (shared functions in site.js)
 */

function initBlogSearch() {
  const searchInput = document.getElementById('blog-search');
  const cards = document.querySelectorAll('.blog-card');
  const noResults = document.getElementById('blog-no-results');
  if (!searchInput || cards.length === 0) return;
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const desc  = card.querySelector('p')?.textContent?.toLowerCase() || '';
      const match = title.includes(query) || desc.includes(query);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    if (noResults) {
      noResults.style.display = query && visible === 0 ? '' : 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initBlogSearch();
});
