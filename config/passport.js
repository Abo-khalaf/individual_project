var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query ('USE ' + dbconfig.database);

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ?", [id],
        function(err, rows){
            done(err, rows[0]);
        });
    })

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            emailField: 'email',
            passReqToCallback: true
        },
        function(req, username, password, done, email, mobile){
            var email = req.body.email;
            var mobile = req.body.mobile;

            console.log(email)
            connection.query("SELECT * FROM users WHERE username = ? ",
            [username], function(err, rows){
                if(err)
                    return done(err);
                if(rows.length){
                    return done(null, false, req.flash('signupMessage', 'That is already taken'));
                }else{
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null),
                        email: email,
                        mobile: mobile
                    };

                    var  insertQuery = " INSERT INTO users (username,  password, email, mobile) values (?, ?, ?, ?)";

                  res = connection.query( insertQuery, [newUserMysql.username,   newUserMysql.password , newUserMysql.email, newUserMysql.mobile],
                        function(err, rows){
                            newUserMysql.id = rows.insertId;
                            console.table(email)
                            return done(null, newUserMysql);
                        });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done){
            connection.query("SELECT * FROM users WHERE username = ? ", [username],
            function(err, rows){
                if(err)
                    return done(err);
                if(!rows.length){
                    return done(null, false, req.flash('loginMessage', 'No User Found'));
                }
                if(!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Wrong Password'));


                return done(null, rows[0]);
            });
        })
    );
};




// function(req, username, password, email, mobile, done){
//     connection.query("SELECT * FROM users WHERE username = ? ",
//     [username], function(err, rows){
//         if(err)
//             return done(err);
//         if(rows.length){
//             return done(null, false, req.flash('signupMessage', 'That is already taken'));
//         }else{
//             var newUserMysql = {
//                 username: username,
//                 email: email,
//                 mobile: mobile,
//                 password: bcrypt.hashSync(password, null, null)
//             };

//             var insertQuery = " INSERT INTO users (username, email, mobile, password) values (?, ?, ? ?)";

//             connection.query(insertQuery, [newUserMysql.username, newUserMysql.email, newUserMysql.mobile, newUserMysql.password],
//                 function(err, rows){
//                     newUserMysql.id = rows.insertId;

//                     return done(null, newUserMysql);
//                 });
//         }
//     });
// })