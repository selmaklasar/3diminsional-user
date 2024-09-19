const express = require('express');
const router = express.Router();
const fontController=require('../controllers/font-controller')
const middleware=require('../middlewares/authentication-middleware')


router.route('/').get(middleware,fontController.getFont);


module.exports = router;
