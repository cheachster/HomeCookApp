const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const sha256 = require('js-sha256');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

aapp.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
};
  
if (process.env.JAWSDB_URL) {
    db = new Database(process.env.JAWSDB_URL);
} else {
    db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "linda123",
    database: "recipesDB"
    
  });
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'homecookhelp@gmail.com',
      pass: 'linda123'
    }
});
  
var mailOptions = {
    from: 'homecookhelp@gmail.com',
    to: '',
    subject: "Password reset",
    text: "Hello! You've requested to reset your password. Please click the link below to reset your password."
};

userList = [];
recipeList = [];

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

app.post("/verification", async function(req,res) {
    try {
        await db.query(`SELECT id FROM user WHERE id = ${req.body.userID}`);
        res.send("verified");
    }
    catch {
        res.send("not verfied");
    }
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/login.html"));
});

app.post("/", async function(req, res) {
    try {
        var response = {};
        var userInfo = await db.query(`SELECT id FROM user WHERE email = '${req.body.email}' AND password = '${sha256(req.body.password)}'`);
        response.userID = userInfo[0].id;
        if (userInfo[0].companyId !== null) { response.companyID = userInfo[0].companyId };
        if (userInfo[0].deduction_notification !== null && userInfo[0].deduction_notification !== 0) { response.deductions = userInfo[0].deduction_notification };
        res.send(response);
    } catch(error) {
        res.send({text: "incorrect login"});
    };
});

app.get("/register", async function(req,res) {
    res.sendFile(path.join(__dirname, "./public/register.html"));
});

app.post("/forgotPassword", async function(req,res) {
    var userInfo = await db.query(`SELECT id, password FROM user WHERE email = "${req.body.email}"`)
    var payload = {
        userID: userInfo[0].id,
        email: req.body.email
    };
    var secret = userInfo[0].password;
    var token = jwt.encode(payload,secret);
    if (process.env.JAWSDB_URL) { prefix = 'https://polar-fortress-89854.herokuapp.com/'}
    else { prefix = "http://localhost:8080/"}
    var link = `${prefix}resetpassword/${payload.userID}/${token}`;
    mailOptions.to = req.body.email;
    mailOptions.subject = "Password reset";
    mailOptions.text = `Hello! You've requested to reset your password. To reset your password, please click this link: ${link}`;
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        };
    });
});

app.get("/resetpassword/:id/:token", async function (req, res) {
    var secret = await db.query(`SELECT password FROM user WHERE id = ${req.params.id}`);
    try {
        var payload = jwt.decode(req.params.token, secret[0].password);
        res.sendFile(path.join(__dirname, "/public/resetpassword.html"));
    }
    catch {
        res.sendFile(path.join(__dirname, "/public/deadlink.html"));
    };
});

app.post("/setnewpassword", async function (req, res) {
    let newHashedPassword = sha256(req.body.password);
    await db.query(`UPDATE user SET password = '${newHashedPassword}' WHERE id = ${req.body.userID}`);
    res.send("done");
});

app.get("/main", async function(req,res) {
    res.sendFile(path.join(__dirname, "/public/main.html"));
});

app.post("/register", async function(req,res) {
    var response = {};
    let existEmail = await db.query(`SELECT email FROM user WHERE email = '${req.body.email}'`);
    if (existEmail[0] !== undefined) {
        response.email = "Email exists";
    };
    if (Object.keys(response).length == 0 && req.body.errorCount == 0) {
        await db.query(`INSERT INTO user (email, password) VALUES ('${req.body.email}', '${sha256(req.body.password)}')`);
        let useridObj = await db.query(`SELECT id FROM user WHERE email = '${req.body.email}'`);
        userid = useridObj[0].id;
        response.success = "Success";
        response.userID = userid;
    };
    res.send(response);
});

app.post("/savedRecipes", async function(req, res) {
    var recipes = {};
    let userBets = await db.query(`SELECT recipe_id, recipe FROM recipes WHERE user_Id = ${req.body.userID}`);
    recipes.userBets = userBets;
    // if (req.body.companyID !== "") {
    //     let companyName = await db.query(`SELECT name FROM company WHERE id = ${req.body.companyID}`);
    //     recipes.companyName = companyName[0].name;
    // };
    let userName = await db.query(`SELECT email FROM user WHERE id = ${req.body.userID}`);
    recipes.userName = userName[0].username;
    res.send(recipes);
});

app.post("/deleteRecipe", async function(req,res) {
    // inputPassword = sha256(req.body.password);
    // dbPassword = await db.query(`SELECT password FROM user WHERE id = ${req.body.userID}`);
    // if (inputPassword == dbPassword[0].password) {
    //     res.send("correct password")
    //     await db.query(`DELETE FROM user WHERE id = '${req.body.userID}'`);
    //     bet_id =  await db.query(`SELECT id FROM bet WHERE user_id = ${req.body.userID}`);
    //     for (a = 0; a < bet_id.length; a++){
    //         await db.query(`DELETE FROM bet WHERE id = ${bet_id[a].id}`);
    //     };
    // }
    // else { res.send("incorrect password") };
});

app.post("/deleteAccount", async function(req,res) {
    inputPassword = sha256(req.body.password);
    dbPassword = await db.query(`SELECT password FROM user WHERE id = ${req.body.userID}`);
    if (inputPassword == dbPassword[0].password) {
        res.send("correct password")
        await db.query(`DELETE FROM user WHERE id = '${req.body.userID}'`);
        bet_id =  await db.query(`SELECT id FROM recipe WHERE user_id = ${req.body.userID}`);
        for (a = 0; a < bet_id.length; a++){
            await db.query(`DELETE FROM recipes WHERE id = ${bet_id[a].id}`);
        };
    }
    else { res.send("incorrect password") };
});

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));