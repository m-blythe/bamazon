-- Create a database called 'Bamazon' and switch into it for this activity --
CREATE DATABASE Bamazon;
USE Bamazon;

-- Create a table called 'products' which will contain the store inventory --

CREATE TABLE products 
(
item_id INT(11) NOT NULL AUTO_INCREMENT,
product_name varchar(50),
department_name varchar(50),
price decimal(6,2),
stock_quantity decimal(6,0),
PRIMARY KEY (item_id)
);



-- Insert data into the 'products' table --
INSERT INTO products
(product_name, department_name,price,stock_quantity)

VALUES
("Near Or Far","Books",12.99,25),
("Blouse","Clothing",24.99,10),
("Laptop","Computers",549.00,4),
("Mouse","Computers",15.00,10),
("Pants","Clothing",35.00,10),
("Belt","Clothing",20.00,5),
("Ballet Flats","Shoes",45.00,8),
("Personal Radio","Electronics",20.00,10),
("Flashlight","Electronics",10.00,9),
("Pride & Prejudice","Books",14.50,10),
("Running for Dummies","Books",13.00,10)
;



