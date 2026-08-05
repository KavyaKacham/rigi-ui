/* ==========================================================================
   RIGITAL ECOSYSTEM — DASHBOARD SHELL SCRIPT
   Shared across all internal pages (sidebar, topbar, collapse state).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const shell = document.querySelector(".app-shell");

  /* ---------- Sidebar collapse (desktop) ---------- */
  const collapseBtn = document.querySelector(".sidebar-toggle");
  collapseBtn?.addEventListener("click", () => {
    shell.classList.toggle("collapsed");
    localStorage.setItem("rigital_sidebar_collapsed", shell.classList.contains("collapsed"));
  });
  if (localStorage.getItem("rigital_sidebar_collapsed") === "true") {
    shell.classList.add("collapsed");
  }

  /* ---------- Sidebar mobile open/close ---------- */
  const mobileToggle = document.querySelector(".topbar-menu-btn");
  mobileToggle?.addEventListener("click", () => shell.classList.toggle("mobile-open"));
  document.querySelector(".sidebar")?.addEventListener("click", (e) => {
    if (e.target.closest(".nav-item") && window.innerWidth <= 900) shell.classList.remove("mobile-open");
  });

  /* ---------- Notifications dropdown ---------- */
  const notifBtn = document.querySelector("[data-notif-btn]");
  const notifPanel = document.querySelector("[data-notif-panel]");
  notifBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (notifPanel && !notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
      notifPanel.classList.remove("open");
    }
  });

  /* ---------- Generic modal open/close ---------- */
  document.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(btn.dataset.openModal)?.classList.add("open");
    });
  });
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => btn.closest(".modal-overlay")?.classList.remove("open"));
  });
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"); });
  });

  /* ---------- Icons ---------- */
  if (window.lucide) lucide.createIcons();
});