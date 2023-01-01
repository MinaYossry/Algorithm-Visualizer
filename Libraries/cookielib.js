function getCookie(cookieName) {
    var allCookies = splitCookies(document.cookie);
    return decodeURIComponent(allCookies[cookieName]);
}

function setCookie(cookieName, cookieValue, expiryDate = null) {
    if (expiryDate)
        document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";expires=" + expiryDate;
    else
        document.cookie = cookieName + "=" + encodeURIComponent(cookieValue);
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + "=;expires=" + new Date();
}

function allCookieList() {
    return splitCookies(document.cookie);
}

function hasCookie(cookieName) {
    return !!getCookie(cookieName);
}

function splitCookies(cookieString) {
    var result = [];
    var cookiesArray = cookieString.split("; ");

    for (var i = 0; i < cookiesArray.length; i++) {
        cookiesArray[i] = cookiesArray[i].split('=');
        result[cookiesArray[i][0]] = cookiesArray[i][1];
    }


    return result;
}