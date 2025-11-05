document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".menu button");
  const sections = document.querySelectorAll(".section");
  const clubs = document.querySelectorAll(".club");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  // --- SECTION SWITCHING ---
  function showSection(id) {
    sections.forEach(section => {
      section.classList.toggle("active", section.id === id);
    });
    buttons.forEach(btn =>
      btn.classList.toggle("active", btn.dataset.page === id)
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  buttons.forEach(btn =>
    btn.addEventListener("click", () => showSection(btn.dataset.page))
  );

  clubs.forEach(club =>
    club.addEventListener("click", () => showSection(club.dataset.page))
  );

  // --- SEARCH FUNCTION ---
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", e => {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;
      const found = Array.from(sections).find(sec =>
        sec.id.toLowerCase().includes(query)
      );
      if (found) showSection(found.id);
      searchInput.value = "";
    });
  }

  // --- BACK BUTTON HANDLER ---
  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("back-btn")) {
      e.preventDefault();
      showSection("clubs");
    }
  });

  // --- CLUB CAROUSEL FUNCTIONALITY ---
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let index = 0;

  function moveCarousel() {
    const cardWidth = document.querySelector(".club-card")?.offsetWidth || 0;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener("click", () => {
      const totalCards = document.querySelectorAll(".club-card").length;
      if (index < totalCards - 1) {
        index++;
        moveCarousel();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (index > 0) {
        index--;
        moveCarousel();
      }
    });

    window.addEventListener("resize", moveCarousel);
  }
});
