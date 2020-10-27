
"use strict";

const express = require("express");
const router  = express.Router();
const app = express();

app.use("/static", express.static(__dirname + "/static"));
// app.set('view engine', 'ejs');



var user = require("../src/users");

// router.get("/users", async (req, res) => {
//     try {
//         const pods = await user.showKatagori();
//         res.status(201).send(pods);
//        } catch (e) {
//          res.status(400).send({ error: e });
//        }
// });
//     app.get("/category", async (req, res) => {
        let data = {
    
            title: "Welcome | the eshop"
    
        };
    
        data.res =  Users.showKatagori();
        res.render('category.ejs', data);
    });


module.exports = router;
