const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const sha256 = require('js-sha256');
const nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static("public"));
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

userList = [];
recipeList = [];

app.post("/verification", async function(req,res) {
    try {
        await db.query(`SELECT id FROM user WHERE id = ${req.body.userID}`);
        res.send("verified");
    }
    catch {
        res.send("not verfied");
    }
});

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "./public/login.html"));
// });

app.post("/api/login", async function(req, res) {
    const password = sha256(req.body.password);
    // const password = req.body.password;

    console.log( `[login] attempting login with email(${req.body.email}) password(${password})` );
    
    try {
        var response = {};
        var userInfo = await db.query(`SELECT id FROM user WHERE email = '${req.body.email}' AND password = '${password}'`);
        console.log( `.. checked database, response: `, userInfo );
        const userID = userInfo[0].id;

        if (userInfo[0].deduction_notification !== null && userInfo[0].deduction_notification !== 0) { response.deductions = userInfo[0].deduction_notification };
        res.send({ status: 1, userID });
    } catch(error) {
        console.log( `awww shucks sorry that didn't work, try another login? `, error );
        res.send({ status: 0, error: "incorrect login"});
    };
});

app.get("/api/register", async function(req,res) {
    const password = req.body.password;
    const email = req.body.email;

    console.log( `[register] attempting registration with email(${email}) password(${password})` );
 
    var response = {};
    let existEmail = await db.query(`SELECT email FROM user WHERE email = '${email}'`);

    if (existEmail[0] !== undefined) {
        response.email = "Email exists";
    };
    if (Object.keys(response).length == 0 && req.body.errorCount == 0) {
        await db.query(`INSERT INTO user (email, password) VALUES ('${req.body.email}', '${sha256(req.body.password)}')`);
        // await db.query(`INSERT INTO user (email, password) VALUES ('${email}', '${password}')`);
        let useridObj = await db.query(`SELECT id FROM user WHERE email = '${email}'`);
        userid = useridObj[0].id;
        response.success = "Success";
        response.userID = userid;
    };
    res.send(response);
});

app.post("/api/register", async function(req,res) {
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

app.post("/api/forgotPassword", async function(req,res) {
    var userInfo = await db.query(`SELECT id, password FROM user WHERE email = "${req.body.email}"`)
    var payload = {
        userID: userInfo[0].id,
        email: req.body.email
    };
    var secret = userInfo[0].password;
    var token = jwt.encode(payload,secret);
    if (process.env.JAWSDB_URL) { prefix = ''}
    else { prefix = `http://localhost:${PORT}/`}
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

// app.get("/main", async function(req,res) {
//     res.sendFile(path.join(__dirname, "/public/index.html"));
// });

app.post("/savedRecipes", async function(req, res) {
    var recipes = {};
    
});

app.post("/deleteRecipe", async function(req,res) {
    
});

app.post("/deleteAccount", async function(req,res) {
 
});

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));