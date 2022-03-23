const dal = require('./db');

let getRentalFilms = () => {
	return new Promise(function (resolve, reject) {
		const sql = 'SELECT film_id, title FROM film';
		dal.query(sql, [], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result.rows);
			}
		});
	});
};

var addFilm = (title) => {
	return new Promise(function (resolve, reject) {
		const sql = 'INSERT INTO public.film(title) VALUES ($1);';
		dal.query(sql, [title], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result.rows);
			}
		});
	});
};

module.exports = {
	getRentalFilms,
	addFilm,
};
