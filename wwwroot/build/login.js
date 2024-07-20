var Key;
(function (Key) {
    Key[Key["Backspace"] = 8] = "Backspace";
    Key[Key["Tab"] = 9] = "Tab";
    Key[Key["Enter"] = 13] = "Enter";
    Key[Key["Shift"] = 16] = "Shift";
    Key[Key["Ctrl"] = 17] = "Ctrl";
    Key[Key["Alt"] = 18] = "Alt";
    Key[Key["Pause"] = 19] = "Pause";
    Key[Key["CapsLock"] = 20] = "CapsLock";
    Key[Key["Escape"] = 27] = "Escape";
    Key[Key["Space"] = 32] = "Space";
    Key[Key["PageUp"] = 33] = "PageUp";
    Key[Key["PageDown"] = 34] = "PageDown";
    Key[Key["Left"] = 37] = "Left";
    Key[Key["Up"] = 38] = "Up";
    Key[Key["Right"] = 39] = "Right";
    Key[Key["Down"] = 40] = "Down";
    Key[Key["Insert"] = 45] = "Insert";
    Key[Key["Delete"] = 46] = "Delete";
    Key[Key["F1"] = 112] = "F1";
    Key[Key["F2"] = 113] = "F2";
    Key[Key["F3"] = 114] = "F3";
    Key[Key["F4"] = 115] = "F4";
    Key[Key["F5"] = 116] = "F5";
    Key[Key["F7"] = 117] = "F7";
    Key[Key["F8"] = 118] = "F8";
    Key[Key["F9"] = 119] = "F9";
    Key[Key["F10"] = 120] = "F10";
    Key[Key["F11"] = 121] = "F11";
    Key[Key["F12"] = 122] = "F12";
})(Key || (Key = {}));
Array.prototype.contains = function (value) {
    return this.indexOf(value) > -1;
};
Array.prototype.shuffle = function () {
    var index = this.length, rand = 0;
    var temp;
    while (index != 0) {
        rand = Math.floor(Math.random() * index);
        index -= 1;
        temp = this[index];
        this[index] = this[rand];
        this[rand] = temp;
    }
};
Array.prototype.__defineGetter__("first", function () {
    return this[0];
});
Date.prototype.addMinutes = function (minutes) {
    return new Date(this.getTime() + minutes * 60000);
};
Date.prototype.addHours = function (hours) {
    return new Date(this.getTime() + hours * 60 * 60000);
};
Date.prototype.addDays = function (days) {
    return new Date(this.getTime() + days * 24 * 60 * 60000);
};
function isDefined(obj) {
    return obj !== undefined && obj !== null;
}
function isUndefined(obj) {
    return obj === undefined || obj === null;
}
function isMobile() {
    return isDefined(window.orientation);
}
function isDesktop() {
    return isUndefined(window.orientation);
}
function getDefault(obj, defaultValue) {
    return isDefined(obj) ? obj : defaultValue;
}
function isArray(obj) {
    return Array.isArray(obj);
}
function isBoolean(obj) {
    return typeof (obj) === "boolean" || obj instanceof Boolean;
}
function isString(obj) {
    return typeof (obj) === "string" || obj instanceof String;
}
function isNumber(obj) {
    var result = typeof obj === "number" || obj instanceof Number;
    if (result)
        result = obj != Number.NaN;
    return result;
}
function isTypeOf(obj, type) {
    var t = type;
    if (t.name === "String")
        return isString(obj);
    if (t.name === "Number")
        return isNumber(obj);
    if (t.name === "Boolean")
        return isBoolean(obj);
    return obj instanceof type;
}
function tryParseInt(value, defaultValue) {
    var n = parseInt(value);
    return isNumber(n) ? [true, n] : [false, isNumber(defaultValue) ? defaultValue : 0];
}
function shortDelay(proc) {
    window.setTimeout(proc, 10);
}
function initTouch() {
    function translateTouchMove(event) {
        var touch = event.changedTouches[0];
        var mouseEvent = document.createEvent("MouseEvent");
        mouseEvent.initMouseEvent("mousemover", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        touch.target.dispatchEvent(mouseEvent);
        mouseEvent.initMouseEvent("mousemove", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        touch.target.dispatchEvent(mouseEvent);
        event.preventDefault();
    }
    document.addEventListener("touchmove", translateTouchMove, true);
}
function baseUrl() {
    var proto = window.location.protocol || document.location.protocol;
    var port = location.port;
    if (port.length)
        port = ":" + port;
    return proto + "//" + document.domain + port;
}
String.prototype.writeLine = function () {
    Test.writeLine(this);
};
String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0)
        return hash;
    for (var i = 0; i < this.length; i++) {
        var character = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash;
    }
    return hash;
};
String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};
String.prototype.splitTrim = function (separator) {
    var result = [];
    var items = this.split(isDefined(separator) ? separator : " ");
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var s = items_1[_i];
        s = s.trim();
        if (s.length)
            result.push(s);
    }
    return result;
};
String.prototype.format = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
};
String.prototype.toElement = function () {
    var block = document.createElement("div");
    block.innerHTML = this;
    return block.firstElementChild;
};
Number.prototype.withCommas = function () {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    ;
};
Number.prototype.toBytes = function () {
    var bytes = Math.floor(this);
    if (bytes < 1)
        return "0 Bytes";
    var k = 1000;
    var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};
