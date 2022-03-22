const express = require('express');
const router = express.Router();

router.use(express.static('public'));

router.get('/', async (req, res) => {
	res.render('home.ejs');
});

module.exports = router;
