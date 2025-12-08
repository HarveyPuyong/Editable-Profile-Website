import attachInputSanitizers from "./../utils/sanitize-input.js"
import {loginUser} from "./../api/auth-api.js";

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


export default function authMain() {
  attachInputSanitizers();
  handleLogin();
}