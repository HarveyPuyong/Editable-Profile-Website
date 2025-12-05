// models/Content.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  logo: { type: String, default: "default-logo.png" },
  name: { type: String, default: "Portfolio Owner" },
  skill: { type: String, default: "Web Developer" },
  profileImage: { type: String, default: '/uploads/default.png' },
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
