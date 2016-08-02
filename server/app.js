"use strict";

let express = require("express");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let mongoUtil = require("./mongoUtil");

mongoUtil.connect();

const host = (process.env.IP || '0.0.0.0');
const port = (process.env.PORT || 3000);

let app = express();

app.use(express.static(__dirname + "/../client"));

app.get("/sports", (request, response) => {
	let sports = mongoUtil.sports();
	sports.find().toArray((err, docs) => {
		if(err) response.sendStatus(400);
		console.log(JSON.stringify(docs));
		let sportNames = docs.map((sport) => sport.name);
		response.json(sportNames);
	});
});

app.get("/sports/:name", (request, response) => {
	let sportName = request.params.name;
	let sports = mongoUtil.sports();

	sports.find({name: sportName}).limit(1).next((err,doc) => {
		if(err) response.sendStatus(400);
		console.log("Sport doc: ", doc);
		response.json(doc);
	});
});

app.post("/sports/:name/medals", jsonParser, (request, response) => {
	let sportName = request.params.name;
	let newMedal = request.body.medal;

	if(!newMedal.division || !newMedal.year || !newMedal.country){
		response.sendStatus(400);
	} else {

	let sports = mongoUtil.sports();
	let query = {name: sportName};
	let update = {$push: {goldMedals: newMedal}};

	sports.findOneAndUpdate(query, update, (err, res) => {
		if(err) response.sendStatus(400);
		response.sendStatus(201);
	});
	console.log("Sport name:",sportName)
	console.log("Medal:",newMedal);
	}
});

app.listen(port, () => console.log(`Server running at http://${host}:${port}/`));
