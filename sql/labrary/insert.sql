USE labrary;

DELETE FROM products;

SET NAMES 'utf8';
--
-- Enable LOAD DATA LOCAL INFILE on the server.
--
SET GLOBAL local_infile = 1;
SHOW VARIABLES LIKE 'local_infile';

--
-- Insert into kund.
--

DELETE FROM products;
LOAD DATA LOCAL INFILE 'products.csv'
INTO TABLE products
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;
SELECT * FROM products;

