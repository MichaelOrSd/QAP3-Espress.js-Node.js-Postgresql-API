const dal = require('/db');

const getStores = () => {
	return new Promise(function (reslove, reject) {
		const sql = 'SELECT * FROM vw_stores';
		dal.query(sql, [], (err, result) => {
			if (err) {
				reject(err);
			} else {
				reslove(result.rows);
			}
		});
	});
};

const getStoreById = (id) => {
	return new Promise(function (resolve, reject) {
		const sql = 'SELECT * FROM vw_stores WHERE store_id = $1';
		dal.query(sql, [id], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result.rows);
			}
		});
	});
};

const getFilmRevenueByStoreId = (id) => {
	return new Promise(function (resolve, reject) {
		const sql = 'SELECT * FROM vw_rental_films_by_dollars_earned WHERE store_id = $1 LIMIT 10';
		dal.query(sql, [id], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result.rows);
			}
		});
	});
};

const getFilmRevenueBySotreIdFilm = (id, name) => {
	return new Promise(function (resolve, reject) {
		const sql = 'SELECT * FROM vw_rental_films_by_dollars_earned \
      WHERE store_id = $1 AND name = $2 LIMIT 10';
		dal.query(sql, [id, name], (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result.rows);
			}
		});
	});
};

module.exports = {
	getStores,
	getStoreById,
	getFilmRevenueByStoreId,
	getFilmRevenueBySotreIdFilm,
};
