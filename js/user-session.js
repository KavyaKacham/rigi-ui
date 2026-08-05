/* ==========================================================================
   RIGITAL ECOSYSTEM — USER SESSION (name display, no backend yet)
   Include this on any page that needs to show the signed-in user's name.
   ========================================================================== */
(function () {
  var STORAGE_KEY = 'rigital_user_name';
  var DEFAULT_NAME = 'Ravi Kapoor';

  function getInitials(name) {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) { return w[0].toUpperCase(); })
      .join('');
  }

  function applyUserToPage() {
    var name = localStorage.getItem(STORAGE_KEY) || DEFAULT_NAME;
    var firstName = name.split(' ')[0];
    var initials = getInitials(name);

    // Sidebar user block
    document.querySelectorAll('.sidebar-user .u-name').forEach(function (el) { el.textContent = name; });
    // Topbar profile
    document.querySelectorAll('.topbar-profile .p-name').forEach(function (el) { el.textContent = name; });
    // Avatars (sidebar + topbar) — leave any avatar inside a notif panel row alone
    document.querySelectorAll('.sidebar-user .avatar, .topbar-profile .avatar').forEach(function (el) {
      el.textContent = initials;
    });
    // Welcome banner greeting on dashboard.html
    var welcomeH2 = document.querySelector('.welcome-banner h2');
    if (welcomeH2) {
      welcomeH2.textContent = 'Welcome back, ' + firstName + ' \uD83D\uDC4B';
    }
  }

  // Expose helpers so signin.html / signup.html can set the name
  window.RigitalUser = {
    get: function () { return localStorage.getItem(STORAGE_KEY) || DEFAULT_NAME; },
    set: function (name) {
      if (name && name.trim()) localStorage.setItem(STORAGE_KEY, name.trim());
    },
    setFromEmail: function (email) {
      if (!email) return;
      var local = email.split('@')[0];
      var name = local
        .split(/[._-]+/)
        .filter(Boolean)
        .map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); })
        .join(' ');
      if (name) localStorage.setItem(STORAGE_KEY, name);
    }
  };

  document.addEventListener('DOMContentLoaded', applyUserToPage);
})();