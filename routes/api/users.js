const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @router  POST api/users
// @ desc   Register user
// @access  public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req);

    // Return a status code of 400 if it doesn't passes the check
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    res.send('User route');
});

module.exports = router;