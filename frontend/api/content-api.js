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


/* ==========================================================================
   EDIT CONTENTS
   ========================================================================== */
const editContents = async (formData) => {
  try {
    const response = await api.put("/content/change-content", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      console.log("Content updated successfully:", response.data);
    }
  } catch (error) {
    throw error
  }
}

/* ==========================================================================
   EDIT EMAIL
   ========================================================================== */
const editEmail = async (data) => {
  try {
    const response = await api.patch("/content/change-email", data); 
    if (response.status === 200) {
      console.log("Content updated successfully:", response.data);
    }

  } catch (error) {
    throw error
  }
};


export {getContents, editContents, editEmail}