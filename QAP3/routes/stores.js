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
		// var revenue = [{title: 'Fat Cat', monies: 78.90},
		//    {title: 'Greatest', monies: 114.45},
		//    {title: 'Testing is good', monies: 67.80}];
	} else {
		var revenue = await storesDal.getFilmRevenueByStoreId(req.params.id);
		// var revenue = [{name:'French', title: 'Spiderman', monies: 780.90},
		//     {name:'English', title: 'Greatest Wonder', monies: 234.45},
		//     {name:'German', title: 'Good Enough', monies: 125.80}];
	}

	if (store.length === 0) res.render('norecord');
	else {
		res.render('storedetails.ejs', { store, revenue, rentalFilms /*rentalFilms: req.query.rentalFilms*/ });
	}
});

module.exports = router;
