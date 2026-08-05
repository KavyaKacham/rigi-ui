/* ==========================================================================
   RIGITAL ECOSYSTEM — BUSINESSES PAGE (CRUD + SEARCH + FILTER + SORT)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  let rows = [...RigitalData.businesses];
  let searchTerm = "";
  let activeFilter = "All";
  let sortKey = null;
  let sortDir = 1;
  let page = 1;
  const perPage = 6;
  let editingId = null;
  let nextId = Math.max(...rows.map(r => r.id)) + 1;

  const statusBadge = { Active: "badge-success", Trial: "badge-blue", Inactive: "badge-gray" };
  const planBadge = { Free: "badge-gray", Starter: "badge-blue", Scale: "badge-warning", Enterprise: "badge-success" };

  const tbody = document.getElementById("bizTableBody");
  const pageInfo = document.getElementById("bizPageInfo");
  const pager = document.getElementById("bizPager");
  const countEl = document.getElementById("bizCount");

  function initials(name) {
    return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  }

  function getFiltered() {
    return rows.filter(r => {
      const matchesSearch = !searchTerm ||
        r.name.toLowerCase().includes(searchTerm) ||
        r.owner.toLowerCase().includes(searchTerm) ||
        r.location.toLowerCase().includes(searchTerm);
      const matchesFilter = activeFilter === "All" || r.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }

  function getSorted(list) {
    if (!sortKey) return list;
    return [...list].sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey];
      if (sortKey === "revenue") {
        av = parseFloat(String(av).replace(/[^\d.]/g, "")) || 0;
        bv = parseFloat(String(bv).replace(/[^\d.]/g, "")) || 0;
      }
      if (av < bv) return -1 * sortDir;
      if (av > bv) return 1 * sortDir;
      return 0;
    });
  }

  function render() {
    countEl.textContent = rows.length;
    const filtered = getSorted(getFiltered());
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    if (page > totalPages) page = totalPages;
    const start = (page - 1) * perPage;
    const pageRows = filtered.slice(start, start + perPage);

    if (pageRows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7">
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h4>No businesses found</h4>
          <p>Try adjusting your search or filters.</p>
        </div>
      </td></tr>`;
    } else {
      tbody.innerHTML = pageRows.map(r => `
        <tr>
          <td>
            <div class="cell-name">
              <div class="avatar" style="width:34px;height:34px;font-size:11px;">${initials(r.name)}</div>
              <div><div class="n-title">${r.name}</div><div class="n-sub">${r.owner} · ${r.location}</div></div>
            </div>
          </td>
          <td>${r.category}</td>
          <td><span class="badge ${planBadge[r.plan] || "badge-gray"}">${r.plan}</span></td>
          <td><span class="badge ${statusBadge[r.status] || "badge-gray"}">${r.status}</span></td>
          <td>${r.revenue}</td>
          <td class="text-muted">${r.updated}</td>
          <td>
            <div class="row-actions">
              <button class="btn btn-icon btn-ghost" data-edit="${r.id}" aria-label="Edit"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></button>
              <button class="btn btn-icon btn-ghost" data-delete="${r.id}" aria-label="Delete"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>
            </div>
          </td>
        </tr>
      `).join("");
    }

    pageInfo.textContent = `Showing ${pageRows.length ? start + 1 : 0}–${start + pageRows.length} of ${filtered.length}`;

    pager.innerHTML = `
      <button class="pager-btn" id="prevPage" ${page === 1 ? "disabled" : ""}>‹</button>
      ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p =>
        `<button class="pager-btn ${p === page ? "active" : ""}" data-page="${p}">${p}</button>`).join("")}
      <button class="pager-btn" id="nextPage" ${page === totalPages ? "disabled" : ""}>›</button>
    `;

    document.querySelectorAll("[data-edit]").forEach(btn => btn.addEventListener("click", () => openEdit(parseInt(btn.dataset.edit))));
    document.querySelectorAll("[data-delete]").forEach(btn => btn.addEventListener("click", () => deleteRow(parseInt(btn.dataset.delete))));
    document.querySelectorAll("[data-page]").forEach(btn => btn.addEventListener("click", () => { page = parseInt(btn.dataset.page); render(); }));
    document.getElementById("prevPage")?.addEventListener("click", () => { page--; render(); });
    document.getElementById("nextPage")?.addEventListener("click", () => { page++; render(); });

    if (window.lucide) lucide.createIcons();
  }

  /* ---------- Search ---------- */
  document.getElementById("bizSearch").addEventListener("input", (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    page = 1;
    render();
  });

  /* ---------- Filter chips ---------- */
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter;
      page = 1;
      render();
    });
  });

  /* ---------- Sortable headers ---------- */
  document.querySelectorAll("[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      if (sortKey === key) sortDir *= -1; else { sortKey = key; sortDir = 1; }
      render();
    });
  });

  /* ---------- Modal: add / edit ---------- */
  const modal = document.getElementById("bizModal");
  const modalTitle = document.getElementById("bizModalTitle");
  const fName = document.getElementById("fName"), fCategory = document.getElementById("fCategory"),
        fOwner = document.getElementById("fOwner"), fLocation = document.getElementById("fLocation"),
        fPlan = document.getElementById("fPlan"), fStatus = document.getElementById("fStatus");

  document.querySelector('[data-open-modal="#bizModal"]').addEventListener("click", () => {
    editingId = null;
    modalTitle.textContent = "Add Business";
    fName.value = ""; fOwner.value = ""; fLocation.value = "";
    fCategory.value = "Retail"; fPlan.value = "Free"; fStatus.value = "Active";
  });

  function openEdit(id) {
    const row = rows.find(r => r.id === id);
    if (!row) return;
    editingId = id;
    modalTitle.textContent = "Edit Business";
    fName.value = row.name; fOwner.value = row.owner; fLocation.value = row.location;
    fCategory.value = row.category; fPlan.value = row.plan; fStatus.value = row.status;
    modal.classList.add("open");
  }

  function deleteRow(id) {
    if (!confirm("Delete this business? This can't be undone.")) return;
    rows = rows.filter(r => r.id !== id);
    render();
  }

  document.getElementById("bizSaveBtn").addEventListener("click", () => {
    if (!fName.value.trim()) { fName.focus(); return; }
    if (editingId) {
      const row = rows.find(r => r.id === editingId);
      Object.assign(row, {
        name: fName.value.trim(), category: fCategory.value, owner: fOwner.value.trim(),
        location: fLocation.value.trim(), plan: fPlan.value, status: fStatus.value, updated: "just now"
      });
    } else {
      rows.unshift({
        id: nextId++, name: fName.value.trim(), category: fCategory.value, owner: fOwner.value.trim(),
        location: fLocation.value.trim() || "—", status: fStatus.value, plan: fPlan.value,
        revenue: "₹0", updated: "just now"
      });
    }
    modal.classList.remove("open");
    page = 1;
    render();
  });

  render();
});