// models/Content.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  logo: { type: String, default: "default-logo.png" },
  profileImage: { type: String, default: '/uploads/default.png' },
  name: { type: String, default: "Portfolio Owner" },
  skill: { type: String, default: "Web Developer" },
  bio: { type: String, default: "Ypur Bio" },
  shopLink: { type: String, default: "https://exampleShopLink.com" },
  tiktokLink: { type: String, default: "https://exampleTiktokLink.com"  },
  youtubeLink: { type: String, default: "https://exampleYoutubeLink.com"  },
  instagramLink: { type: String, default: "https://exampleInstagramLink.com"  },
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
