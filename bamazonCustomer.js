//mysql for database inquirer to ask customer questions

var mysql = require("mysql");
var inquirer = require("inquirer");

var productArray = [];

// connection for  sql database

var connection = mysql.createConnection({
  socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
afterConnection();

displayProducts();

buyScreen();
    
  });
  var displayProducts = function(){
      var query = "SELECT * FROM products"
      connection.query(query, function(err, results){
        if (err) throw err;

        for (var x = 0; x < results.length; x++) {
            console.log("ID#: " + results[x].item_id + ", '" + results[x].product_name + "', Price: $" + results[x].price);
            productArray.push("ID#:" + results[x].item_id + ", " + results[x].product_name);
        }
      })
    };


function buyScreen() {
  
      inquirer.prompt([
          {
              name: "item_id",
              type: "input",
              choices: productArray,
              message: "Which item id would you like to purchase?"
          },
          {
              name:"quantityPurchase",
              type: "input",
              message: "How many would you like?"
          }
      ])
      .then(function (answer) {
        var quantityPurchased = answer.quantityPurchase;

        var query = "SELECT * FROM products WHERE ?";

        var split1 = answer.item_id.split(",", 1);
        var split2 = split1[0].split(":", 2);
        var final = split2[1];

        console.log("Confirming your order..");

        connection.query(query, { item_id: final }, function (err, res) {
            if (err) throw err;

            var productName = res[0].product_name;
            var stock = res[0].stock_quantity;
            var productPrice = res[0].price;
            var total = productPrice * quantityPurchased;

            if ((stock - quantityPurchased) > 0) {
                console.log("\nWe are able to fulfill your order.\n");

                // New stock quantity after subtracting the user's current order
                var newStockQuantity = stock - quantityPurchased;

                console.log("Your purchase order:");
                console.log(productName + " ($" + productPrice + ") x " + quantityPurchased + " = $" + total);
                updateProduct(productName, newStockQuantity);
            } else {
                console.log("Sorry, unable fulfill your order.");
                connection.end();
            }
        }
        );

    });
}

function updateProduct(productName, stock) {
    console.log("\nUpdating Bamazon products DB with customer order quantity...\n");

    // connection query to update the stock quantity in the bamazon's products db
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: stock
            },
            {
                product_name: productName
            }
        ],
        function (err, res) {
            console.log(res.affectedRows + " product(s) updated!\n");
            connection.end();
        }
    );
}  
  
    function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
     // console.log(res);
      connection.end();
    });
}
