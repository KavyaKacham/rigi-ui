/* ==========================================================================
   RIGITAL ECOSYSTEM — APPOINTMENTS PAGE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("apptList");
  if (!list) return;

  const typeIcon = { Video: "video", "In-person": "map-pin" };

  list.innerHTML = RigitalData.appointments.map(a => `
    <div class="list-row">
      <div class="r-icon"><i data-lucide="${typeIcon[a.type] || "clock"}" style="width:16px;height:16px;"></i></div>
      <div>
        <div class="r-title">${a.title}</div>
        <div class="r-sub">with ${a.who} · ${a.type}</div>
      </div>
      <span class="badge badge-blue" style="margin-left:auto;">${a.time}</span>
    </div>
  `).join("");

  if (window.lucide) lucide.createIcons();
});