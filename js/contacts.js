/* ==========================================================================
   RIGITAL ECOSYSTEM — CONTACTS PAGE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const tagBadge = { Client: "badge-success", Lead: "badge-blue", Partner: "badge-warning" };
  const body = document.getElementById("contactsBody");
  if (!body) return;

  body.innerHTML = RigitalData.contacts.map(c => `
    <tr>
      <td>
        <div class="cell-name">
          <div class="avatar" style="width:32px;height:32px;font-size:11px;">${c.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
          <div class="n-title">${c.name}</div>
        </div>
      </td>
      <td>${c.company}</td>
      <td class="text-muted">${c.email}</td>
      <td class="text-muted">${c.phone}</td>
      <td><span class="badge ${tagBadge[c.tag] || "badge-gray"}">${c.tag}</span></td>
      <td>
        <div class="row-actions">
          <button class="btn btn-icon btn-ghost" aria-label="Message"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>
          <button class="btn btn-icon btn-ghost" aria-label="Edit"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></button>
        </div>
      </td>
    </tr>
  `).join("");

  if (window.lucide) lucide.createIcons();
});