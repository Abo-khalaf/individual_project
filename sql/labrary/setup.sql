



-- Skapa databas
DROP DATABASE IF EXISTS labrary;
CREATE DATABASE labrary;

-- Välj vilken databas du vill använda
USE labrary;


-- Skapa en användare user med lösenorder pass och ge tillgång oavsett
-- hostnamn. 
CREATE USER 'user'@'localhost' IDENTIFIED BY '1234';
-- CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED WITH mysql_navtive_password BY 'pass';



-- Ge användaren alla rättigheter på en specifk databas.
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
-- GRANT ALL PRIVILEGES ON eshop.* TO 'user'@'%';