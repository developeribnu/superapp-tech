const state = {
  books: [],
  category: "All tracks",
  level: "All levels",
  query: "",
};

const elements = {
  metrics: document.querySelector("#hero-metrics"),
  search: document.querySelector("#search-input"),
  level: document.querySelector("#level-filter"),
  categories: document.querySelector("#category-filters"),
  results: document.querySelector("#results-copy"),
  reset: document.querySelector("#clear-filters"),
  grid: document.querySelector("#books-grid"),
  modal: document.querySelector("#book-modal"),
  modalContent: document.querySelector("#modal-content"),
  modalClose: document.querySelector("#close-modal"),
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

function renderLoadingState() {
  elements.grid.innerHTML = Array.from({ length: 8 }, () => {
    return `
      <article class="skeleton-card" aria-hidden="true">
        <div class="skeleton-cover"></div>
        <div class="skeleton-body">
          <div class="skeleton-line medium"></div>
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line medium"></div>
          <div class="skeleton-pill-row">
            <span class="skeleton-pill"></span>
            <span class="skeleton-pill"></span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderMetrics(stats, updatedAt) {
  const cards = [
    {
      label: "Titles",
      value: stats.total_books,
      copy: "Curated books spanning fundamentals, appsec, DFIR, crypto, and architecture.",
    },
    {
      label: "Tracks",
      value: stats.tracks,
      copy: "Searchable domains so the page feels like a working shelf, not a static brochure.",
    },
    {
      label: "Beginner Friendly",
      value: stats.beginner_friendly,
      copy: "Entry-point reads for analysts who need a practical starting ramp.",
    },
    {
      label: "Updated",
      value: updatedAt.replaceAll("-", "."),
      copy: `${stats.api_tie_ins} internal API tie-ins connected to the collection.`,
    },
  ];

  elements.metrics.innerHTML = cards
    .map(
      (card) => `
        <article class="metric-card">
          <span class="metric-label">${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          <p>${escapeHtml(card.copy)}</p>
        </article>
      `
    )
    .join("");
}

function renderLevelOptions(levels) {
  const options = ['<option value="All levels">All levels</option>']
    .concat(
      levels.map(
        (level) => `<option value="${escapeHtml(level)}">${escapeHtml(level)}</option>`
      )
    )
    .join("");

  elements.level.innerHTML = options;
}

function renderCategoryFilters(categories) {
  const allCategories = ["All tracks"].concat(categories);
  elements.categories.innerHTML = allCategories
    .map((category) => {
      const activeClass = category === state.category ? " is-active" : "";
      return `
        <button
          class="chip${activeClass}"
          type="button"
          data-category="${escapeHtml(category)}"
        >
          ${escapeHtml(category)}
        </button>
      `;
    })
    .join("");
}

function levelClass(level) {
  const normalized = level.toLowerCase();
  if (normalized === "beginner") {
    return "level-beginner";
  }
  if (normalized === "intermediate") {
    return "level-intermediate";
  }
  return "level-advanced";
}

function renderBooks(books) {
  if (!books.length) {
    elements.grid.innerHTML = `
      <article class="empty-state">
        <h3>No books match the current filters.</h3>
        <p class="empty-copy">
          Adjust the search text, switch level, or reset the selected track to reveal the full
          catalog again.
        </p>
        <button class="ghost-button" type="button" data-reset-grid="true">Reset filters</button>
      </article>
    `;
    return;
  }

  elements.grid.innerHTML = books
    .map((book) => {
      return `
        <article class="book-card">
          <div class="book-cover" data-accent="${escapeHtml(book.accent)}">
            <span class="card-kicker">${escapeHtml(book.category)}</span>
            <strong class="cover-code">${escapeHtml(book.cover_code)}</strong>
          </div>

          <div class="book-body">
            <div class="book-header">
              <h3 class="book-title">${escapeHtml(book.title)}</h3>
              <p class="book-meta">${escapeHtml(book.author)} · ${escapeHtml(book.year)}</p>
            </div>

            <div class="badge-row">
              <span class="pill ${levelClass(book.level)}">${escapeHtml(book.level)}</span>
              <span class="pill">${escapeHtml(book.format_label)}</span>
              ${book.asset_type ? `<span class="pill">${escapeHtml(book.asset_type)}</span>` : ""}
            </div>

            <p class="book-summary">${escapeHtml(book.summary)}</p>

            <div class="tag-list">
              ${book.tags
                .slice(0, 3)
                .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
                .join("")}
            </div>

            <div class="card-actions">
              <button class="open-book" type="button" data-open-book="${escapeHtml(book.slug)}">
                View details
              </button>
              <a
                class="endpoint-link"
                href="${escapeHtml(book.asset_url || book.related_endpoint)}"
                ${book.asset_url ? 'target="_blank" rel="noopener"' : ""}
              >
                ${escapeHtml(book.asset_label || "Open endpoint")}
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderErrorState() {
  elements.grid.innerHTML = `
    <article class="error-state">
      <h3>Catalog failed to load.</h3>
      <p class="error-copy">
        The page shell is ready, but the data request to <code>/api/v1/library/books</code>
        did not complete successfully.
      </p>
      <button class="ghost-button" type="button" data-retry="true">Retry</button>
    </article>
  `;
}

function updateResultsCopy(count) {
  const parts = [`${count} title${count === 1 ? "" : "s"}`];

  if (state.category !== "All tracks") {
    parts.push(state.category);
  }

  if (state.level !== "All levels") {
    parts.push(state.level);
  }

  if (state.query) {
    parts.push(`matching "${state.query}"`);
  }

  elements.results.textContent = parts.join(" · ");
  elements.reset.hidden = !(state.category !== "All tracks" || state.level !== "All levels" || state.query);
}

function applyFilters() {
  const query = state.query.trim().toLowerCase();
  const filteredBooks = state.books
    .filter((book) => {
      if (state.category !== "All tracks" && book.category !== state.category) {
        return false;
      }

      if (state.level !== "All levels" && book.level !== state.level) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = [
        book.title,
        book.author,
        book.category,
        book.focus,
        book.summary,
        ...book.tags,
        ...book.takeaways,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    })
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1;
      }
      return left.title.localeCompare(right.title);
    });

  updateResultsCopy(filteredBooks.length);
  renderCategoryFilters(
    [...new Set(state.books.map((book) => book.category))].sort((left, right) =>
      left.localeCompare(right)
    )
  );
  renderBooks(filteredBooks);
}

function openModal(book) {
  elements.modalContent.innerHTML = `
    <div class="modal-cover" data-accent="${escapeHtml(book.accent)}">
      <span class="modal-kicker">${escapeHtml(book.category)}</span>
      <h2 class="modal-title">${escapeHtml(book.title)}</h2>
      <p class="modal-meta">${escapeHtml(book.author)} · ${escapeHtml(book.year)} · ${escapeHtml(
        book.level
      )}</p>
    </div>
    <div class="modal-body">
      <div class="badge-row">
        <span class="pill ${levelClass(book.level)}">${escapeHtml(book.level)}</span>
        <span class="pill">${escapeHtml(book.format_label)}</span>
        ${book.asset_type ? `<span class="pill">${escapeHtml(book.asset_type)}</span>` : ""}
      </div>

      ${
        book.asset_url
          ? `
      <div class="modal-section">
        <h3>Available material</h3>
        <a
          class="endpoint-link"
          href="${escapeHtml(book.asset_url)}"
          target="_blank"
          rel="noopener"
        >
          ${escapeHtml(book.asset_label || `Open ${book.asset_type || "file"}`)}
        </a>
      </div>
      `
          : ""
      }

      <div class="modal-section">
        <h3>Why this title matters</h3>
        <p>${escapeHtml(book.summary)}</p>
      </div>

      <div class="modal-section">
        <h3>Best used for</h3>
        <p>${escapeHtml(book.focus)}</p>
      </div>

      <div class="modal-section">
        <h3>What to extract from it</h3>
        <ul class="modal-list">
          ${book.takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>

      <div class="modal-section">
        <h3>Platform tie-in</h3>
        <a class="endpoint-link" href="${escapeHtml(book.related_endpoint)}">
          ${escapeHtml(book.related_label)}
        </a>
      </div>
    </div>
  `;

  if (typeof elements.modal.showModal === "function") {
    elements.modal.showModal();
  }
}

function bindEvents() {
  elements.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    applyFilters();
  });

  elements.level.addEventListener("change", (event) => {
    state.level = event.target.value;
    applyFilters();
  });

  elements.categories.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) {
      return;
    }

    state.category = button.dataset.category;
    applyFilters();
  });

  elements.reset.addEventListener("click", resetFilters);

  elements.grid.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open-book]");
    if (openButton) {
      const book = state.books.find((item) => item.slug === openButton.dataset.openBook);
      if (book) {
        openModal(book);
      }
      return;
    }

    if (event.target.closest("[data-reset-grid]")) {
      resetFilters();
      return;
    }

    if (event.target.closest("[data-retry]")) {
      void init();
    }
  });

  elements.modalClose.addEventListener("click", () => {
    elements.modal.close();
  });

  elements.modal.addEventListener("click", (event) => {
    const rect = elements.modal.getBoundingClientRect();
    const clickedInside =
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right;

    if (!clickedInside) {
      elements.modal.close();
    }
  });
}

function resetFilters() {
  state.category = "All tracks";
  state.level = "All levels";
  state.query = "";
  elements.search.value = "";
  elements.level.value = "All levels";
  applyFilters();
}

async function init() {
  renderLoadingState();
  elements.results.textContent = "Loading catalog...";

  try {
    const response = await fetch("/api/v1/library/books");
    if (!response.ok) {
      throw new Error(`Unexpected status: ${response.status}`);
    }

    const payload = await response.json();
    state.books = payload.books;
    renderMetrics(payload.stats, payload.updated_at);
    renderLevelOptions(payload.filters.levels);
    state.level = "All levels";
    renderCategoryFilters(payload.filters.categories);
    applyFilters();
  } catch (error) {
    renderErrorState();
    elements.results.textContent = "Catalog unavailable";
  }
}

bindEvents();
void init();
