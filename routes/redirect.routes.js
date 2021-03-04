const Link = require('../models/Link')
const {baseUrl} = require("../config")

const router = require('express').Router();

router.get('/:code', async(req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})

        if (!link) {
            return res
                 .redirect(baseUrl+'/404')
        }
        link.clicks++;
        await link.save();
        res.redirect(link.from)
    } catch {
        res
            .status(500)
            .json({message: "Something went wrong please try again later"})
    }
})

module.exports = router;