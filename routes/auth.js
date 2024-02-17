// *    User Routes
// *    host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validators')
const { JWTValidator } = require('../middlewares/jwt-validator')
const { createUser, userLogin, reNewToken } = require('../controllers/auth')

const router = Router();

router.post('/', [
    check("email", "Invalid email or password please try again").isLength({ min: 6 }),
    check("password", "Invalid email or password please try again").isLength({ min: 6 }),
    validateFields
],userLogin)

router.post('/new', [
    check('name', 'The name is obligatory').not().isEmpty(),
    check('email', 'The email is obligatory').isEmail(),
    check('password', 'The password must be more than 6 characters').isLength({ min: 6 }),
    validateFields
] , createUser);

router.get('/renew', JWTValidator, reNewToken);

module.exports = router;