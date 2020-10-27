
module.exports = function(app, passport) {

    const bodyParser = require("body-parser");
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    var users = require("../src/users");

    app.get("/", function(req, res){
        res.render('index.ejs')
    });

    app.get("/login", function(req, res){
        res.render('login.ejs', {message:req.flash('loginMessage')});
    });

    app.post("/login", passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true 
    }),
    function(req, res){
        if(req.body.remember){
            req.session.cookie.maxAge = 1000 * 60 * 3;
        }else{
            req.session.cookie.expires = false;
        }
        res.redirect("/");
    });

    app.get("/signup", function(req, res){
        res.render('signup.ejs', {message:req.flash('signupMessage')});
    });

    app.post("/signup", passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true 
    }));

    app.get('/add_prof/:Id', isLoggedIn, async (req, res)=>{
        let id = req.params.Id;
        res1 = await users.addToProfile(id);
        res.render("profile",{
            user:req.user, 
            res1
        });
    });


    // app.get("/profile", isLoggedIn, async (req, res) => {
    //     // let id = req.params.Id;
    //     // res1 = await users.addToProfile(id);
    //     // res.render("profile",{
    //     //     user:req.user, 
    //     //     res1
    //     // });
    //     // res1 = await users.showOrder();
    //     res.render('profile', {
    //         user:req.user
    //     });
    // });


    // app.get("/orders/Id", isLoggedIn, async (req, res) => {
    //     let id = req.params.Id;
    //     res1 = await users.addToProfile(id);
    //     res.render('orders', {
    //         user:req.user, 
    //         res1
    //     });
    // });


    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    })

    app.get("/category", isLoggedIn, async (req, res) => {

        res1 = await users.showKatagori();
        
        res.render('category', {
            user:req.user, 
            res1
        });
    });




    // create product...........
    app.get("/product-create", isLoggedIn, (req, res) => {
        res.render("product-create", {
            user:req.user
        });
    });
    
    app.post("/product-create", urlencodedParser, async (req, res) => {
        // console.log(JSON.stringify(req.body, null, 4));
        await users.createProdukt(req.body.a_photo,
            req.body.a_category, req.body.a_type, req.body.a_quantity);
        res.redirect("/category");
    });

    
// show cotegory by Id
    app.get("/product-show/:Id", async (req, res) => {
        let id = req.params.Id;

        res1 = await users.showOne(id);
        res.render("category", {
            user:req.user, 
            res1
        });
    });
    
    


    // edit category _______
    app.get("/edit/:Id",isLoggedIn , async (req, res) => {
        let id = req.params.Id;

        res1 = await users.showOne(id);
        res.render("product-edit",{
            user:req.user, 
            res1
        });
    });

    app.post("/edit", urlencodedParser, async (req, res) => {
        //console.log(JSON.stringify(req.body, null, 4));
        await users.editProdukt(req.body.a_id, req.body.a_photo,
            req.body.a_category, req.body.a_type, req.body.a_quantity);
        res.redirect(`category`);
    });


    app.get("/delete/:Id",isLoggedIn , async (req, res) => {
        let id = req.params.Id;

        res1 = await users.showOne(id);
        res.render("product-delete",{
            user:req.user, 
            res1
        });
    });

    app.post("/delete", urlencodedParser, async (req, res) => {
        await users.deleteProdukt(req.body.a_category);
        res.redirect(`category`);
    });

    app.get('/show/:Id', isLoggedIn, async (req, res) =>{
        let id = req.params.Id;
        res1 = await users.showOne(id);
        res.render("product-add",{
            user:req.user, 
            res1
        });

    });

    // app.get('/add_prof/:Id', isLoggedIn, async (req, res) =>{
    //     let id = req.params.Id;
    //     res1 = await users.addToProfile(id);
    //     res.render("profile",{
    //         user:req.user, 
    //         res1
    //     });
    // });


    // app.get("/profile/id", isLoggedIn, async (req, res) => {
    //     let id = req.params.id;
    //     res2 = await users.showOrder(id);
    //     res.render('profile', {
    //         user:req.user, 
    //         res2: res2
    //     });
    // });


    app.get("/profile", isLoggedIn, async (req, res) => {
        // let id = req.params.id;
        res2 = await users.showOrder();
        let dtFormat=new Intl.DateTimeFormat("en-US");
        
        res.render('profile', {
            user:req.user, 
            res2, dtFormat
        });
    });


    app.get("/borrows_categories", isLoggedIn, async (req, res) => {
        // let id = req.params.id;
        res2 = await users.showOrder();
        let dtFormat=new Intl.DateTimeFormat("en-US");
        res.render('borrows_categories', {
            user:req.user, 
            res2,dtFormat
        });
    });



    app.get('/product-add/:productId/:userId', isLoggedIn, async (req, res) =>{
        let productId = req.params.productId;
        let userId = req.params.userId;

        res1 = await users.addToProfile(productId, userId);
        res.render("orders",{
            user:req.user, 
            res1

        });
        res.redirect("/profile")
    });



    // app.get("/category", async (req, res) => {

    //     if (req.query.search == null) {
    //         res1 = await users.category();
    //         console.log(data.res)
    //     } else {
    //         res = await  users.showProduct2shelves(req.query.search);
    //         console.log("this is data res search")
    //     }
    //     res.render("show-log");
    // });
    
    // app.post('/category', urlencodedParser, async (req, res) => {
    //     await users.showProduct2shelves(req.body.search);
    
    //     res.redirect("category");
    // });
    
    

};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
}