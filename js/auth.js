// Rigital Ecosystem — signup.html + signin.html
// Handles form validation and talks to the real backend via RigitalAPI.

const POST_LOGIN_REDIRECT = 'dashboard.html';

document.addEventListener('DOMContentLoaded', () => {

  // ---- password visibility toggles (used on both pages) ----
  document.querySelectorAll('.toggle-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (input) input.type = input.type === 'password' ? 'text' : 'password';
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

  function startSession(user, token) {
    localStorage.setItem('rigital_user', JSON.stringify(user));
    localStorage.setItem('rigital_session', 'active');
    if (token) localStorage.setItem('rigital_token', token);
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
      if (!password) { setError('password', 'Enter a password'); ok = false; }
      else if (password.length < 8) { setError('password', 'Password must be at least 8 characters'); ok = false; }
      else setError('password', '');

      const confirmInput = document.getElementById('confirmPassword');
      if (confirmInput) {
        if (confirmInput.value !== password) { setError('confirmPassword', 'Passwords do not match'); ok = false; }
        else setError('confirmPassword', '');
      }

      const terms = document.getElementById('terms');
      if (terms && !terms.checked) { ok = false; }

      return ok;
    }

    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form-status';

      if (!validateSignup()) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating account…';

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      try {
        const data = await RigitalAPI.signup(fullName, email, password);
        startSession(data.user, data.token);
        status.textContent = 'Account created — redirecting…';
        status.classList.add('success');
        setTimeout(goToApp, 500);
      } catch (err) {
        status.textContent = err.message || 'Signup failed. Please try again.';
        status.classList.add('error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
      }
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

    signinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form-status';

      if (!validateSignin()) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Logging in…';

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      try {
        const data = await RigitalAPI.login(email, password);
        startSession(data.user, data.token);
        status.textContent = 'Logged in — redirecting…';
        status.classList.add('success');
        setTimeout(goToApp, 500);
      } catch (err) {
        status.textContent = err.message || 'Invalid email or password.';
        status.classList.add('error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In';
      }
    });
  }

  // =========================================================
  // SOCIAL BUTTONS (Google / Microsoft)
  // No OAuth wired up yet — this simulates a successful social login.
  // =========================================================
  document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.dataset.provider;
      startSession({ provider, loggedInAt: Date.now() });
      goToApp();
    });
  });

});