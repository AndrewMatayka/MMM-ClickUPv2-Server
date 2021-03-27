/* WEB CLIENT FOR OAUTHv2 AUTHENTICATION */
console.log('Client-side code running');

//Set all HTML elements we need to variables
const button = document.getElementById('myButton');
const textarea = document.getElementById('myTextarea');
const codeVal = document.getElementById('codeVal');
const test = document.getElementById('test');

let token = "";

//Create a Centered Popup on the Screen
function centeredPopup(url, winName, w, h, scroll) {
    let LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
    let TopPosition = (screen.height) ? (screen.height - h) / 2 : 0;
    let settings =
        'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',resizable'
    return window.open(url, winName, settings);
}

//Show Authentication Window
function showAuthWindow(options) {
    options.windowName = options.windowName || "Authentication";
    options.windowOptions = options.windowOptions || 'location=0, status=0, width=500, height=700';
    options.callback = options.callback || function () {
        window.location.reload();
    };

    let leftDomain = false;
    //let oauthWindow = window.open(options.path, options.windowName, options.windowOptions);
    let oauthWindow = centeredPopup(options.path, options.windowName, options.windowOptions.width, options.windowOptions.height, options.windowOptions.scroll);
    let oauthInterval = window.setInterval(function () {
        try {
            if (oauthWindow.document.domain === document.domain || oauthWindow.document.domain === "127.0.0.1") {
                if (leftDomain && oauthWindow.document.readyState === "complete") {
                    clearInterval(oauthInterval);
                    options.callback(oauthWindow.document.URL);
                    oauthWindow.close();
                }
            }
        } catch (e) {
            if (oauthWindow.closed) {
                clearInterval(oauthInterval);
            }
            leftDomain = true;
        }
    }, 500);
}

//Create Event listener for Button
let client_id = "";
if (button !== null) {
    button.addEventListener('click', function (e) {
        client_id = textarea.value;
        if (client_id.length > 0) {
            createAuth();
        } else {
            alert("You need to enter a Client ID!");
        }
    });
}

//Make call request to get Access Code
function createAuth() {
    showAuthWindow({
        path: "https://app.clickup.com/api?client_id=" + client_id + "&redirect_uri=127.0.0.1/loading.html",
        callback: function (data) {
            token = data.substring(data.indexOf('=') + 1);
            codeVal.innerHTML = token;
            test.style.display = "block";
        }
    });
}