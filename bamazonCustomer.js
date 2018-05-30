//require inquirer and mysql packages
var inquirer = require("inquirer");
var mysql = require("mysql");

//connection to MySQL database 
//NOTE: password required due to my Oracle account; will need to replace based on your computer settings
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Merlin01",
	database: "bamazon"
});

//confirm connection to database
connection.connect(function(err) {
	if (err) throw err;
	console.log("You are connected to the bamazon_db!");
  });