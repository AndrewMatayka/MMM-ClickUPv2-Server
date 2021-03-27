// test/server.js

let expect = require("chai").expect;
let request = require("request");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

describe("Web Server Functioning", function () {
    describe("Web Server Status Code", function () {
        let url = "https://127.0.0.1";

        it("Returns status 200", function (done) {
            request(url, function (error, response, body) {
                console.log(error);
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});