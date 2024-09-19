const express = require('express');
const router = express.Router();
const searchController=require('../controllers/product-search')
const middleware=require('../middlewares/authentication-middleware')


router.route('/searchmodel').get(middleware,searchController.productSearch);


module.exports = router;
