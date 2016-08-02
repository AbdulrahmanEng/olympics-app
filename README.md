# Olympics Tracker

A MEAN stack application that gives users the ability to post medals. Utilises Grunt for task running. [Built from Watch Us Build](https://www.codeschool.com/shows/watch-us-build) screencasts.

*MongoDB server has to be running*

## Instructions

* run ```npm install```
* Start MongoDB service and Grunt transpiler task.
* ``npm start`` to start application.
* Seed MongoDB database: ``mongoimport --db olympics-dev --collection sports --type json --file data/sports-seed.json --jsonArray --drop``.
* Go http://localhost:3000
