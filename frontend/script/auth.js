import attachInputSanitizers from "./../utils/sanitize-input.js"
import {loginUser, sendOTP, verifyOTP, changePassword} from "./../api/auth-api.js";
import  {popupSuccess, popupError} from "./../utils/popup-alert.js"


/* ==========================================================================
   HANDLE LOGIN
   ========================================================================== */
const handleLogin = () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const email = loginForm.querySelector("#email-input").value.trim();
    const password = loginForm.querySelector("#password-input").value.trim();

    const data = await loginUser({email, password});

    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      window.location.replace("/edit-page.html");
    }
  });
}

// ===============================
// HANDLE SEND OTP
// ===============================
const handleSendOTP = () => {
  const buttons = document.querySelectorAll('.login-form__forgot-password, .otp-form__resend-otp');

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const response = await sendOTP();
        
      if(response.status === 200) popupSuccess(response.data.message);  
    });
  });
}


// ===============================
// OTP AUTO NEXT/PREV INPUTS
// ===============================
const otpAutoNextPrevInput = () => {
  const otpForm = document.querySelector('#otp-form');
  const otpInputs = document.querySelectorAll('.otp-form__input');

  otpInputs.forEach((input, index) => {
    input.addEventListener('input', e => {
      const value = e.target.value;
      if (/^\d$/.test(value)) {
        e.target.value = value;
        if (index < otpInputs.length - 1) otpInputs[index + 1].focus();
      } else {
        e.target.value = '';
      }

      // Auto-submit if all fields are filled
      const allFilled = Array.from(otpInputs).every(inp => inp.value !== '');
      if (allFilled) otpForm.requestSubmit();
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });
}


// ===============================
// HANDLE VERIFY OTP
// ===============================
const handleVerifyOTP = () => {
  const changePasswordForm = document.querySelector('#reset-password-form');
  const otpForm = document.querySelector('#otp-form');
  const otpInputs = document.querySelectorAll('.otp-form__input');

  otpForm.addEventListener('submit', async e => {
    e.preventDefault();

    const otp = Array.from(otpInputs).map(i => i.value).join('');

    if (otp.length < 6) {
      alert('Please enter the complete 6-digit OTP.');
      return;
    }

    try {
      const response = await verifyOTP({ otp });

      if (response.status === 200) {
        changePasswordForm.classList.remove('hide');
        otpForm.classList.add('hide');
      } 
    } catch (err) {
      const errorMessage = err.response.data.message;
      popupError(errorMessage);
      otpInputs.forEach(inp => (inp.value = ''));
      otpInputs[0].focus();
    }
  });
}


// ===============================
// HANDLE CHANGE PASSWORD
// ===============================
const handleChangePassword = () => {
  const changePasswordForm = document.querySelector('#reset-password-form');
  const login = document.querySelector('#login-form');

  changePasswordForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const password = document.querySelector('#new-password-input').value.trim();
    const confirmPassword = document.querySelector('#re-enter-password').value.trim();

    const data = {password, confirmPassword};

    try{
      const response = await changePassword(data);
       if(response.status === 200) {
          const responseMessage = response.data.message
          popupSuccess(responseMessage);
          changePasswordForm.classList.add("hide");
          login.classList.remove("hide");
       }  

    } catch (err) {
      const errorMessage = err.response.data.message;
      popupError(errorMessage);
      changePasswordForm.reset();
    }
  });
}



export default function authMain() {
  attachInputSanitizers();
  handleLogin();
  handleSendOTP();
  otpAutoNextPrevInput();
  handleVerifyOTP();
  handleChangePassword();
}