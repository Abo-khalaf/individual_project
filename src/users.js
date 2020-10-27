/**
 * A module exporting functions to eshop database.
 */
"use strict";

module.exports = {
    showKatagori:      showKatagori,
    makeOrder:          makeOrder,
    addToProfile:       addToProfile,
    showOrder:          showOrder,
    createProdukt:      createProdukt,
    editProdukt:        editProdukt,
    showOne:            showOne,
    deleteProdukt:       deleteProdukt,
    // showProduct2shelves:  showProduct2shelves
};

const mysql = require("promise-mysql");
const config = require("../config/labrary");
let db;


// Main functions
(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();


async function showKatagori() {
    return findAllInTable("products");
}

async function showOrder() {
    return findAllInTable("borrow_table");
}







async function findAllInTable(table) {
    let sql = `SELECT * FROM ??;`;
    let res;

    res = await db.query(sql, [table]);
    console.table(res);
    return res;
}

async function createProdukt(a_photo, a_category, a_type, a_quantity) {
    let sql = `CALL insert_produkt(?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [a_photo, a_category, a_type, a_quantity]);
    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}


async function showOne(Id) {
    let sql = `CALL show_id(?);`;
    let res;

    res = await db.query(sql, [Id]);
    //console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);

    return res[0];
}



async function deleteProdukt(category) {
    let sql = `CALL drop_a_book(?);`;
    let res;

    res = await db.query(sql, [category]);
    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}


async function editProdukt(Id, photo, category, type, quantity) {
    let sql = `CALL updatera_produkt(?, ?, ?, ?, ?);`;
    let res;

    res = await db.query(sql, [Id, photo, category, type, quantity]);
    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}

// a_id
// a_photo
// a_category
// a_type
// a_quantity


async function deleteProdukt(category) {
    let sql = `CALL delete_produkt(?);`;
    let res;

    res = await db.query(sql, [category]);
    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}


async function makeOrder(Id) {
    let sql = `CALL add_order(?);`;
    let res;

    res = await db.query(sql, [Id]);
    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}


async function addToProfile(productId, userId) {
    let sql = `CALL add_to_profile(?, ?);`;
    let res;

    res = await db.query(sql, [productId, userId]);
    console.log(res);
    console.info(`SQL: ${sql} got ${res.length} rows.`);
}





// async function showProduct2shelves(search) {
//     const db = await mysql.createConnection(config);
//     let like = `%${search}%`;
//     let sql = ` CALL sok_i_lagret(?)`;
//     let res;

//     res = await db.query(sql, [like]);
//     console.table(res[0]);
// }

// async function showProduct2shelves(search) {
//     let sql = ` CALL sok_i_lagret(?)`;
//     let res;
//     let like = `%${search}%`;
    
//     res = await db.query(sql, [like]);
//     console.table(res[0])
//     console.info(`SQL: ${sql} got ${res.length} rows.`);
//     return res[0];
// }





// async function showOrder(id) {
//     let sql = `CALL show_orders(?);`;
//     let res;

//     res = await db.query(sql, [id]);
//     console.log(res);
//     console.info(`SQL: ${sql} got ${res.length} rows.`);
// }
