/*
    anyone allowed routes:
    /account/login
    /account/logout

    user allowed routes:
    /user/get
    /transaction/getUserBalance
    /transaction/getTransactions
    * note: user can only get their own details i.e. req.query.userID === req.session.userID

    admin allowed routes:
    * all routes
*/

function checkAPIPermissions(req, res, next) {
    // if the api-key header is present, verify it
    if (req.headers["api-key"] && req.headers["api-key"] === process.env.API_KEY) {
        next();
        return;
    }

    const anyoneRoutes = [
        "/account/login",
        "/account/logout"
    ];

    const userOwnRoutes = [
        "/user/get",
        "/transaction/getUserBalance",
        "/transaction/getTransactions",
        "/account/getNames"
    ];

    const userRoutes = [
        "/account/getNames",
        "/transaction/getMine"
    ]

    // check if the route is allowed for anyone
    if (anyoneRoutes.includes(req.path)) {
        next();
        return;
    }

    // check if user is logged in
    if (!req.session.username) {
        res.status(401).json({
            status: "failure",
            reason: "Not logged in",
            code: "err_not_logged_in"
        });
        return;
    }

    // if the user is an admin, allow all routes
    if (req.session.type === "admin") {
        next();
        return;
    }

    // if the user is not an admin, only allow specific routes
    if (userRoutes.includes(req.path)) {
        next();
        return;
    } else if (userOwnRoutes.includes(req.path) && req.query.userID == req.session.userID) {
            next();
            return;
    } else {
        res.status(403).json({
            status: "failure",
            reason: "Forbidden",
            code: "err_forbidden"
        });
        return;
    }
}

function adminPageMiddleware(req, res, next) {
    if (!req.session.username) {
        res.redirect("/login");
        return;
    }
    if (req.session.type == "user") {
        res.redirect("/user");
        return;
    }
    if (req.session.type !== "admin") {
        req.session.destroy();
        res.redirect("/login");
        return;
    }
    next();
}

function userPageMiddleware(req, res, next) {
    if (!req.session.username) {
        res.redirect("/login");
        return;
    }
    if (req.session.type == "admin") {
        res.redirect("/admin");
        return;
    }
    if (req.session.type !== "user") {
        req.session.destroy();
        res.redirect("/login");
        return;
    }
    next();
}

module.exports = {
    checkAPIPermissions,
    adminPageMiddleware,
    userPageMiddleware
};