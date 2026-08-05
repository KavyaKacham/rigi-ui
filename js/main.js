/* ==========================================================================
   RIGITAL ECOSYSTEM — LANDING PAGE SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Sticky navbar shadow on scroll ---------- */
  const navbar = document.querySelector(".navbar");
  const onScroll = () => {
    if (window.scrollY > 8) navbar.classList.add("is-scrolled");
    else navbar.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const drawerClose = document.querySelector(".mobile-drawer-close");
  if (navToggle && drawer) {
    navToggle.addEventListener("click", () => drawer.classList.add("open"));
    drawerClose?.addEventListener("click", () => drawer.classList.remove("open"));
    drawer.addEventListener("click", (e) => { if (e.target === drawer) drawer.classList.remove("open"); });
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => drawer.classList.remove("open")));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Animated stat counters ---------- */
  const statNums = document.querySelectorAll(".stat-num[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCount(entry.target); statIO.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  statNums.forEach(el => statIO.observe(el));

  /* ---------- Pricing monthly/yearly toggle ---------- */
  const toggleBtns = document.querySelectorAll(".pricing-toggle button");
  const priceEls = document.querySelectorAll("[data-monthly]");
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.mode;
      priceEls.forEach(el => {
        el.textContent = mode === "yearly" ? el.dataset.yearly : el.dataset.monthly;
      });
      document.querySelectorAll(".price-per").forEach(el => {
        el.textContent = mode === "yearly" ? "/mo, billed yearly" : "/month";
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-a").style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        a.style.maxHeight = null;
      } else {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---------- Flywheel node placement (7 stages around a circle) ---------- */
  const wheel = document.querySelector(".flywheel");
  if (wheel) {
    const nodes = wheel.querySelectorAll(".flywheel-node");
    const radius = wheel.clientWidth ? wheel.clientWidth / 2 - 30 : 320;
    const total = nodes.length;
    nodes.forEach((node, i) => {
      const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
      const r = wheel.clientWidth ? wheel.clientWidth / 2 - 84 : 300;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      node.style.left = `calc(50% + ${x}px - 84px)`;
      node.style.top = `calc(50% + ${y}px - 45px)`;
    });
  }

  /* ---------- Lucide icons ---------- */
  if (window.lucide) lucide.createIcons();
});