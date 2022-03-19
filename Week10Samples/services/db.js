const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'Peter',
	host: 'localhost',
	database: 'dvdrental',
	password: 'royisanerd',
	port: 5432,
});
module.exports = pool;
