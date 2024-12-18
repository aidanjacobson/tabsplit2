const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

const remote = require("./backend/utils/remote");

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const api = require("./backend/api");

var app = express();
app.use(express.json());
app.use(cors());

const auth = require("./backend/auth");

const port = 42070;
const host = "0.0.0.0";

var server;
var secure = false;
if (remote.isRemote()) {
    var privateKey = fs.readFileSync("/ssl/privkey.pem");
    var certificate = fs.readFileSync("/ssl/fullchain.pem");
    var credentials = {key:privateKey,cert:certificate};
    server = https.createServer(credentials, app)
    secure = true;
} else {
    server = http.createServer(app);
}

// Configure session middleware
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: secure }
});

app.use(sessionMiddleware);

server.listen(port, host, ()=>{
    console.log("Server running on port " + port);

    
    remote.server.port = port;
    remote.server.ui = "admin";
    var url = remote.server.getInterfaceURL();
    console.log("UI available at", url);
});

app.use("/api", api);

app.get("/", (req, res)=>{
    if (req.session.type === "user") {
        res.redirect("/user");
    } else if (req.session.type === "admin") {
        res.redirect("/admin");
    } else {
        res.redirect("/login");
    }
});

// route / to the frontend/ folder
// app.use("/", express.static(path.join(__dirname, "frontend")));

// app.use("/login", express.static(path.join(__dirname, "frontend/login")));
app.use("/user", auth.userPageMiddleware, express.static(path.join(__dirname, "frontend/user")));
app.use("/admin", auth.adminPageMiddleware, express.static(path.join(__dirname, "frontend/admin")));

app.use("/", express.static(path.join(__dirname, "frontend")));