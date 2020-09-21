const express = require('express');
const router = express.Router();

//@route    /api/post
//@desc     Test Route
//@access   Public
router.get('/', (req,res, next) => res.send('Posts route'))

module.exports = router;