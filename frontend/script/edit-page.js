const handleEditContent = () => {
  const profileImageInput = document.getElementById("profileImageInput");
  const profilePreview = document.getElementById("profilePreview");

  profileImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (profilePreview.src = reader.result);
      reader.readAsDataURL(file);
    }
  });
  
  const logoImageInput = document.getElementById("logoImageInput");
  const logoPreview = document.getElementById("logoPreview");

  logoImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (logoPreview.src = reader.result);
      reader.readAsDataURL(file);
    }
  });
}

handleEditContent();