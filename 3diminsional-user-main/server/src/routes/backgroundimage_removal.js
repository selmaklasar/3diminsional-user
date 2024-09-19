const express = require('express');
const multer = require('multer');
const middleware=require('../middlewares/authentication-middleware')
const backgroundimage_removal_controller=require('../controllers/image_removal')

const backgroundimage_removal = multer({ dest: 'temporay_image_removal/' });

const router = express.Router();


router.route('/background_image').post(middleware,backgroundimage_removal.single('image'), backgroundimage_removal_controller.background_image_removal);


module.exports = router;
