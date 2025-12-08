const fs = require('fs');
const path = require('path');
const infoDB = require('../models/content-schema');
const UserDB = require('../models/user-schema');

// =======================
// CHANGE CONTENT
// =======================
const changeContent = async (req, res) => {
  try {
    const { name, skill, bio, shopLink, tiktokLink, youtubeLink, instagramLink } = req.body;

    const existingInfo = await infoDB.findOne();

    // ===============================
    // HANDLE PROFILE IMAGE UPLOAD
    // ===============================
    const profileImage = req.files?.profileImage
      ? `/uploads/${req.files.profileImage[0].filename}`
      : existingInfo?.profileImage;

    // Delete old profile image
    if (req.files?.profileImage && existingInfo?.profileImage) {
      const oldImagePath = path.join(__dirname, "..", existingInfo.profileImage);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    // ===============================
    // HANDLE LOGO IMAGE UPLOAD
    // ===============================
    const logo = req.files?.logo
      ? `/uploads/${req.files.logo[0].filename}`
      : existingInfo?.logo;

    // Delete old logo image
    if (req.files?.logo && existingInfo?.logo) {
      const oldLogoPath = path.join(__dirname, "..", existingInfo.logo);
      if (fs.existsSync(oldLogoPath)) fs.unlinkSync(oldLogoPath);
    }

    // ===============================
    // UPDATE DATABASE
    // ===============================
    const updatedInfo = await infoDB.findOneAndUpdate(
      {},
      {
        name,
        skill,
        bio,
        shopLink,
        tiktokLink,
        youtubeLink,
        instagramLink,
        profileImage,
        logo,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Info updated successfully.",
      info: updatedInfo,
    });

  } catch (error) {
    console.error("Failed to update info:", error);
    res.status(500).json({ message: "Failed to update info." });
  }
};


// =======================
// CHANGE EMAIL
// =======================
const changeEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "No fields provided to update." });

  try{
    const updatedEmail = await UserDB.findOneAndUpdate(
      {}, 
      { email },
      { new: true, upsert: false }
    ).select("email");;

     res.status(200).json({
      email: updatedEmail,
      message: "Email updated successfully."
    });
    
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update email." });
  }
}

// =======================
// GET CONTENT
// =======================
const getContent = async (req, res) => {
  try {
    const info = await infoDB.findOne(); 

    const user = await UserDB.findOne().select("email -_id"); 

    res.status(200).json({
      info,
      email: user ? user.email : null, 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error: Cannot get info" });
  }
};



module.exports = { changeContent, getContent, changeEmail}