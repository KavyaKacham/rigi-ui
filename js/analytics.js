/* ==========================================================================
   RIGITAL ECOSYSTEM — ANALYTICS PAGE EXTRA CHARTS
   (Revenue + Lead Source charts are rendered by dashboard-home.js already)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.Chart) return;

  const typeCanvas = document.getElementById("businessTypeChart");
  if (typeCanvas) {
    new Chart(typeCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          { label: "New", data: [42, 55, 61, 70, 88, 96], backgroundColor: "#2563EB", borderRadius: 6 },
          { label: "Returning", data: [30, 34, 38, 41, 47, 52], backgroundColor: "#B7CEFF", borderRadius: 6 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } } },
        scales: { x: { grid: { display: false } }, y: { grid: { color: "#EEF1F6" } } }
      }
    });
  }

  const planCanvas = document.getElementById("planChart");
  if (planCanvas) {
    const counts = { Free: 0, Starter: 0, Scale: 0, Enterprise: 0 };
    RigitalData.businesses.forEach(b => counts[b.plan] = (counts[b.plan] || 0) + 1);
    new Chart(planCanvas.getContext("2d"), {
      type: "polarArea",
      data: {
        labels: Object.keys(counts),
        datasets: [{ data: Object.values(counts), backgroundColor: ["#CBD2DE", "#4F7DF3", "#2563EB", "#1E40AF"] }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } } }
      }
    });
  }
});