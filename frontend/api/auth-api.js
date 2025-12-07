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


export {loginUser}