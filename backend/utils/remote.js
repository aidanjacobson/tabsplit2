var fs = require("fs");

function isRemote() {
    return fs.existsSync("/data") && fs.existsSync("/ssl");
}

function getInterfaceURL() {
    server.host = isRemote() ? "aidanjacobson.duckdns.org" : "localhost";
    if (isRemote()) {
        server.http = false;
    } else {
        server.http = true;
    }
    var protocol = server.http ? "http" : "https";
    return `${protocol}://${server.host}:${server.port}/${server.ui}`;
}

var server = {getInterfaceURL, http:false, ui: ""};

function init({port=server.port, ui=server.ui}) {
    server.port = port;
    server.ui = ui;
}

server.init = init;

module.exports = {isRemote, server};