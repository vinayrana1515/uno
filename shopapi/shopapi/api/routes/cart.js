const express= require('express');
const router = express.Router();

const{ADD_CART, VIEW_CART} =require('../../utils/config').ROUTES.CART;
const {add_cart, view_cart} = require('../../controllers/cart')

router.post(ADD_CART,add_cart);
router.post(VIEW_CART,view_cart);

module.exports = router;