const express = require('express');
const router = express.Router();

router.use(express.static('public'));

res.render('home.ejs', {});

module.exports = router;
