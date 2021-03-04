const router = require('express').Router()
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const {baseUrl} = require('../config')

router.post('/generate', [check('from', 'url is incorrect').isURL()], auth, async(req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({message: "Url is incorrect"});
        }

        const {from} = req.body

        const existing = await Link.findOne({from})
        if (existing) {
            existing.owner = req.user.userId;
            await existing.save();

            return res.json({link: existing})
        }

        const code = shortid.generate()

        const to = baseUrl + '/t/' + code

        const link = new Link({code, to, from, owner: req.user.userId})

        await link.save();

        res
            .status(200)
            .json({link})

    } catch (e) {
        console.log(e.message)
        res
            .status(500)
            .json({message: "Something went wrong please try again later"})
    }
})

router.get('/', auth, async(req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        console.log(req.user.userId)
        res.json({links})
    } catch {
        res
            .status(500)
            .json({message: "Something went wrong please try again later"})
    }
})

module.exports = router;