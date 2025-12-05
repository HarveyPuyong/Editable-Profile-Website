/* ==========================================================================
   CHANGE THEME
   ========================================================================== */
const toggleTheme = () => {
  const toggleThemeBtn = document.querySelector('.toggle-theme-button');
  const body = document.querySelector('body');

  // --- Load saved theme on page load ---
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'night') {
    toggleThemeBtn.classList.add('active', 'night-mode');
    body.classList.add('night-mode');
  } else {
    toggleThemeBtn.classList.add('light-mode');
    body.classList.add('light-mode');
  }

  // --- Toggle Theme on Click ---
  toggleThemeBtn.addEventListener('click', () => {
    toggleThemeBtn.classList.toggle('active');

    if (toggleThemeBtn.classList.contains('active')) {
      // Night Mode
      toggleThemeBtn.classList.add('night-mode');
      toggleThemeBtn.classList.remove('light-mode');
      body.classList.add('night-mode');
      body.classList.remove('light-mode');

      localStorage.setItem('theme', 'night'); // SAVE
    } else {
      // Light Mode
      toggleThemeBtn.classList.add('light-mode');
      toggleThemeBtn.classList.remove('night-mode');
      body.classList.add('light-mode');
      body.classList.remove('night-mode');

      localStorage.setItem('theme', 'light'); // SAVE
    }
  });
};

/* ==========================================================================
   EMAIL POP UP
   ========================================================================== */
const emailPopup = () => {
  const emailPopup = document.querySelector('.email-popup');
  const emailMeBtn = document.querySelector('.email-me-btn');

  emailMeBtn.addEventListener('click', () => {
    emailPopup.style.animation = 'none';
    emailPopup.offsetHeight;

    emailPopup.style.animation = 'popup-appear 2s ease-out';
  });
}

/* ==========================================================================
   TOGGLE LOGIN FORM
   ========================================================================== */
const toggleLoginForm = () => {
    const loginForm = document.querySelector('#login-form');
    const blurBG = document.querySelector('.blur-bg');

    document.querySelector('.header__enable-edit-btn').addEventListener('click', () => {
      loginForm.classList.remove('hide');
      blurBG.classList.remove('hide');
    });

    document.querySelector('#login-form .form__cancel-btn').addEventListener('click', () => {
      loginForm.classList.add('hide');
      blurBG.classList.add('hide');
    });
}

/* ==========================================================================
   TOGGLE OTP FORM
   ========================================================================== */
const toggleOTPForm = () => {
  const loginForm = document.querySelector('#login-form');
  const OTPForm = document.querySelector('#otp-form');

  document.querySelector('.login-form__forgot-password').
    addEventListener('click', () => {
      loginForm.classList.add('hide');
      OTPForm.classList.remove('hide');
    });

  document.querySelector('#otp-form .form__cancel-btn').
    addEventListener('click', () => {
      loginForm.classList.remove('hide');
      OTPForm.classList.add('hide');
    });
}


/* ==========================================================================
   MAIN FUNCTION
   ========================================================================== */
function Main(){
  toggleTheme();
  emailPopup();
  toggleLoginForm();
  toggleOTPForm();
}


Main();

