/* ==========================================================================
   RIGITAL ECOSYSTEM — USER SESSION (DEBUG VERSION — remove console.log lines once fixed)
   Guards every page that includes this script (redirects to signin.html
   if not logged in), renders the real signed-in user instantly from
   localStorage, then quietly refreshes against the live backend.
   Include this on every dashboard page, AFTER js/api.js.
   ========================================================================== */
(function () {

  function getInitials(name) {
    if (!name) return '';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) { return w[0].toUpperCase(); })
      .join('');
  }

  function applyUser(user) {
    if (!user || !user.fullName) return;
    var initials = getInitials(user.fullName);
    var firstName = user.fullName.split(' ')[0];

    setText('sidebarName', user.fullName);
    setText('topbarName', user.fullName);
    setText('sidebarAvatar', initials);
    setText('topbarAvatar', initials);

    document.querySelectorAll('.sidebar-user .u-name').forEach(function (el) { el.textContent = user.fullName; });
    document.querySelectorAll('.topbar-profile .p-name').forEach(function (el) { el.textContent = user.fullName; });
    document.querySelectorAll('.sidebar-user .avatar').forEach(function (el) { el.textContent = initials; });
    document.querySelectorAll('.topbar-profile .avatar').forEach(function (el) { el.textContent = initials; });

    var welcomeH2 = document.querySelector('.welcome-banner h2');
    if (welcomeH2) welcomeH2.textContent = 'Welcome back, ' + firstName + ' \uD83D\uDC4B';
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  async function initSession() {
    var cached = null;
    try { cached = JSON.parse(localStorage.getItem('rigital_user')); } catch (e) {}
    var session = localStorage.getItem('rigital_session');

    console.log('DEBUG session:', session);
    console.log('DEBUG cached user:', cached);

    if (!session || !cached) {
      console.log('DEBUG: redirecting to signin because session or cached is missing');
      window.location.href = 'signin.html';
      return;
    }

    applyUser(cached);

    if (window.RigitalAPI) {
      try {
        var fresh = await RigitalAPI.me();
        if (fresh) {
          applyUser(fresh);
          localStorage.setItem('rigital_user', JSON.stringify(fresh));
        }
      } catch (e) { /* backend still waking up — cached values stay as-is */ }
    }
  }

  window.RigitalSession = { initSession: initSession, applyUser: applyUser };
  document.addEventListener('DOMContentLoaded', initSession);
})();