const express = require('express');
const router = express.Router();

const{ADD_PROD,DISPLAY_PROD,FIND_PROD} = require('../../utils/config').ROUTES.PRODUCTS;
const{ add_prod, display_prod, find_prod} = require('../../controllers/product');

router.post(ADD_PROD,add_prod);
router.get(DISPLAY_PROD,display_prod);
router.post(FIND_PROD,find_prod);



module.exports = router;