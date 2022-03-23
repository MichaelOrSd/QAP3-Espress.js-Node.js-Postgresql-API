const express = require('express');
const router = express.Router();

router.use(express.static('public'));

const storesDal = require('../services/stores.dal');
const rentalFilmsDal = require('../services/rentalFilms.dal'); // this may not be needed

router.get('/', async (req, res) => {
	// gets all stores
	let stores = await storesDal.getStores(); // awaits the result of the getStores() function
	if (stores.length === 0) res.render('norecord');
	// renders the norecord.ejs page
	else {
		res.render('stores.ejs', { stores }); // renders the stores.ejs page
	}
});

router.get('/:id', async (req, res) => {
	let store = await storesDal.getStoreById(req.params.id);
	let rentalFilms = await rentalFilmsDal.getRentalFilms();
	rentalFilms.unshift({ title: 'All' });

	if (req.query.rentalFilms) {
		var revenue = await storesDal.getFilmRevenueByStoreIdFilm(req.params.id, req.query.rentalFilms);
	} else {
		var revenue = await storesDal.getFilmRevenueByStoreId(req.params.id);
	}

	if (store.length === 0) res.render('norecord');
	else {
		res.render('storedetails.ejs', { store, revenue, rentalFilms });
	}
});

module.exports = router;
