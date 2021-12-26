const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @router  GET api/auth
// @ desc   Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {

        // Find the user and exclude the password in the returned User object
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




// @router  POST api/auth
// @ desc   Authenticate user & get token
// @access  Public
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);

    // Return a status code of 400 if it doesn't passes the check
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Destructure req
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({errors: [{ msg: "Invalid credentials" }]});
        }
        
        // Check if the entered password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({errors: [{ msg: "Invalid credentials" }]});
        }

        // Return jsonwebtoken 
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000}, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    } 


});


module.exports = router;