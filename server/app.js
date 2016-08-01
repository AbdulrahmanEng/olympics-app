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

app.get('/sports/:name', (request, response) => {
	let sportName = request.params.name;
	console.log("Sport name: ", sportName);

	let sport = {
		"name": "Equestrian",
		"goldMedals": [
		{
			"division": "Individual jumping",
			"country": "Switzerland",
			"year": 2020
		},
		{
			"division": "Individual eventing",
			"country": "Japan",
			"year": 2020
		}]
	};
	response.json(sport);
});

app.listen(port, () => console.log(`Server running at http://${host}:${port}/`));
