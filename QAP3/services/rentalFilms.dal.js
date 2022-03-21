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

/*

SELECT f.title
,SUM(p.amount) AS monies
FROM payment AS p
INNER JOIN rental AS r 
ON p.rental_id = r.rental_id
INNER JOIN inventory AS i 
ON r.inventory_id = i.inventory_id
INNER JOIN film AS f 
ON i.film_id = f.film_id
-- WHERE i.store_id = 2
GROUP BY f.title
ORDER BY monies DESC
-- LIMIT 10

*/
