import api from "./../utils/axios-config.js";


/* ==========================================================================
   LOGIN API
   ========================================================================== */
const loginUser = async (credentials) => {
  try{
    const response = await api.post("/auth/login", credentials);
    if(response.status === 200) return response.data;
  }catch(err){
    const errorMessage = err.response.data.message;
    console.log(errorMessage);
  }
}

/* ==========================================================================
   OTP SEND API
   ========================================================================== */
const sendOTP = async () => {
  try {
    const response = await api.post("/auth/sendOTP");

    if(response.status === 200) return response;

  } catch (err) {
    throw err
  }
}

/* ==========================================================================
   VERIFY OTP API
   ========================================================================== */
const verifyOTP = async (otp) => {
  try {
    const response = await api.post("/auth/verifyOTP", otp);
    if(response.status === 200) return response

  } catch (err) {
    throw err
  }
}


/* ==========================================================================
   CHANGE PASSWORD API
   ========================================================================== */
const changePassword = async (data) => {
   try {
    const response = await api.patch("/auth/changePassword", data);
    if(response.status === 200) return response

  } catch (err) {
    throw err
  }
}


export {loginUser, sendOTP, verifyOTP, changePassword}