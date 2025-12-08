import { getContents } from "./../api/content-api.js";



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

  const formContentHTML = `
    <div class="buttons-container">
      <a href="main-page.html" class="goto-landing-page-btn button">Back</a>
      <button class="submit-btn button" type="submit">Save</button>
    </div>

    <div class="profile-pic-container">
      <p class="profile-pic-container__label">Upload Profile</p>
      <input type="file" id="profileImageInput" accept="image/*" hidden>
      <label for="profileImageInput" class="profile-pic-container__image-input-icon" title="Upload-Image">
        <i class="fa-solid fa-camera"></i>
      </label>
      <img id="profilePreview" class="profile-pic-container__image" src="${profileImage}" alt="Profile-Pic-Preview">
    </div>

    <div class="details-list">
      <div class="detail logo-image-container">
        <p class="detail__label">Upload logo:</p>
        <input type="file" id="logoImageInput" accept="image/*" hidden>
        <label for="logoImageInput" class="logo-image-container__input-icon" title="Upload-logo-image">
          <i class="fa-solid fa-camera"></i>
        </label>
        <img id="logoPreview" class="logo-image-container__img" src="${logo}" alt="logo-image-preview">
      </div>
      <div class="detail name">
        <p class="detail__label">Name:</p>
        <input id="name" class="detail__input" type="text" value="${name}">
      </div>
      <div class="detail skill">
        <p class="detail__label">Skill:</p>
        <input id="skill" class="detail__input" type="text" value="${skill}">
      </div>
      <div class="detail skill">
        <p class="detail__label">Bio:</p>
        <input id="skill" class="detail__input" type="text" value="${bio}">
      </div>
      <div class="detail email">
        <p class="detail__label">Email:</p>
        <input id="email" class="detail__input" type="email" value="${email}">
      </div>
      <div class="detail shop-link">
        <p class="detail__label">Shop Link:</p>
        <input id="email" class="detail__input" value="${shopLink}">
      </div>
      <div class="detail tiktok-link">
        <p class="detail__label">Tiktok Link:</p>
        <input id="email" class="detail__input" value="${tiktokLink}">
      </div>
      <div class="detail youtube-link">
        <p class="detail__label">Youtube Link:</p>
        <input id="email" class="detail__input" value="${youtubeLink}">
      </div>
      <div class="detail instagram-link">
        <p class="detail__label">Instagram Link:</p>
        <input id="email" class="detail__input" value="${instagramLink}">
      </div>
    </div>
  `;

  const editForm = document.getElementById('edit-form');
  editForm.innerHTML = formContentHTML;
}


/* ==========================================================================
   HANDLE EDIT CONTENT
   ========================================================================== */
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


function mainFunction() {
  displayContents();
  handleEditContent();
}

mainFunction();
