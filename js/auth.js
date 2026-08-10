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
  // =========================================================
  // SIGN IN PAGE
  // =========================================================
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