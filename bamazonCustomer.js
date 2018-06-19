//require inquirer and mysql packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("easy-table");

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

	//Test to make sure I can connect to the db
	//console.log("You are connected to the bamazon_db!");

	//display all the items available in my bamazon store
	displayStoreItems()

	});


// * --  Display All of the products in my store in a table, sorted by department
var displayStoreItems = function() {
  var query = 'SELECT * FROM Products ORDER BY department_name'
  connection.query(query, function(err, res) {
			console.log(Table.print(res));
			/*
      for (var i = 0; i < res.length; i++) {
          console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Stock: " + res[i].stock_quantity);
			}
			*/
      shoppingCart();
    })
};
/*
//After items have been purchased, update the stock quantity column to reflect the new quantity
var updateStockQuantity = function() {
	var query = 'UPDATE products SET stock_quantity = stock_quantity - parseInt(answer.Quantity) WHERE item_id = parseInt(answer.ProductID)'
	connection.query(query, function(err,res){
		console.log("Stock quantity for the item you purchased has been reduced!");

		displayStoreItems();
	})
};
*/
var shoppingCart = function() {
	return inquirer.prompt([{
			name: 'item',
			message: 'Enter the item number of the product you would like to purchase.',
			type: 'input',
			// Validator to ensure the product number is a number and it exists
			validate: function(value) {
					if ((isNaN(value) === false)) {
							return true;
					} else {
							console.log('\nPlease enter a valid ID.');
							return false;
					}
			}
	}, {
			name: 'quantity',
			message: 'How many would you like to buy?',
			type: 'input',
			// Validator to ensure it is number
			validate: function(value) {
					if (isNaN(value) === false) {
							return true;
					} else {
							console.log('\nPlease enter a valid quantity.');
							return false;
					}
			}
			// new promise to pull all data from SQL
	}]).then(function(answer) {
			return new Promise(function(resolve, reject) {
					connection.query('SELECT * FROM products WHERE ?', { item_id: answer.item }, function(err, res) {
							if (err) reject(err);
							resolve(res);
					});
					// Then if selected quanitity is valid, save to a local object, else console log error
			}).then(function(result) {
					var savedData = {};

					if (parseInt(answer.quantity) <= parseInt(result[0].stock_quantity)) {
							savedData.answer = answer;
							savedData.result = result;
					} else if (parseInt(answer.quantity) > parseInt(result[0].stock_quantity)) {
							console.log('Insufficient quantity!');
					} else {
							console.log('An error occurred, exiting Bamazon, your order is not complete.');
					}
					
					return savedData;
					// Update the SQL DB and console log messages for completion.
			}).then(function(savedData) {
					if (savedData.answer) {
							var updatedQuantity = parseInt(savedData.result[0].stock_quantity) - parseInt(savedData.answer.quantity);
							var itemId = savedData.answer.item;
							var totalCost = parseInt(savedData.result[0].price) * parseInt(savedData.answer.quantity);
							connection.query('UPDATE products SET ? WHERE ?', [{
									stock_quantity: updatedQuantity
							}, {
									item_id: itemId
							}], function(err, res) {
									if (err) throw err;
									console.log('Your order total cost $' + totalCost + '. Thank you for shopping at Bamazon!');
									displayStoreItems();
									//connection.destroy();
							});
					} else {
							// go back to display store items
							displayStoreItems();
					}
					// catch errors
			}).catch(function(err) {
					console.log(err);
					connection.destroy();
			});
			// catch errors
	}).catch(function(err) {
			console.log(err);
			connection.destroy();
	});
}