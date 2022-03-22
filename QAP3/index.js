const express = require('express');
const app = express();
const session = require('express-session');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// app.use(
// 	session({
// 		secret: 'cape broyle',
// 		resave: false,
// 		saveUninitialized: true,
// 	})
// );

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}.`);
});

app.set('view engine', 'ejs');

const homeRouter = require('./routes/home');
const storesRouter = require('./routes/stores');
// const languagesRouter = require('./routes/languages');
// const aboutRouter = require('./routes/about');
// const rentalFilms = require('./routes/rentalFilms');

app.use('/', homeRouter);
app.use('/stores', storesRouter);
// app.use('/languages', languagesRouter);
// app.use('/about', aboutRouter);
// app.use('/rentalFilms', rentalFilms);

app.use((req, res) => {
	res.status(404).render('404');
});
