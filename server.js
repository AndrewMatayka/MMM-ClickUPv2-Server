/* WEB SERVER FOR OAUTHv2 AUTHENTICATION */
console.log('Server-side code running');

/* REQUIRE FOR WEB SERVER & FILE MANAGEMENT */
const fs = require('fs');
const ip = require('ip');
const path = require('path');
const https = require('https');
const express = require('express');

//Using Express
const app = express();
const ipAddress = ip.address();

//Including Loading HTML File in Root
app.get('/loading.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/loading.html'));
});

//Redirect HTTP to HTTPS
app.enable("trust proxy");
app.use(function(request, response, next) {
    if (!request.secure) {
        return response.redirect("https://" + request.headers.host + request.url);
    }
    next();
});

//Use the Public Directory
app.use(express.static('public'));

// SSL Certs
const httpsOptions = { key: fs.readFileSync('public/sslcert/key.pem'), cert: fs.readFileSync('public/sslcert/cert.pem') };

//Create Servers
app.listen(80);
https.createServer(httpsOptions, app).listen(443, function () {
    console.log('Express HTTPS server listening on port ' + 443);
});
console.log('Express Server exposed on IP: ' + ipAddress);