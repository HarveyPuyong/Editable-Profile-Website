import api from "./../utils/axios-config.js";

/* ==========================================================================
   GET CONTENTES
   ========================================================================== */
const getContents = async () => {
  try {
    const response = await api.get("/content");
    if(response.status === 200) return response.data
    
  } catch (err) {
    console.error('Failed to get contents:', err);
    throw err; 
  }
}


export {getContents}