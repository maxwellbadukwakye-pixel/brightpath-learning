const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }));
}

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const cards = [...document.querySelectorAll('.course-card')];
const searchStatus = document.querySelector('#search-status');

function searchCourses() {
  const query = searchInput.value.trim().toLowerCase();
  let count = 0;
  cards.forEach(card => {
    const matches = !query || `${card.dataset.search} ${card.textContent}`.toLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) count++;
  });
  searchStatus.textContent = query ? `${count} course${count === 1 ? '' : 's'} found.` : '';
}

searchInput?.addEventListener('input', searchCourses);
searchForm?.addEventListener('submit', event => {
  event.preventDefault();
  searchCourses();
  document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#check-answer')?.addEventListener('click', () => {
  const answer = document.querySelector('input[name="q1"]:checked');
  const result = document.querySelector('#quiz-result');
  if (!answer) {
    result.textContent = 'Choose an answer first.';
    result.className = 'quiz-result';
  } else if (answer.value === 'html') {
    result.textContent = 'Correct! HTML gives a webpage its structure.';
    result.className = 'quiz-result correct';
  } else {
    result.textContent = 'Not quite. Try again: HTML gives a webpage its structure.';
    result.className = 'quiz-result';
  }
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
