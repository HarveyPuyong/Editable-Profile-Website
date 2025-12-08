import { getContents } from "./../api/content-api.js"
import authMain from "./auth.js";


/* ==========================================================================
   DISPLAY CONTENT
   ========================================================================== */
const displayContents = async() => {
  const contents = await getContents();

  const email = contents.email;

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


  let contentHTML = `
    <img src="${profileImage}" alt="profile-image" class="profile-image">

    <h1 class="name">${name}</h1>
    <p class="skills">${skill}</p>
    <p class="bio">${bio}</p>
    <div class="email-me-btn">Email Me</div>
    <div class="email-popup">${email}</div>

    <div class="line-seperator"></div>

    <div class="socials-list">
      <a href="${shopLink}" class="socials-list__social">
        <img src="images-and-icons/white-shop-b.png" alt="shop-icon">
        <p class="socials-list__social-name">Shop</p>
      </a>
      <a href="${tiktokLink}" class="socials-list__social">
        <img src="images-and-icons/W-tiktok.png" alt="tiktok-icon">
        <p class="socials-list__social-name">TikTok</p>
      </a>
      <a href="${youtubeLink}" class="socials-list__social">
        <img src="images-and-icons/W-youtube.png" alt="youtube-icon">
        <p class="socials-list__social-name">Youtube</p>
      </a>
      <a href="${instagramLink}" class="socials-list__social">
        <img src="images-and-icons/W-instagram.png" alt="instagram-icon">
        <p class="socials-list__social-name">Instagram</p>
      </a>
    </div>
  `;

  const parent = document.querySelector('.content-container');
  parent.innerHTML = contentHTML;

  document.dispatchEvent(new Event("contentLoaded"));
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
   EMAIL POP UP
   ========================================================================== */
const emailPopup = () => {
  document.addEventListener('contentLoaded', () => {
    const emailPopup = document.querySelector('.email-popup');
    const emailMeBtn = document.querySelector('.email-me-btn');

    emailMeBtn.addEventListener('click', () => {
      emailPopup.style.animation = 'none';
      emailPopup.offsetHeight;

      emailPopup.style.animation = 'popup-appear 2s ease-out';
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
  emailPopup();
  toggleLoginForm();
  toggleOTPForm();
  authMain();
  togglePasswordVisibility();
}


Main();

