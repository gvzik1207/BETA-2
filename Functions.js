document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".menu button");
  const sections = document.querySelectorAll(".section");
  const clubs = document.querySelectorAll(".club");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  function showSection(id) {
    sections.forEach(section => {
      section.classList.toggle("active", section.id === id);
    });
    buttons.forEach(btn => btn.classList.toggle("active", btn.dataset.page === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  buttons.forEach(btn => btn.addEventListener("click", () => showSection(btn.dataset.page)));
  clubs.forEach(club => club.addEventListener("click", () => showSection(club.dataset.page)));

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", e => {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;
      const found = Array.from(sections).find(sec => sec.id.toLowerCase().includes(query));
      if (found) showSection(found.id);
      searchInput.value = "";
    });
  }

  // ✅ Back to Clubs Button (works for all)
  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("back-btn")) {
      e.preventDefault();
      showSection("clubs");
    }
  });
});
