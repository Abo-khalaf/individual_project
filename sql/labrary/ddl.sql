

--
-- Create table: kund
--
DROP TABLE IF EXISTS users;

CREATE TABLE `users`
(
    id INT AUTO_INCREMENT,
    `username` TEXT ,
    `password` TEXT,
    `email` TEXT,
    `mobile` INT,
    `role` VARCHAR(10) DEFAULT "user",

    PRIMARY KEY (id)
)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;


--
-- Create table: `order`
--



DROP TABLE IF EXISTS products;
CREATE TABLE `products`
(

    `photo`VARCHAR(25),
    `category`VARCHAR(50),
    `type`VARCHAR(25),
    `quantity` INT,
    `Id`INT AUTO_INCREMENT,
    PRIMARY KEY (Id)


)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;



DROP TABLE IF EXISTS borrow_table;

CREATE TABLE `borrow_table`
(

    `category` VARCHAR(50),
    `username` VARCHAR(50),
    `type` VARCHAR(20),
    `quantity` INT DEFAULT 1,
    `date1`  DATE,
    `return_date` VARCHAR(110) DEFAULT "You should return the product within 30 days" ,
    `id`INT AUTO_INCREMENT,
    userId INT NOT NULL,
    productId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES products(id)

)
ENGINE INNODB
CHARSET utf8
COLLATE utf8_swedish_ci
;
INSERT INTO `date`(date,return_date) VALUES (NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY));





DROP PROCEDURE IF EXISTS add_to_profile;
DELIMITER ;;
CREATE PROCEDURE add_to_profile
(
        `a_productId` VARCHAR(50),
        `a_userId` VARCHAR(50)
)
BEGIN
    UPDATE
        borrow_table
        AS b
    INNER JOIN users 
        AS s
        ON s.id = b.userId
    SET
        b.date1 = NOW()
        WHERE

            s.Id = a_userId;
    INSERT
        INTO borrow_table(productId, userId, `date1`, return_date, `category`, `type`, username) VALUES (a_productId, a_userId, DATE_FORMAT(CURDATE(),"%Y-%m-%d"), DATE_ADD(NOW(), INTERVAL 30 DAY),(
            SELECT 
        p.category AS category1
    FROM 
        products 
    AS 
        p
    WHERE
        p.Id = a_productId
        ), (SELECT 
        p.type  AS type1
    FROM 
        products 
    AS 
        p
    WHERE
        p.Id = a_productId),(
            SELECT 
        s.username AS username1
    FROM 
        users 
    AS 
        s
    WHERE
        s.Id = `a_userId`));

    UPDATE
        products
    AS p
    SET
        p.quantity = 0
    WHERE

            p.Id = a_productId;
END
;;
DELIMITER ;
CALL add_to_profile(2, 1);  





DROP PROCEDURE IF EXISTS add_order;
DELIMITER ;;
CREATE PROCEDURE add_order(
    `a_Id` VARCHAR(50)
)
BEGIN
    SELECT category, type, id FROM products
WHERE
    `Id` = a_Id;
END
;;
DELIMITER ;
CALL add_order(1);
CALL add_order('Island of Dragons');
CALL add_order('The Phoenix of Destiny: An Epic Kingdom of Fantasy');







DROP PROCEDURE IF EXISTS drop_a_product;
DELIMITER ;;
CREATE PROCEDURE drop_a_product(
    a_id VARCHAR(20)
)
BEGIN
    DELETE FROM products
WHERE
    `Id` = a_id;
END
;;
DELIMITER ;
CALL drop_a_product(15);



-- ________
DROP PROCEDURE IF EXISTS insert_produkt;
DELIMITER ;;
CREATE PROCEDURE insert_produkt
(

    `a_photo`VARCHAR(25),
    `a_category`VARCHAR(50),
    `a_type`VARCHAR(25),
    `a_quantity` INT
)
BEGIN
    INSERT INTO products(photo, category, type, quantity) VALUES (a_photo, a_category, a_type, a_quantity);
END
;;
DELIMITER ;

CALL insert_produkt('16_50.jpg','50 American Heroes Every Kid Should Meet','kid',1);

SELECT * FROM products;



DROP PROCEDURE IF EXISTS show_id;
DELIMITER ;;
CREATE PROCEDURE show_id
(
    `a_id` INT
)
BEGIN
    SELECT * FROM products WHERE Id = a_id;
END
;;
DELIMITER ;

CALL show_id(8);





DROP PROCEDURE IF EXISTS updatera_produkt;
DELIMITER ;;
CREATE PROCEDURE updatera_produkt
(
    `a_id` INT,
    `a_photo` VARCHAR(25),
    `a_category` VARCHAR(50),
    `a_type` VARCHAR(25),
    `a_quantity` INT
)
BEGIN
    UPDATE products SET
        `photo` = a_photo,
        `category` = a_category,
        `type` = a_type,
        `quantity` = a_quantity
    WHERE
        `Id` = a_id;
END
;;
DELIMITER ;

CALL updatera_produkt(33, "hej", "hej", "hej", 22);






DROP PROCEDURE IF EXISTS delete_produkt;
DELIMITER ;;
CREATE PROCEDURE delete_produkt(
    `a_category` VARCHAR(50)
)
BEGIN
    DELETE FROM products
    WHERE
        `category` = a_category;
END
;;
DELIMITER ;


CALL delete_produkt("hej23424");
















DROP PROCEDURE IF EXISTS change_role;
DELIMITER ;;
CREATE PROCEDURE change_role(
    `a_email` VARCHAR(40),
    `a_role` VARCHAR(10)

)
BEGIN
    UPDATE users SET
        `role` = a_role
    WHERE
        `email` = a_email;
END
;;
DELIMITER ;

CALL change_role("mood@gmail.com", "admin")



DROP PROCEDURE IF EXISTS sok_i_lagret;
DELIMITER ;;
CREATE PROCEDURE sok_i_lagret(
    search VARCHAR(50)
)
BEGIN
    SELECT * FROM products
    WHERE Id LIKE search OR
    category LIKE search;
END
;;
DELIMITER ;

CALL sok_i_lagret(1);








DROP PROCEDURE IF EXISTS show_orders;
DELIMITER ;;
CREATE PROCEDURE show_orders
(
    `a_id` INT
)
BEGIN
    SELECT
        * 
    FROM
        borrow_table
    AS b

    WHERE 
        b.userId = a_id;
END
;;
DELIMITER ;

CALL show_orders(1);



