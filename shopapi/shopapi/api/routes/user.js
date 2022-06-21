const express= require('express');
const router = express.Router();
//  const userCtrl = require('../../controllers/user')
// router.get('/show',userCtrl.show());
// router.get('/login',userCtrl.login());
// router.get('/register', userCtrl.register());

const {show, login, register} = require('../../controllers/user')
const {LOGIN, REGISTER,PROFILE} = require('../../utils/config').ROUTES.USER;
router.get(PROFILE,show);
router.post(LOGIN,login);
router.post(REGISTER,register);
module.exports = router;

