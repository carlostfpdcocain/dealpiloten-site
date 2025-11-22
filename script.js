// Beispiel-Deals-Array (ersetze mit echten Deals)
const deals = [
  {
    title: "Echo Dot (5. Gen)",
    description: "Amazon Smart Speaker mit Alexa.",
    price: "29,99 €",
    oldPrice: "59,99 €",
    saving: "50%",
    category: "Elektronik",
    platform: "Amazon",
    date: "2025-11-22",
    url: "https://www.amazon.de/dp/B09W5FZ7X9/?tag=YOUR_TRACKING_ID"
  },
  {
    title: "Philips Hue Lightstrip",
    description: "Smart LED-Lichtband, 2m.",
    price: "49,99 €",
    oldPrice: "79,99 €",
    saving: "37%",
    category: "Smart Home",
    platform: "Amazon",
    date: "2025-11-22",
    url: "https://www.amazon.de/dp/B093LKZL7W/?tag=YOUR_TRACKING_ID"
  }
];

function initFilters() {
  const categoryContainer = document.getElementById("categoryFilters");
  const platformContainer = document.getElementById("platformFilters");
  const sortSelect = document.getElementById("sortSelect");
  const dealCountNote = document.getElementById("dealCountNote");

  // Einzigartige Kategorien und Plattformen ermitteln
  const categories = [...new Set(deals.map(d => d.category))];
  const platforms = [...new Set(deals.map(d => d.platform))];

  categories.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
      renderDeals();
    });
    categoryContainer.appendChild(chip);
  });

  platforms.forEach(pl => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = pl;
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
      renderDeals();
    });
    platformContainer.appendChild(chip);
  });

  sortSelect.addEventListener("change", renderDeals);

  dealCountNote.textContent = `Heute ${deals.length} Deals im Überblick`;
}

function getSelectedFilters(containerId) {
  const active = Array.from(document.querySelectorAll(`#${containerId} .chip.active`));
  return active.map(btn => btn.textContent);
}

function renderDeals() {
  const list = document.getElementById("dealList");
  const noDealsMessage = document.getElementById("noDealsMessage");
  list.innerHTML = "";
  let filtered = deals.slice();

  const selectedCategories = getSelectedFilters("categoryFilters");
  const selectedPlatforms = getSelectedFilters("platformFilters");
  if (selectedCategories.length) {
    filtered = filtered.filter(d => selectedCategories.includes(d.category));
  }
  if (selectedPlatforms.length) {
    filtered = filtered.filter(d => selectedPlatforms.includes(d.platform));
  }

  const sortValue = document.getElementById("sortSelect").value;
  if (sortValue === "newest") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortValue === "saving") {
    // parse saving percentages (remove %)
    filtered.sort((a, b) => parseFloat(b.saving) - parseFloat(a.saving));
  }

  if (!filtered.length) {
    noDealsMessage.classList.remove("hidden");
    return;
  } else {
    noDealsMessage.classList.add("hidden");
  }

  filtered.forEach(deal => {
    const card = document.createElement("div");
    card.className = "deal-card";
    card.innerHTML = `
      <div class="deal-main">
        <div class="deal-header">
          <h3 class="deal-title">${deal.title}</h3>
          <span class="deal-badge hot">Neu</span>
        </div>
        <div class="deal-meta">
          <span class="pill">${deal.category}</span>
          <span class="pill">${deal.platform}</span>
        </div>
        <p class="deal-description">${deal.description}</p>
        <div class="deal-footer">
          <span class="deal-price"><strong>${deal.price}</strong> <span class="old">${deal.oldPrice}</span> <span class="saving">-${deal.saving}</span></span>
        </div>
      </div>
      <div class="deal-side">
        <span class="deal-date">${deal.date}</span>
        <div class="deal-cta">
          <a href="${deal.url}" class="btn primary" target="_blank" rel="noopener noreferrer">Zum Deal</a>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}

// Newsletter-Dummy und Initialisierung

document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  renderDeals();
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterStatus = document.getElementById("newsletterStatus");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      newsletterStatus.textContent = "Danke! (Demo, keine Speicherung)";
      newsletterForm.reset();
      setTimeout(() => {
        newsletterStatus.textContent = "";
      }, 4000);
    });
  }
});
