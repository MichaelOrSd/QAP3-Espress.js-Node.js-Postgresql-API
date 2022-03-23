const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}.`);
});

app.set('view engine', 'ejs');

const homeRouter = require('./routes/home');
const storesRouter = require('./routes/stores');

app.use('/', homeRouter);
app.use('/stores', storesRouter);

app.use((req, res) => {
	res.status(404).render('404');
});
