const path = require("path");
const http = require("http");

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const api = require("./backend/api");

var app = express();
app.use(express.json());
app.use(cors());

const auth = require("./backend/auth");

const port = 8080;
const host = "0.0.0.0";

var server = http.createServer(app);

// Configure session middleware
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});

app.use(sessionMiddleware);

server.listen(port, host, ()=>{
    console.log("Server running on port " + port);
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

app.get("/user/*", auth.userPageMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/user/index.html"));
});

app.get("/admin/*", auth.adminPageMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/admin/index.html"));
});

app.get("/login/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/login/index.html"));
});