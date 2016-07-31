'use strict';

let express = require('express');
let app = express();

const host = process.env.IP;
const port = process.env.PORT;

app.use(express.static(__dirname + '/../client'));

app.get('/sports', (request, response) => {
	response.json(["Equestrian", "Swimming", "Track & Field"]);
});

app.listen(port, () => console.log(`Server running at http://${host}:${port}/`));
