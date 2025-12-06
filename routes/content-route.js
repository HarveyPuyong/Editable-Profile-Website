const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verify-jwt');
const { changeContent, changeEmail, getContent } = require('../controllers/content-controller');
const upload = require('../middleware/upload-image');

router.get('/', getContent); // get content

router.put( // change content
  '/change-content',
  verifyJWT,
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
  ]),
  changeContent
);

router.patch('/change-email', verifyJWT, changeEmail); // change email

module.exports = router;
