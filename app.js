const express = require('express');
const app = express();
const port = process.env.PORT || 7777;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`Webserver running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
	res.sendFile('public/index.html');
});
