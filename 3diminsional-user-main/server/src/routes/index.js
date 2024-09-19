const express = require('express');
const authRoutes = require('./auth-routes');
const search=require('./product-search')
const font=require('./font-type')
const background_image_removal=require('./backgroundimage_removal')
const router = express.Router();
router.route('/').get((_, res) => res.formatResponse('Working fine ... 🥰'));
router.route('/').get((_, res) => {
  res.formatResponse('Working fine ... 🥰');
});
router.use('/auth', authRoutes);
router.use('/font',font)
router.use('/remove',background_image_removal)
router.use('/search',search)
module.exports = router;

