// ---------------------------
// Navigation + Search + Transitions
// ---------------------------

const buttons = document.querySelectorAll('.menu button');
const sections = document.querySelectorAll('.section');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// NAVIGATION BUTTONS
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.page;
    showSection(target);
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// SMOOTH TRANSITION
function showSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const current = document.querySelector('.section.active');
  if (current) {
    current.classList.remove('active');
    setTimeout(() => {
      target.classList.add('active');
      target.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  } else {
    target.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// NORMALIZE STRING
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/['".,()]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// SEARCH HANDLER
if (searchForm) searchForm.addEventListener('submit', e => e.preventDefault());

if (searchInput) {
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = normalize(searchInput.value);

      const validPages = {
        'clarion': 'clarion',
        'theatre': 'theatre',
        'theater': 'theatre',
        'chamber': 'chamber',
        'pluma': 'pluma',
        'aikido': 'aikido',
        'armonia': 'armonia',
        'book lovers': 'booklovers',
        'booklovers': 'booklovers',
        'serviam': 'serviam',
        'chef': 'chef',
        'c h e f': 'chef',
        'c.h.e.f': 'chef',
        'c.h.e.f.': 'chef',
        'young designers': 'youngdesigners',
        'youngdesigners': 'youngdesigners',
        'dancy synergy': 'dancysynergy',
        'dance synergy': 'dancysynergy',
        'eureka': 'eureka',
        'history busters': 'historybusters',
        'historybusters': 'historybusters',
        'lemniscate': 'lemniscate',
        'photography': 'photography',
        'panorama': 'panorama',
        'yes': 'yes'
      };

      let matchedId = validPages[query];

      if (!matchedId) {
        for (const key in validPages) {
          if (query.includes(key)) {
            matchedId = validPages[key];
            break;
          }
        }
      }

      if (matchedId) {
        showSection(matchedId);
        buttons.forEach(b => b.classList.remove('active'));
      } else {
        showSection('notfound');
      }

      searchInput.value = '';
    }
  });
}

// CLICKABLE CLUB LOGOS
document.querySelectorAll('.club').forEach(club => {
  const target = club.dataset.page;
  if (target) {
    club.addEventListener('click', () => {
      showSection(target);
      buttons.forEach(b => b.classList.remove('active'));
    });
  }
});
