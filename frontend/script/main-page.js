import { getContents } from "./../api/content-api.js"
import authMain from "./auth.js";

// holds the fetched email so other handlers can access it
let userEmail = '';

/* ==========================================================================
   DISPLAY CONTENT
   ========================================================================== */
const displayContents = async() => {
  const wrapper = document.querySelector('.wrapper');
  const loader = document.querySelector('.cat-loading-container');

  // enter loading state: hide main wrapper and show full-page loader
  if (wrapper) wrapper.classList.add('hide');
  if (loader) loader.classList.remove('hide');

  let contents;
  try {
    contents = await getContents();
  } catch (err) {
    console.error('Failed to load contents:', err);
    // exit loading state and reveal UI so user can see error state
    if (loader) loader.classList.add('hide');
    if (wrapper) wrapper.classList.remove('hide');
    return;
  }

  const email = contents.email;
  userEmail = email || '';

  const {
    bio,
    instagramLink,
    logo,
    name,
    profileImage,
    shopLink,
    skill,
    tiktokLink,
    updatedAt,
    youtubeLink,
  } = contents.info;


  // document.querySelector('.otp-form__sub-heading--email').innerText = contents.email;

  let contentHTML = `
    <img src="${profileImage}" alt="profile-image" class="profile-image">

    <h1 class="name">${name}</h1>
    <p class="skills">${skill}</p>
    <p class="bio">${bio}</p>
    <div class="email-me-btn">Email Me</div>
    <div class="email-popup hide">Email Copied To Clipboard</div>

    <div class="line-seperator"></div>

    <div class="socials-list">
      <a href="${shopLink}" class="socials-list__social" target="_blank">
        <img src="images-and-icons/white-shop-b.png" alt="shop-icon">
        <p class="socials-list__social-name">Shop</p>
      </a>
      <a href="${tiktokLink}" class="socials-list__social" target="_blank">
        <img src="images-and-icons/W-tiktok.png" alt="tiktok-icon">
        <p class="socials-list__social-name">TikTok</p>
      </a>
      <a href="${youtubeLink}" class="socials-list__social" target="_blank">
        <img src="images-and-icons/W-youtube.png" alt="youtube-icon">
        <p class="socials-list__social-name">Youtube</p>
      </a>
      <a href="${instagramLink}" class="socials-list__social" target="_blank">
        <img src="images-and-icons/W-instagram.png" alt="instagram-icon">
        <p class="socials-list__social-name">Instagram</p>
      </a>
    </div>
  `;

  const parent = document.querySelector('.content-container');
  parent.innerHTML = contentHTML;

  document.dispatchEvent(new Event("contentLoaded"));

  // exit loading state: hide loader and reveal main wrapper
  if (loader) loader.classList.add('hide');
  if (wrapper) wrapper.classList.remove('hide');
}

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
   EMAIL POP UP & CLIPBOARD COPY
   ========================================================================== */
const setupEmailPopup = () => {
  document.addEventListener('contentLoaded', () => {
    const emailPopupEl = document.querySelector('.email-popup');
    const emailMeBtn = document.querySelector('.email-me-btn');

    if (!emailMeBtn) return;

    emailMeBtn.addEventListener('click', async () => {
      if (!userEmail) {
        const popupError = document.querySelector('.popup-alert.popup-error');
        if (popupError) {
          popupError.classList.remove('hide');
          const details = popupError.querySelector('.popup-alert__details');
          if (details) details.innerText = 'Email not available yet.';
        }
        return;
      }

      // Try clipboard API, fallback to textarea copy
      let copied = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(userEmail);
        } else {
          const ta = document.createElement('textarea');
          ta.value = userEmail;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        copied = true;
      } catch (e) {
        copied = false;
      }

      if (copied && emailPopupEl) {
        emailPopupEl.classList.add('hide');
        void emailPopupEl.offsetHeight;
        emailPopupEl.classList.remove('hide');
        setTimeout(() => emailPopupEl.classList.add('hide'), 2000);
      } else {
        const popupError = document.querySelector('.popup-alert.popup-error');
        if (popupError) {
          popupError.classList.remove('hide');
          const details = popupError.querySelector('.popup-alert__details');
          if (details) details.innerText = 'Failed to copy email to clipboard.';
        }
      }
    });
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
   TOGGLE PASSWORD VISIBILITY
   ========================================================================== */
const togglePasswordVisibility = () => {
  document.querySelectorAll(".password-wrapper").forEach(wrapper => {
    const passwordInput = wrapper.querySelector("input[type='password'], input[type='text']");
    const eyeIcon = wrapper.querySelector(".toggle-password-icon");

    if (!passwordInput || !eyeIcon) return; 

    eyeIcon.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";

      // Toggle visibility
      passwordInput.type = isHidden ? "text" : "password";

      // Toggle icons
      eyeIcon.classList.toggle("fa-eye");
      eyeIcon.classList.toggle("fa-eye-slash");
    });
  });
};


/* ==========================================================================
   MAIN FUNCTION
   ========================================================================== */
function Main(){
  displayContents();
  toggleTheme();
  setupEmailPopup();
  toggleLoginForm();
  toggleOTPForm();
  authMain();
  togglePasswordVisibility();
}


Main();

