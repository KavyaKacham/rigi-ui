/* ==========================================================================
   RIGITAL ECOSYSTEM — DASHBOARD HOME (WIDGETS + CHARTS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const kpiColors = {
    blue:    { bg: "var(--color-blue-50)",    fg: "var(--color-blue-600)" },
    success: { bg: "var(--color-success-bg)", fg: "var(--color-success)" },
    violet:  { bg: "#F1EBFE",                 fg: "var(--color-violet)" },
    warning: { bg: "var(--color-warning-bg)", fg: "var(--color-warning)" }
  };

  /* ---------- KPI cards ---------- */
  const kpiWrap = document.querySelector("[data-kpis]");
  if (kpiWrap) {
    kpiWrap.innerHTML = RigitalData.kpis.map(k => {
      const c = kpiColors[k.color];
      return `
        <div class="col-3">
          <div class="card kpi-card card-hover">
            <div class="kpi-top">
              <div class="kpi-icon" style="background:${c.bg};color:${c.fg};">
                <i data-lucide="${k.icon}" style="width:20px;height:20px;"></i>
              </div>
              <span class="kpi-delta ${k.trend}">
                <i data-lucide="${k.trend === "up" ? "arrow-up-right" : "arrow-down-right"}"></i>${k.delta}
              </span>
            </div>
            <div class="kpi-value">${k.value}</div>
            <div class="kpi-label">${k.label}</div>
          </div>
        </div>`;
    }).join("");
  }

  /* ---------- Recent activity ---------- */
  const activityWrap = document.querySelector("[data-activity]");
  if (activityWrap) {
    activityWrap.innerHTML = RigitalData.activity.map(a => `
      <div class="list-row">
        <div class="r-icon"><i data-lucide="${a.icon}" style="width:16px;height:16px;"></i></div>
        <div>
          <div class="r-title">${a.title}</div>
          <div class="r-sub">${a.sub}</div>
        </div>
        <div class="r-time">${a.time}</div>
      </div>
    `).join("");
  }

  /* ---------- Tasks ---------- */
  const taskWrap = document.querySelector("[data-tasks]");
  if (taskWrap) {
    const renderTasks = () => {
      taskWrap.innerHTML = RigitalData.tasks.map((t, i) => `
        <div class="task-row ${t.done ? "completed" : ""}">
          <div class="task-check ${t.done ? "done" : ""}" data-task-index="${i}">
            ${t.done ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>' : ""}
          </div>
          <div class="t-title">${t.title}</div>
          <span class="badge badge-gray t-due">${t.due}</span>
        </div>
      `).join("");
      taskWrap.querySelectorAll("[data-task-index]").forEach(el => {
        el.addEventListener("click", () => {
          const idx = parseInt(el.dataset.taskIndex);
          RigitalData.tasks[idx].done = !RigitalData.tasks[idx].done;
          renderTasks();
        });
      });
    };
    renderTasks();
  }

  /* ---------- Leads ---------- */
  const leadsWrap = document.querySelector("[data-leads]");
  const stageBadge = { New: "badge-blue", Contacted: "badge-warning", Proposal: "badge-violet", Won: "badge-success" };
  if (leadsWrap) {
    leadsWrap.innerHTML = RigitalData.leads.map(l => `
      <div class="list-row">
        <div class="avatar" style="width:32px;height:32px;font-size:11px;">${l.owner}</div>
        <div>
          <div class="r-title">${l.name}</div>
          <div class="r-sub">${l.value}</div>
        </div>
        <span class="badge ${stageBadge[l.stage] || "badge-gray"}" style="margin-left:auto;">${l.stage}</span>
      </div>
    `).join("");
  }

  /* ---------- Mini calendar (current month) ---------- */
  const calWrap = document.querySelector("[data-mini-cal]");
  if (calWrap) {
    const now = new Date();
    const year = now.getFullYear(), month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = now.getDate();
    const eventDays = [4, 9, 14, 22, 27];

    let html = ["S", "M", "T", "W", "T", "F", "S"].map(d => `<div class="dow">${d}</div>`).join("");
    for (let i = 0; i < firstDay; i++) html += `<div class="day muted"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const classes = ["day"];
      if (d === today) classes.push("today");
      if (eventDays.includes(d)) classes.push("has-event");
      html += `<div class="${classes.join(" ")}">${d}</div>`;
    }
    calWrap.innerHTML = html;
  }

  /* ---------- Businesses mini-widget (top 4) ---------- */
  const bizWrap = document.querySelector("[data-biz-widget]");
  if (bizWrap) {
    bizWrap.innerHTML = RigitalData.businesses.slice(0, 4).map(b => `
      <div class="list-row">
        <div class="avatar" style="width:32px;height:32px;font-size:11px;">${b.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
        <div>
          <div class="r-title">${b.name}</div>
          <div class="r-sub">${b.category} · ${b.location}</div>
        </div>
        <span class="badge ${b.status === "Active" ? "badge-success" : b.status === "Trial" ? "badge-blue" : "badge-gray"}" style="margin-left:auto;">${b.status}</span>
      </div>
    `).join("");
  }

  /* ---------- Charts ---------- */
  if (window.Chart) {
    Chart.defaults.font.family = "Inter, sans-serif";
    Chart.defaults.color = "#6B7686";

    const revCanvas = document.getElementById("revenueChart");
    if (revCanvas) {
      const ctx = revCanvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 220);
      gradient.addColorStop(0, "rgba(37,99,235,0.28)");
      gradient.addColorStop(1, "rgba(37,99,235,0.02)");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: RigitalData.revenueSeries.labels,
          datasets: [{
            label: "Revenue (₹L)",
            data: RigitalData.revenueSeries.data,
            borderColor: "#2563EB",
            backgroundColor: gradient,
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointBackgroundColor: "#2563EB"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "#EEF1F6" }, ticks: { callback: v => "₹" + v + "L" } }
          }
        }
      });
    }

    const leadCanvas = document.getElementById("leadSourceChart");
    if (leadCanvas) {
      new Chart(leadCanvas.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: RigitalData.leadSources.labels,
          datasets: [{
            data: RigitalData.leadSources.data,
            backgroundColor: ["#2563EB", "#4F7DF3", "#7C3AED", "#0D9488", "#D97706"],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "68%",
          plugins: { legend: { position: "bottom", labels: { boxWidth: 10, padding: 14, font: { size: 11 } } } }
        }
      });
    }
  }

  if (window.lucide) lucide.createIcons();
});