const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = require('express').Router();

const {check, validationResult} = require('express-validator')

const User = require('../models/User')

//api/auth/register

router.post('/register', [
    check('email', 'Email is incorrect')
        .isEmail()
        .isLength({max: 255}),
    check('password', 'Password is incorrect').isLength({min: 6, max: 255})
], async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res
                .status(400)
                .json({message: "Email or password is incorrect"})
        }

        const {email, password} = req.body

        const t = await User.findOne({email})

        if (t) {
            return res
                .status(400)
                .json({message: "User exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({email, password: hashedPassword})

        await user.save();

        res
            .status(201)
            .json({message: "User created"})

    } catch (e) {
        res
            .status(500)
            .json({message: "Something went wrong please try again later"})
    }
})

//api/auth/login

router.post('/login', [
    check('email', 'Email is incorrect')
        .normalizeEmail()
        .isEmail()
        .isLength({max: 255}),
    check('password', 'Password is incorrect')
        .exists()
        .isLength({min: 6, max: 255})
], async(req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({message: "Email or password is incorrect"})
        }

        const {email, password} = req.body;

        const user = await User.findOne({email})

        if (!user) {
            return res
                .status(400)
                .json({message: "Email or password is incorrect"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res
                .status(400)
                .json({message: "Email or password is incorrect"})
        }

        const token = jwt.sign({
            userId: user.id
        }, require('../config').jwtSecret, {expiresIn: '1d'})

        res.json({token, userId: user.id})

    } catch {
        res
            .status(500)
            .json({message: "Something went wrong please try again later"})
    }
})

module.exports = router;