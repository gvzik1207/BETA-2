// Functions.js (updated) - navigation, search, and back-button support
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".menu button");
  const sections = document.querySelectorAll(".section");
  const clubs = document.querySelectorAll(".club");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  // Helper: show the right section
  function showSection(id) {
    sections.forEach(section => {
      section.classList.remove("active");
      if (section.id === id) section.classList.add("active");
    });

    // Update active nav button
    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.page === id);
    });

    // Scroll to top when switching
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Navbar click
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("data-page");
      if (page) showSection(page);
    });
  });

  // Club tile click
  clubs.forEach(club => {
    club.addEventListener("click", () => {
      const page = club.getAttribute("data-page");
      if (page) showSection(page);
    });
  });

  // Search logic with partial matching
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();

      if (!query) return;

      const allIds = Array.from(sections).map(sec => sec.id.toLowerCase());

      // Find partial matches
      const found = allIds.find(id => id.includes(query));

      if (found && !["home","about","clubs","faqs","notfound"].includes(found)) {
        showSection(found);
      } else {
        showSection("notfound");
      }

      searchInput.value = "";
    });

    // Enable Enter key for search
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchForm.dispatchEvent(new Event("submit"));
      }
    });
  }

  // ---- Back-to-Clubs button support (robust) ----
  // Listens for clicks on elements with class .back-btn OR .back-button
  function handleBackToClubsClick() {
    // Prefer triggering the nav button so any other nav handlers run
    const clubsNavBtn = document.querySelector('.menu button[data-page="clubs"]');
    if (clubsNavBtn) {
      clubsNavBtn.click();
      return;
    }
    // Fallback: directly show the clubs section
    const clubsSection = document.getElementById('clubs');
    if (clubsSection) {
      showSection('clubs');
    } else {
      // last-resort: show first available section
      if (sections.length > 0) showSection(sections[0].id);
    }
  }

  // Attach to existing buttons (if present now)
  document.querySelectorAll('.back-btn, .back-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleBackToClubsClick();
    });
  });

  // In case buttons are inserted later, delegation: catch any clicks on body
  document.body.addEventListener('click', (e) => {
    const el = e.target;
    if (!el) return;
    if (el.matches && (el.matches('.back-btn') || el.matches('.back-button'))) {
      e.preventDefault();
      handleBackToClubsClick();
    }
  });

});
