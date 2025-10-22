// Smooth navigation and section switching
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
      showSection(page);
    });
  });

  // Club circle click
  clubs.forEach(club => {
    club.addEventListener("click", () => {
      const page = club.getAttribute("data-page");
      showSection(page);
    });
  });

  // Search logic with partial matching
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();

    if (!query) return;

    const allIds = Array.from(sections).map(sec => sec.id.toLowerCase());

    // Find partial matches
    const found = allIds.find(id => id.includes(query));

    if (found && found !== "home" && found !== "about" && found !== "clubs" && found !== "faqs" && found !== "notfound") {
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

  // 🟦 Back-to-Clubs button support
  document.querySelectorAll(".back-button").forEach(button => {
    button.addEventListener("click", () => {
      showSection("clubs");
    });
  });
});
