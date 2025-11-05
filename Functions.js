document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".menu button");
  const sections = document.querySelectorAll(".section");
  const clubs = document.querySelectorAll(".club");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  // --- SECTION SWITCHING ---
  function showSection(id) {
    if (!id) return;
    sections.forEach(section => {
      const isActive = section.id === id;
      section.classList.toggle("active", isActive);
      section.style.display = isActive ? "block" : "none";
    });
    buttons.forEach(btn =>
      btn.classList.toggle("active", btn.dataset.page === id)
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => showSection(btn.dataset.page));
  });

  clubs.forEach(club => {
    club.addEventListener("click", () => showSection(club.dataset.page));
  });

  // --- SEARCH FUNCTION ---
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", e => {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      const found = Array.from(sections).find(section =>
        section.id.toLowerCase().includes(query)
      );

      if (found) {
        showSection(found.id);
      } else {
        alert("No matching club or section found.");
      }
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
  if (track && prevBtn && nextBtn) {
    const cards = document.querySelectorAll(".club-card");
    let index = 0;

    function moveCarousel() {
      const cardWidth = cards[0]?.offsetWidth || 0;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % cards.length; // loops forward
      moveCarousel();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + cards.length) % cards.length; // loops backward
      moveCarousel();
    });

    // Resize handler for responsiveness
    window.addEventListener("resize", moveCarousel);

    // Optional: auto-slide every 5 seconds
    setInterval(() => {
      index = (index + 1) % cards.length;
      moveCarousel();
    }, 5000);
  }

  // --- INITIAL LOAD ---
  showSection("home");
});
