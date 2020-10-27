# Lab Management: 

This is a online application made for allow the users to borrow things from technology warehouse 

 
 

## Lab environment 

If you want use this app from your computer you need to download a few programs to use it as a Admin  

1- First you need to download a /Atom/ and Terminal like Cygwin, here is the links to download  

2-MySQL community server should be also installed, here is the link to download it. 

2- You need to download NodeJS on your computer and install the NPM. Here is the link where you can download Node.js. 

 
 

## how to use this app: 

First thing first you need to download the files from GitHub then this is a few commands to use:  

1. command: /npm install/. open terminal in the same file that  contain files  which been downloaded from GitHub. 

2. During the installation of MySQL you will be creating a default user (root) with a password which will be used when you are going to create the new database and user, 

so first time that you will open the database you will write the command: /mysql -uroot -p/ 

then you will write the password that you choose for the root user. 

3. after that you need to create database and user for the new database by doing the below :- 

 
 

![A test image](Movavi2.png) 

 
 

4.the next step will be going to ddl.sql file which exist in sql/labrary by Terminal writing the command: (cd sql/labrary). then open the database again with the command: /mysql -uroot -p/ 

5. copy all the tables in the ddl.sql file and paste it in the terminal to run it. 

you can write command /show tables;/ to see all the tables in your database. 

6. copy the code from insert.sql file and paste it in the terminal to full the table of the products for the first time. 

7. copy all the procedure from the ddl.sql file except the procedure(change_role) and paste it in the terminal 

## the things that you can do it in this webpage  

First in this application you have tow types from users  

_ Admin 

_ Regular User 

 so you are as Admin for this website you can control it so you can  

 . Add a product: by a button in the navbar (create product)  

 . Delete a product: by a logo next of every product  

 . Edit product: by a logo next of every product 

 but u can do no thing with out login so u need to log in as an Admin to do all those things. 

 as a regular user you can just to borrow a product by a button (show product) then you will go to a page have just this product after that if the user click on (borrow product) button, the product will be added on a borrow_table, This table is on a page called Profile, and this page contains all the information current user, and each user can see only the products that he has borrowed but just the admin has a button on his profile page allow him to see all borrowed products and the users who borrowed them.  

 If you don't have an account in this website and you wont to borrow something from it you can create an account by a button in the log in site (register) you need to full your information to allow you to borrow a product from this application and the website will save your information to log in in the next time by your name and the password. 

 ## Make a user an Admin 

 now you have name:(muhamed), password(1234) as an admin, in the users table there is a column called role and it has a default value (user)but if u want to make a user as an admin you need to change the role to (admin) and you can do it with a procedure but you need first to go in to the Database that you use and active this procedore (change_role) and call it with the Email that the user using and admin word. 

 you can see that in the Example: 

![A test image](Movavi1.png) 