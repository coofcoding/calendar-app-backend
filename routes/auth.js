// *    User Routes
// *    host + /api/auth

const { Router } = require('express');
const router = Router();
const { createUser, userLogin, reNewToken } = require('../controllers/auth')

router.post('/', userLogin)

router.post('/new', createUser);

router.get('/renew', reNewToken)

module.exports = router;