Number.prototype.toTimeSpan = function () {
    var hours = Math.floor(this / 3600);
    var minutes = Math.floor((this - (hours * 3600)) / 60);
    var seconds = Math.floor(this - (hours * 3600) - (minutes * 60));
    if (hours > 0) {
        var m = minutes.toString();
        if (m.length < 1)
            m = "0" + m;
        var s = seconds.toString();
        if (s.length < 1)
            s = "0" + s;
        return hours + ":" + m + ":" + s;
    }
    else {
        var s = seconds.toString();
        if (s.length < 1)
            s = "0" + s;
        return minutes + ":" + s;
    }
};
var Guid = (function () {
    function Guid() {
        this.value = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    Guid.prototype.toString = function () {
        return this.value;
    };
    return Guid;
}());
Date.fromString = function (s) {
    var i = Date.parse(s);
    return new Date(i);
};
var DateShortFormat = "#M#/#DD#/#YYYY# #h#:#mm# #AMPM#";
var DateShortDayFormat = "#MM#/#DD# #hh#:#mm# #ampm#";
var DateLongFormat = "#DDDD# #MMMM# #D#, #YYYY# #h#:#mm# #AMPM#";
var DateDefaultFormat = DateLongFormat;
Date.prototype.format = function (formatString) {
    var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    var dateObject = this;
    YY = ((YYYY = dateObject.getFullYear()) + "").slice(-2);
    MM = (M = dateObject.getMonth() + 1) < 10 ? ("0" + M) : M;
    MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
    DD = (D = dateObject.getDate()) < 10 ? ("0" + D) : D;
    DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday"][dateObject.getDay()]).substring(0, 3);
    th = (D >= 10 && D <= 20) ? "th" : ((dMod = D % 10) == 1) ? "st" : (dMod == 2) ? "nd" : (dMod == 3) ? "rd" : "th";
    formatString = (formatString) ? formatString : DateDefaultFormat;
    formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
    h = (hhh = dateObject.getHours());
    if (h == 0)
        h = 24;
    if (h > 12)
        h -= 12;
    hh = h < 10 ? ('0' + h) : h;
    AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
    mm = (m = dateObject.getMinutes()) < 10 ? ("0" + m) : m;
    ss = (s = dateObject.getSeconds()) < 10 ? ("0" + s) : s;
    return formatString
        .replace("#hhh#", hhh)
        .replace("#hh#", hh)
        .replace("#h#", h)
        .replace("#mm#", mm)
        .replace("#m#", m)
        .replace("#ss#", ss)
        .replace("#s#", s)
        .replace("#ampm#", ampm)
        .replace("#AMPM#", AMPM);
};
Date.prototype.timeAgo = function () {
    var a = new Date();
    var b = this;
    var diff = a - b;
    var seconds = Math.floor(diff / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1)
        return interval + " year(s) ago";
    if (interval == 1)
        return "1 year ago";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1)
        return interval + " months ago";
    if (interval == 1)
        return "1 month ago";
    interval = Math.floor(seconds / 86400);
    if (interval > 1)
        return interval + " days ago";
    if (interval == 1)
        return "1 day ago";
    interval = Math.floor(seconds / 3600);
    if (interval > 1)
        return interval + " hours ago";
    if (interval == 1)
        return interval + "1 hour ago";
    interval = Math.floor(seconds / 60);
    if (interval > 1)
        return interval + " minutes ago";
    if (interval == 1)
        return interval + "1 minute ago";
    return Math.floor(seconds) + " seconds ago";
};
HTMLElement.prototype.clearChildren = function (keep) {
    var items = [];
    if (keep)
        items = this.getAll(keep);
    this.innerHTML = "";
    for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
        var item = items_2[_i];
        this.appendChild(item);
    }
};
HTMLElement.prototype.nthElementChild = function (index) {
    var element = this.firstElementChild;
    while (index > 0) {
        index--;
        element = element.nextElementSibling;
        if (element == undefined)
            return element;
    }
    return element;
};
HTMLElement.prototype.hasClass = function (value) {
    return this.classList.contains(value);
};
HTMLElement.prototype.addClass = function () {
    var value = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        value[_i] = arguments[_i];
    }
    (_a = this.classList).add.apply(_a, value);
    return this;
    var _a;
};
HTMLElement.prototype.removeClass = function () {
    var value = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        value[_i] = arguments[_i];
    }
    (_a = this.classList).remove.apply(_a, value);
    return this;
    var _a;
};
HTMLElement.prototype.toggleClass = function () {
    var value = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        value[_i] = arguments[_i];
    }
    for (var item in value)
        this.classList.toggle(item);
    return this;
};
HTMLElement.prototype.hide = function () {
    setStyle(this, { display: "none" });
};
HTMLElement.prototype.show = function () {
    removeStyle(this, "display");
};
HTMLElement.prototype.mapPoint = function (event) {
    var rect = this.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
};
HTMLElement.prototype.__defineGetter__("bounds", function () {
    var rect = this.getBoundingClientRect();
    return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
});
function getInput(query) {
    return get(query);
}
function executeScripts(element) {
    function nodeNameEquals(elem, name) {
        return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
    }
    function evalScript(elem) {
        var data = (elem.text || elem.textContent || elem.innerHTML || "");
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        var script = document.createElement("script");
        script.type = "text/javascript";
        try {
            script.appendChild(document.createTextNode(data));
        }
        catch (e) {
            script.text = data;
        }
        head.insertBefore(script, head.firstChild);
        head.removeChild(script);
    }
    var scripts = [], script;
    var children = element.childNodes, child;
    for (var i = 0; children[i]; i++) {
        child = children[i];
        if (nodeNameEquals(child, "script") && (!child.type || child.type.toLowerCase() == "text/javascript"))
            scripts.push(child);
    }
    for (var i = 0; scripts[i]; i++) {
        script = scripts[i];
        if (script.parentNode)
            script.parentNode.removeChild(script);
        evalScript(scripts[i]);
    }
}
function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    var loaded = false;
    script.onload = script["onreadystatechange"] = function () {
        if (!loaded && (!this.readyState || this.readyState == "complete")) {
            loaded = true;
            callback();
        }
    };
    var node = document.getElementsByTagName("script")[0];
    node.parentNode.insertBefore(script, node);
}
function setStyle(query, styles) {
    var elements = getAll(query);
    var keys = Object.keys(styles);
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var e = elements_1[_i];
        var style = e.style;
        for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
            var k = keys_1[_a];
            var value = styles[k];
            style[k] = isNumber(value) ? value + "px" : value;
        }
    }
}
function removeStyle(query) {
    var styles = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        styles[_i - 1] = arguments[_i];
    }
    var elements = getAll(query);
    var a = 'A'.charCodeAt(0);
    var z = 'Z'.charCodeAt(0);
    for (var _a = 0, styles_1 = styles; _a < styles_1.length; _a++) {
        var style = styles_1[_a];
        var index = a;
        while (index <= z) {
            var c = String.fromCharCode(index);
            if (style.includes(c)) {
                style = style.replace(c, "-" + c.toLowerCase());
            }
            index++;
        }
        for (var _b = 0, elements_2 = elements; _b < elements_2.length; _b++) {
            var element = elements_2[_b];
            element.style.removeProperty(style);
        }
    }
}
function isEventCapable(obj) {
    return isDefined(obj["addEventListener"]);
}
function addEvent(query, name, event) {
    var items = isEventCapable(query) ? [query] : getAll(query);
    for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
        var item = items_3[_i];
        item.addEventListener(name, event);
    }
}
function addClass(query) {
    var value = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        value[_i - 1] = arguments[_i];
    }
    var items = getAll(query);
    for (var _a = 0, items_4 = items; _a < items_4.length; _a++) {
        var item = items_4[_a];
        item.addClass.apply(item, value);
    }
}
function removeClass(query) {
    var value = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        value[_i - 1] = arguments[_i];
    }
    var items = getAll(query);
    for (var _a = 0, items_5 = items; _a < items_5.length; _a++) {
        var item = items_5[_a];
        item.removeClass.apply(item, value);
    }
}
function isBefore(node, sibling) {
    var a = get(node);
    if (!a)
        return false;
    var b = get(sibling);
    if (!b)
        return false;
    if (a == b)
        return false;
    if (a.parentElement != b.parentElement)
        return false;
    while (true) {
        a = a.previousElementSibling;
        if (a == b)
            return true;
        if (a == undefined)
            break;
    }
    return false;
}
function isAfter(node, sibling) {
    var a = get(node);
    if (!a)
        return false;
    var b = get(sibling);
    if (!b)
        return false;
    if (a == b)
        return false;
    if (a.parentElement != b.parentElement)
        return false;
    while (true) {
        a = a.nextElementSibling;
        if (a == b)
            return true;
        if (a == undefined)
            break;
    }
    return false;
}
function selectRange(start, finish) {
    var a = get(start);
    if (a == undefined)
        return [];
    var b = get(finish);
    if (b == undefined)
        return [];
    if (isBefore(a, b)) {
        var c = a;
        a = b;
        b = c;
    }
    else if (!isAfter(a, b))
        return [];
    var selection = [];
    while (a != b) {
        selection.push(a);
        a = a.nextElementSibling;
    }
    selection.push(a);
    return selection;
}
function acceptDroppedFiles(element, ondrop) {
    element.addEventListener("dragover", function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    });
    element.addEventListener("drop", function (e) {
        e.stopPropagation();
        e.preventDefault();
        ondrop(e.dataTransfer.files);
    });
}
function addStyleSheet(href, onload) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(link);
    if (onload)
        link.addEventListener("load", onload);
    link.href = href;
}
function addJavaScript(src, onload) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.body.appendChild(script);
    if (onload)
        script.addEventListener("load", onload);
    script.src = src;
}
function addCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        date.setTime(date.getTime() + (days * millisecondsPerDay));
        expires = "; expires=" + date.toUTCString();
    }
    else
        expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function removeCookie(name) {
    addCookie(name, "", -1);
}
function readCookie(name) {
    name += "=";
    var cookies = document.cookie.split(';');
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        cookie = cookie.trim();
        if (cookie.indexOf(name) == 0)
            return cookie.substring(name.length, cookie.length);
    }
    return undefined;
}
var LocalCache = (function () {
    function LocalCache() {
        this.data = {};
    }
    LocalCache.prototype.remove = function (url) {
        delete this.data[url];
    };
    LocalCache.prototype.exists = function (url) {
        return this.data.hasOwnProperty(url) && isDefined(this.data[url]);
    };
    LocalCache.prototype.recall = function (url) {
        return this.data[url];
    };
    LocalCache.prototype.store = function (url, value) {
        this.data[url] = value;
    };
    return LocalCache;
}());
var WebRequest = (function () {
    function WebRequest() {
        var _this = this;
        this.localCache = new LocalCache();
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.onload = function () { return _this.httpRequestLoad(); };
        this.callback = undefined;
    }
    WebRequest.prototype.sendComplete = function (response) {
        this.response = response;
        if (this.cache) {
            this.localCache.store(this.url, this.response);
        }
        if (this.callback)
            this.callback(this);
    };
    WebRequest.prototype.httpRequestLoad = function () {
        this.sendComplete(this.httpRequest.responseText);
    };
    WebRequest.prototype.send = function (url, callback, cache) {
        this.httpRequest.abort();
        this.url = url;
        this.callback = callback;
        this.cache = cache;
        if (cache && this.localCache.exists(url))
            this.sendComplete(this.localCache.recall(url));
        else {
            this.httpRequest.open("GET", url);
            this.httpRequest.send();
        }
    };
    WebRequest.prototype.post = function (url, data, callback, cache) {
        this.httpRequest.abort();
        this.url = url;
        this.callback = callback;
        this.cache = cache;
        if (cache && this.localCache.exists(url))
            this.sendComplete(this.localCache.recall(url));
        else {
            this.httpRequest.open("POST", url);
            if (data instanceof FormData || isString(data))
                this.httpRequest.send(data);
            else
                this.httpRequest.send(objectToFormData(data));
        }
    };
    WebRequest.prototype.cancel = function () {
        this.httpRequest.abort();
    };
    return WebRequest;
}());
function sendRequest(url, callback) {
    var r = new WebRequest();
    r.send(url, callback);
}
function postRequest(url, data, callback) {
    var r = new WebRequest();
    r.post(url, data, callback);
}
function objectToFormData(obj) {
    if (obj == undefined)
        return undefined;
    var data = new FormData();
    var keys = Object.keys(obj);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var k = keys_2[_i];
        var value = obj[k];
        data.append(k, value);
    }
    return data;
}
function formSubmit(form, prepare) {
    var formData = new FormData(form);
    var request = new XMLHttpRequest();
    if (prepare)
        prepare(request);
    request.open(form.getAttribute("method"), form.getAttribute("action"), true);
    request.send(formData);
    return request;
}
var Test = (function () {
    function Test() {
    }
    Test.verify = function (condition, name) {
        Test.writeLine(name, ": ", condition ? "success" : "fail");
    };
    Test.writeBreak = function (message) {
        var h2 = document.createElement("h2");
        if (message)
            h2.innerText = message;
        document.body.appendChild(h2);
    };
    Test.writeLine = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        var div = document.createElement("div");
        div.innerText = content.join("");
        document.body.appendChild(div);
    };
    return Test;
}());
function initDialog() {
    function acceptClick() {
        var me = this;
        var dialog = me.parentElement;
        var state = dialog["state"];
        if (state.onaccept)
            state.onaccept();
        else {
            hideDialog();
            var form = dialog.get("form");
            if (form)
                form.submit();
        }
    }
    function cancelClick() {
        var me = this;
        var dialog = me.parentElement;
        var state = dialog["state"];
        if (state.oncancel)
            state.oncancel();
        else
            hideDialog();
    }
    var overlay = get("#overlay");
    var dialogs = getAll("#overlay .dialog");
    var wasFullscreen;
    setInterval(function () {
        wasFullscreen = window.innerHeight == screen.height;
    }, 500);
    if (!dialogs)
        return false;
    if (overlay["initialized"] == undefined) {
        overlay["initialized"] = true;
        for (var _i = 0, dialogs_1 = dialogs; _i < dialogs_1.length; _i++) {
            var d = dialogs_1[_i];
            d["_caption"] = d.get(".caption").innerHTML;
            d["_content"] = d.get(".content").innerHTML;
            d["_accept"] = d.get("button.accept").innerText;
            d["_cancel"] = d.get("button.cancel").innerText;
        }
        var buttons = overlay.getAll("button.accept");
        for (var _a = 0, buttons_1 = buttons; _a < buttons_1.length; _a++) {
            var b = buttons_1[_a];
            b.addEventListener("click", acceptClick);
        }
        buttons = overlay.getAll("button.cancel");
        for (var _b = 0, buttons_2 = buttons; _b < buttons_2.length; _b++) {
            var b = buttons_2[_b];
            b.addEventListener("click", cancelClick);
        }
        document.addEventListener("keyup", function (e) {
            if (!overlay.hasClass("show"))
                return;
            if (window.innerHeight == screen.height)
                return;
            var dialog = overlay.get(".dialog.current");
            if (!dialog)
                return;
            if (e.keyCode == 13) {
                var b = dialog.get("button.accept");
                if (b.style.display == "none")
                    b = b.get("button.cancel");
                b.click();
            }
            else if (e.keyCode == Key.Escape) {
                if (!wasFullscreen)
                    dialog.get("button.cancel").click();
            }
        });
    }
    return true;
}
function showDialog(dialog) {
    if (!initDialog())
        return;
    var state;
    var node;
    if (isString(dialog)) {
        node = get(dialog);
        if (node == undefined)
            return;
        state = {
            id: dialog,
            caption: node.get(".caption").innerHTML,
            content: node.get(".content").innerHTML,
            accept: node.get("button.accept").innerText,
            cancel: node.get("button.cancel").innerText
        };
    }
    else {
        node = get(dialog.id);
        if (node == undefined)
            return;
        state = dialog;
    }
    if (window["_currentdialog"])
        return;
    var dialogs = getAll("#overlay .dialog");
    for (var _i = 0, dialogs_2 = dialogs; _i < dialogs_2.length; _i++) {
        var d = dialogs_2[_i];
        d.hide();
    }
    node["state"] = state;
    if (isString(state.caption))
        node.get(".caption").innerHTML = state.caption;
    if (isString(state.content))
        node.get(".content").innerHTML = state.content;
    var b = node.get("button.accept");
    var s = isString(state.accept) ? state.accept : node["_accept"];
    if (s.length > 0) {
        b.innerText = s;
        b.show();
    }
    else
        b.hide();
    b = node.get("button.cancel");
    s = isString(state.cancel) ? state.cancel : node["_cancel"];
    if (s.length > 0) {
        b.innerText = s;
        b.show();
    }
    else
        b.hide();
    node.addClass("current");
    node.show();
    get("#overlay").addClass("show");
    window["_currentdialog"] = state;
    if (state.oncreate)
        state.oncreate();
    var input = node.get("input");
    if (input)
        input.focus();
}
function messageBox(message, caption) {
    var dialog = {
        id: "#messageBox",
        caption: caption,
        content: "<div class=\"message\">" + message + "</div>",
        accept: "",
        cancel: "OK"
    };
    showDialog(dialog);
}
function messageConfirm(message, onconfirm, caption) {
    if (!caption)
        caption = "Confirmation";
    var dialog = {
        id: "#messageBox",
        caption: caption,
        content: "<div class=\"message\">" + message + "</div>",
        accept: "Yes",
        onaccept: function () { hideDialog(); onconfirm(); },
        cancel: "No"
    };
    showDialog(dialog);
}
function messageInput(message, oninput, caption) {
    if (!caption)
        caption = "Input";
    var dialog = {
        id: "#messageBox",
        caption: caption,
        content: "<div class=\"message\">" + message + "</div><input type=\"text\" style=\"width: 100%\">",
        accept: "OK",
        onaccept: function () {
            hideDialog();
            var input = get("#messageBox input");
            oninput(input.value);
        },
        cancel: "Cancel"
    };
    showDialog(dialog);
}
function dialogConfirmTest() {
    messageConfirm("Delete these 23 files?", function () { return console.log("confirmed!"); });
}
function dialogInputTest() {
    messageInput("What is your name?", function (s) { return console.log("His name was " + s); });
}
function hideDialog() {
    var state = window["_currentdialog"];
    window["_currentdialog"] = undefined;
    if (state && state.ondestroy)
        state.ondestroy();
    var overlay = get("#overlay.show");
    if (overlay) {
        overlay.removeClass("show");
        var c_1 = get("#overlay .dialog.current");
        if (c_1) {
            c_1.removeClass("current");
            setTimeout(function () {
                c_1.get(".caption").innerHTML = c_1["_caption"];
                c_1.get(".content").innerHTML = c_1["_content"];
                c_1.get("button.accept").innerText = c_1["_accept"];
                c_1.get("button.cancel").innerText = c_1["_cancel"];
            }, 300);
        }
    }
}
function currentDialog() {
    return window["_currentdialog"];
    ;
}
function shakeDialog() {
    var d = currentDialog();
    if (isUndefined(d))
        return;
    console.log("shake id: " + d.id);
    var e = get(d.id);
    if (isUndefined(e))
        return;
    setTimeout(function () { e.addClass("shakeleft"); }, 150);
    setTimeout(function () { e.removeClass("shakeleft").addClass("shakeright"); }, 300);
    setTimeout(function () { e.removeClass("shakeright"); }, 450);
    console.log("shake end");
}
function initTooltips() {
    if (get("#tipbox"))
        return;
    var tipbox = "\n<div id=\"tipbox\"><span></span>\n    <img id=\"tip-below\" src=\"/images/tip-below.png\">\n    <img id=\"tip-above\" src=\"/images/tip-above.png\">\n</div>".toElement();
    var timer;
    function tooltipOver() {
        var me = this;
        timer = setTimeout(function () {
            tipbox.firstElementChild.innerHTML = me.getAttribute("data-tooltip");
            tipbox.addClass("visible");
            if (me.hasClass("fixed"))
                tipbox.addClass("fixed");
            else
                tipbox.removeClass("fixed");
            var bounds = me.bounds;
            var x = bounds.x + (bounds.width - tipbox.offsetWidth) / 2;
            var y = bounds.y - tipbox.offsetHeight - 8;
            if (y < document.body.scrollTop) {
                y = bounds.y + bounds.height + 8;
                tipbox.addClass("below").removeClass("above");
            }
            else
                tipbox.addClass("above").removeClass("below");
            setStyle(tipbox, {
                left: x,
                top: y
            });
        }, 1000);
    }
    function tooltipOut() {
        window.clearTimeout(timer);
        tipbox.removeClass("visible");
    }
    function bodyChange() {
        var elements = getAll(".tooltip");
        for (var _i = 0, elements_3 = elements; _i < elements_3.length; _i++) {
            var e = elements_3[_i];
            e.removeClass("tooltip");
            e.addEventListener("mouseover", tooltipOver);
            e.addEventListener("mouseout", tooltipOut);
        }
    }
    document.body.addEventListener("DOMNodeInserted", bodyChange);
    document.body.addEventListener("DOMNodeRemoved", tooltipOut);
    document.body.appendChild(tipbox);
    document.body.addEventListener("scroll", tooltipOut);
}
function signIn() {
    function loginResult(request) {
        if (request.response == "OK") {
            window.location.replace("/");
            return;
        }
        shakeDialog();
        get("#login .caption").innerHTML = "Invalid user or password";
    }
    function login() {
        var data = {
            name: getInput("#name").value,
            password: getInput("#password").value
        };
        postRequest("/?method=login", data, loginResult);
    }
    var dialog = {
        id: "#login",
        onaccept: login
    };
    showDialog(dialog);
}
function main() {
    initTooltips();
}
//# sourceMappingURL=login.js.map