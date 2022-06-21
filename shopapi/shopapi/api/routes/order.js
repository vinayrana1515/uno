const express= require('express');
const router = express.Router(); 

const {details, book} = require('../../controllers/order')
const {DETAILS,BOOK} = require('../../utils/config').ROUTES.ORDER;

// router.get(DETAILS, orders);
// router.get(DETAILS+"/:orderid",orders);
router.post(DETAILS,details);
router.post(BOOK,book);

module.exports = router;