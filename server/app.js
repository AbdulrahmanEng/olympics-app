'use strict';

let express = require('express');
let mongoUtil = require('./mongoUtil');
mongoUtil.connect();
const host = process.env.IP;
const port = process.env.PORT;

let app = express();

app.use(express.static(__dirname + '/../client'));

app.get('/sports', (request, response) => {
	let sports = mongoUtil.sports();
	sports.find().toArray((err, docs) => {
		console.log(JSON.stringify(docs));
		let sportNames = docs.map((sport) => sport.name);
		response.json(sportNames);
	});
});

app.listen(port, () => console.log(`Server running at http://${host}:${port}/`));
