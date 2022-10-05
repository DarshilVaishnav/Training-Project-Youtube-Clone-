const { check } = require('express-validator');
 
exports.signupValidation = [
    check('firstname', 'firstname is requied').not().isEmpty(),
    check('lastname', 'lastname is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('gender', 'gender is requied').not().isEmpty(),
    check('country', 'country is requied').not().isEmpty()
]
 
exports.loginValidation = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]