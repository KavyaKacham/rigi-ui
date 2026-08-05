// Rigital Ecosystem — signup.html + signin.html
// No backend required: validates the form, stores the session in
// localStorage, and redirects straight into the app.
//
// >>> Change this to wherever your logged-in app actually lives <<<
const POST_LOGIN_REDIRECT = 'dashboard.html';

document.addEventListener('DOMContentLoaded', () => {

  // ---- password visibility toggles (used on both pages) ----
  document.querySelectorAll('.toggle-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });

  function setError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const err = document.getElementById('err-' + fieldId);
    if (!input || !err) return;
    if (message) { input.classList.add('has-error'); err.textContent = message; }
    else { input.classList.remove('has-error'); err.textContent = ''; }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function startSession(user) {
    localStorage.setItem('rigital_user', JSON.stringify(user));
    localStorage.setItem('rigital_session', 'active');
  }

  function goToApp() {
    window.location.href = POST_LOGIN_REDIRECT;
  }

  // =========================================================
  // SIGN UP PAGE
  // =========================================================
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    const submitBtn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    function validateSignup() {
      let ok = true;

      const fullName = document.getElementById('fullName').value.trim();
      if (!fullName) { setError('fullName', 'Enter your full name'); ok = false; }
      else setError('fullName', '');

      const email = document.getElementById('email').value.trim();
      if (!email) { setError('email', 'Enter your email address'); ok = false; }
      else if (!emailPattern.test(email)) { setError('email', 'Enter a valid email address'); ok = false; }
      else setError('email', '');

      const password = document.getElementById('password').value;
      if (!password) { setError('password', 'Create a password'); ok = false; }
      else if (password.length < 8) { setError('password', 'Use at least 8 characters'); ok = false; }
      else setError('password', '');

      return ok;
    }

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form-status';

      if (!validateSignup()) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating account…';

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();

      // No backend yet — create the local session and go straight in.
      // Swap this block for a real fetch('/api/auth/signup', ...) later;
      // just keep calling startSession(user) + goToApp() on success.
      setTimeout(() => {
        startSession({ fullName, email, createdAt: Date.now() });
        status.textContent = 'Account created — redirecting…';
        status.classList.add('success');
        setTimeout(goToApp, 500);
      }, 500);
    });
  }

  // =========================================================
  // SIGN IN PAGE
  // =========================================================
  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    const submitBtn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    function validateSignin() {
      let ok = true;

      const email = document.getElementById('email').value.trim();
      if (!email) { setError('email', 'Enter your email address'); ok = false; }
      else if (!emailPattern.test(email)) { setError('email', 'Enter a valid email address'); ok = false; }
      else setError('email', '');

      const password = document.getElementById('password').value;
      if (!password) { setError('password', 'Enter your password'); ok = false; }
      else setError('password', '');

      return ok;
    }

    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form-status';

      if (!validateSignin()) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Logging in…';

      const email = document.getElementById('email').value.trim();

      // No backend yet — accept the entered credentials and go straight in.
      // Swap this block for a real fetch('/api/auth/login', ...) later;
      // just keep calling startSession(user) + goToApp() on success.
      setTimeout(() => {
        startSession({ email, loggedInAt: Date.now() });
        status.textContent = 'Logged in — redirecting…';
        status.classList.add('success');
        setTimeout(goToApp, 500);
      }, 500);
    });
  }

  // =========================================================
  // SOCIAL BUTTONS (Google / Microsoft)
  // No OAuth wired up yet — this simulates a successful social login.
  // Replace the redirect inside with your real OAuth flow when ready.
  // =========================================================
  document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.dataset.provider;
      startSession({ provider, loggedInAt: Date.now() });
      goToApp();
    });
  });

});