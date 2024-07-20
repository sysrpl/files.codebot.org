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
var state;
var namedCompare;
function secondsBetween(a, b) {
    return Math.abs((a - b) / 1000);
}
function fileProgress(key, sent, total) {
    var index = state.uploads.findIndex(function (e) { return e.key == key; });
    if (index < 0)
        return false;
    var percent;
    if (total < 1)
        percent = 100;
    else
        percent = Math.floor(sent / total * 1000) / 10;
    var remove = percent == 100;
    var meter = get("#upload-" + key + " .meter");
    var value = get("#upload-" + key + " .value");
    percent = percent.toString();
    if (percent.indexOf(".") < 0)
        percent = percent + ".0%";
    else
        percent = percent + "%";
    meter.style.width = percent;
    value.innerText = percent;
    var entry = state.uploads[index];
    var now = Date.now();
    var seconds = secondsBetween(entry.transferTime, now);
    if (seconds > 1) {
        var bytes = sent - entry.transferBytes;
        entry.transferBytes = sent;
        entry.transferTime = now;
        var rate = bytes / seconds;
        var speed = get("#upload-" + key + " .speed");
        speed.innerText = rate.toBytes() + "/s";
    }
    if (remove) {
        var row = get("#upload-" + key);
        row.parentElement.removeChild(row);
        state.uploads.splice(index, 1);
        var duplicate = state.files.findIndex(function (e) { return namedCompare(e, entry); });
        if (duplicate > -1)
            state.files.splice(duplicate, 1);
        entry.modified = Date.now();
        entry.selected = true;
        state.files.push(entry);
        refreshFiles();
        if (state.uploads.length == 0)
            get(".uploads .row.empty").show();
    }
    return true;
}
function uploadRemove() {
    var row = this.parentElement;
    var key = row.id.split("-")[1];
    var index = state.uploads.findIndex(function (e) { return e.key == key; });
    if (index < 0)
        return;
    var entry = state.uploads[index];
    entry.state = UploadState.Aborted;
    state.uploads.splice(index, 1);
    row.parentElement.removeChild(row);
    if (state.uploads.length == 0)
        get(".uploads .row.empty").show();
}
function uploadPause() {
    var button = this;
    var key = button.parentElement.id.split("-")[1];
    var index = state.uploads.findIndex(function (e) { return e.key == key; });
    if (index < 0)
        return;
    var entry = state.uploads[index];
    var speed = get("#upload-" + key + " .speed");
    var icon = button.firstElementChild;
    if (entry.state == UploadState.Processing) {
        entry.state = UploadState.Paused;
        icon.removeClass("fa-pause").addClass("fa-play");
        speed.innerText = "paused";
        button.setAttribute("data-tooltip", "Resume the upload");
    }
    else if (entry.state == UploadState.Paused) {
        entry.state = UploadState.Processing;
        icon.removeClass("fa-play").addClass("fa-pause");
        speed.innerText = "resuming";
        button.setAttribute("data-tooltip", "Pause the upload");
    }
}
function uploadFile(file, key, contentType) {
    var entry = state.manager.upload(file, contentType, fileProgress);
    state.uploads.push(entry);
    var row = ("\n<div class=\"row upload\" id=\"upload-" + entry.key + "\">\n<div class=\"tooltip fixed\" data-tooltip=\"" + entry.name + "\">" + entry.name + "</div>\n<div>" + entry.size.toBytes() + "</div>\n<div>" + entry.type.split('/')[0] + "</div>\n<div class=\"progress\">\n    <div class=\"meter\" style=\"width: 0\"></div>\n    <div class=\"value\">0%</div>\n</div>\n<div class=\"speed\">0 KB/s</div>\n<div class=\"button remove tooltip\" data-tooltip=\"Remove the upload\"><i class=\"fa fa-times fa-lg\"></i></div>\n<div class=\"button pause tooltip\" data-tooltip=\"Pause the upload\"><i class=\"fa fa-pause\"></i></div>\n</div>").toElement();
    get(".uploads.rows").appendChild(row);
    get("#upload-" + entry.key + " .remove").addEventListener("click", uploadRemove);
    get("#upload-" + entry.key + " .pause").addEventListener("click", uploadPause);
    get(".uploads .row.empty").hide();
}
function uploadFiles(files) {
    var _loop_1 = function (i) {
        var file = files[i];
        var key = state.manager.key(file);
        if (state.uploads.findIndex(function (e) { return e.key == key; }) > -1)
            return "continue";
        state.manager.contentType(file.name, function (contentType) { return uploadFile(file, key, contentType); });
    };
    for (var i = 0; i < files.length; i++) {
        _loop_1(i);
    }
}
function confirmUpload(files) {
    var possible = Array.from(files);
    var originals = new Array();
    var conflicts = new Array();
    possible.forEach(function (value) {
        if (state.uploads.findIndex(function (item) { return namedCompare(item, value); }) > -1)
            return;
        if (state.files.findIndex(function (item) { return namedCompare(item, value); }) > -1)
            conflicts.push(value);
        else
            originals.push(value);
    });
    uploadFiles(originals);
    if (conflicts.length > 0) {
        var message_1;
        if (conflicts.length == 1)
            message_1 = "Overwrite the following file?<blockquote>";
        else
            message_1 = "Overwrite the following " + conflicts.length + " files?<blockquote>";
        conflicts.sort(function (a, b) { return a.name < b.name ? -1 : 1; });
        conflicts.forEach(function (value) {
            message_1 += value.name + "<br>";
        });
        message_1 += "</blockquote>";
        messageConfirm(message_1, function () {
            uploadFiles(conflicts);
        }, "File Conflict");
    }
}
function main() {
    state = {
        user: get("#user").value,
        manager: new FileManager(),
        uploads: [],
        files: [],
        sort: sortModified,
        reverse: false,
        caseSensitive: document.body.getAttribute("file-system-type") == "unix"
    };
    namedCompare = state.caseSensitive ?
        function (a, b) { return a.name == b.name; } :
        function (a, b) { return a.name.toUpperCase() == b.name.toUpperCase(); };
    initDialog();
    initTooltips();
    initSorting();
    state.manager.list(function (files) {
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var f = files_1[_i];
            f.selected = false;
        }
        state.files = files;
        refreshFiles();
    });
    var fileInput = get("#fileInput");
    get("#fileButton").addEventListener("click", function () { return fileInput.click(); });
    fileInput.addEventListener("change", function () {
        confirmUpload(fileInput.files);
        fileInput.value = "";
    });
    acceptDroppedFiles(get("#fileDrop"), confirmUpload);
    get("#page").focus();
}
var UploadState;
(function (UploadState) {
    UploadState[UploadState["Disconnected"] = 0] = "Disconnected";
    UploadState[UploadState["Processing"] = 1] = "Processing";
    UploadState[UploadState["Paused"] = 2] = "Paused";
    UploadState[UploadState["Aborted"] = 3] = "Aborted";
    UploadState[UploadState["Completed"] = 4] = "Completed";
    UploadState[UploadState["Error"] = 5] = "Error";
})(UploadState || (UploadState = {}));
var FileManager = (function () {
    function FileManager(endpoint) {
        if (endpoint)
            this.endpoint = endpoint;
        else
            this.endpoint = "/";
        this.endpoint += "?method=files";
        this.block = 512 * 1024;
    }
    Object.defineProperty(FileManager.prototype, "bufferSize", {
        get: function () {
            return this.block;
        },
        set: function (value) {
            var minBuffer = 32 * 1024;
            var maxBuffer = 1024 * 1024;
            if (value < minBuffer)
                value = minBuffer;
            else if (value > maxBuffer)
                value = maxBuffer;
            this.block = value;
        },
        enumerable: true,
        configurable: true
    });
    FileManager.prototype.key = function (file) {
        var key = window.navigator.userAgent + file.lastModifiedDate +
            file.name + file.size + state.user;
        return Math.abs(key.hashCode()).toString();
    };
    FileManager.prototype.entry = function (file, contentType) {
        return {
            key: this.key(file),
            name: file.name,
            size: file.size,
            type: contentType,
            access: 0,
            selected: false,
            modified: 0,
            state: UploadState.Disconnected,
            transferBytes: 0,
            transferTime: Date.now()
        };
    };
    FileManager.prototype.addUser = function (name, password, repeatPassword, callback) {
        if (name.length == 0 || password.length == 0) {
            callback(false);
            return;
        }
        if (password != repeatPassword) {
            callback(false);
            return;
        }
        var data = new FormData();
        data.append("name", name);
        data.append("password", password);
        data.append("repeatPassword", repeatPassword);
        postRequest(this.endpoint + "&action=adduser", data, (function (r) {
            var success = r.response == "OK";
            callback(success);
        }));
    };
    FileManager.prototype.list = function (callback) {
        sendRequest(this.endpoint + "&action=list", (function (r) {
            var files = JSON.parse(r.response);
            callback(files);
        }));
    };
    FileManager.prototype.delete = function (keys) {
        var data = new FormData();
        data.append("keys", JSON.stringify(keys));
        postRequest(this.endpoint + "&action=delete", data);
    };
    FileManager.prototype.rename = function (key, name, callback) {
        if (name.length < 1 || name.startsWith(".") || name.toLowerCase() == "error")
            return;
        var data = new FormData();
        data.append("key", key);
        data.append("name", name);
        postRequest(this.endpoint + "&action=rename", data, function (r) {
            var s = r.response;
            if (s.length == 0 || s == "Error")
                return;
            callback(s);
        });
    };
    FileManager.prototype.share = function (keys, access) {
        var data = new FormData();
        data.append("keys", JSON.stringify(keys));
        data.append("access", access.toString());
        postRequest(this.endpoint + "&action=share", data);
    };
    FileManager.prototype.contentType = function (filename, callback) {
        var data = new FormData();
        data.append("filename", filename);
        postRequest(this.endpoint + "&action=contenttype", data, function (request) {
            callback(request.response);
        });
    };
    FileManager.prototype.upload = function (file, contentType, onprogress, onerror) {
        this.bufferSize = this.block;
        var blockSize = this.bufferSize;
        var endpoint = this.endpoint + "&action=upload";
        var aborted = false;
        var offset = 0;
        var name = file.name;
        var size = file.size;
        var key = this.key(file);
        var entry = this.entry(file, contentType);
        entry.state = UploadState.Processing;
        function notifyProgress(sent, total) {
            if (aborted)
                return false;
            if (entry.state == UploadState.Aborted) {
                abort();
                return false;
            }
            if (onprogress)
                aborted = !onprogress(key, sent, total);
            if (aborted) {
                abort();
                return false;
            }
            return true;
        }
        function notifyError() {
            entry.state = UploadState.Error;
            if (onerror)
                onerror();
        }
        function sendData(data, onload) {
            var request = new XMLHttpRequest();
            request.open("POST", endpoint, true);
            if (onload)
                request.onload = onload;
            request.onerror = notifyError;
            request.send(data);
        }
        function abort() {
            aborted = true;
            entry.state = UploadState.Aborted;
            var data = new FormData();
            data.append("key", key);
            data.append("step", "abort");
            sendData(data);
        }
        function next() {
            if (aborted)
                return;
            if (entry.state == UploadState.Aborted) {
                abort();
                return;
            }
            if (entry.state == UploadState.Paused) {
                setTimeout(next, 250);
                return;
            }
            if (offset < size)
                chunk();
            else
                end();
        }
        function chunk() {
            if (!notifyProgress(offset, size))
                return abort();
            var head = offset;
            var tail = Math.min(offset + blockSize, size);
            offset = tail;
            var blob = file.slice(head, tail);
            var data = new FormData();
            data.append("key", key);
            data.append("step", "chunk");
            data.append("blob", blob);
            sendData(data, next);
        }
        function resume() {
            offset = parseInt(this.responseText);
            next();
        }
        function begin() {
            var data = new FormData();
            data.append("key", key);
            data.append("step", "begin");
            data.append("name", name);
            data.append("size", size.toString());
            data.append("type", contentType);
            sendData(data, resume);
        }
        function end() {
            if (!notifyProgress(size, size))
                return abort();
            var data = new FormData();
            data.append("key", key);
            data.append("step", "end");
            sendData(data);
            entry.state = UploadState.Completed;
        }
        begin();
        return entry;
    };
    return FileManager;
}());
function sortReverse(sort) {
    return function (a, b) { return -sort(a, b); };
}
function sortName(a, b) {
    if (a.name < b.name)
        return -1;
    if (b.name < a.name)
        return 1;
    return 0;
}
function sortSize(a, b) {
    if (a.size < b.size)
        return -1;
    if (b.size < a.size)
        return 1;
    return sortName(a, b);
}
function sortModified(a, b) {
    if (a.modified > b.modified)
        return -1;
    if (b.modified > a.modified)
        return 1;
    return sortName(a, b);
}
function sortType(a, b) {
    var typeA = a.type.split("/")[0];
    var typeB = b.type.split("/")[0];
    if (typeA < typeB)
        return -1;
    if (b.type < typeA)
        return 1;
    return sortName(a, b);
}
function sortAccess(a, b) {
    if (a.access > b.access)
        return -1;
    if (b.access > a.access)
        return 1;
    return sortName(a, b);
}
function adminTools() {
    function addUser() {
        var name = get("#newLogin").value;
        var password = get("#newKey").value;
        var repeatPassword = get("#newRepeatKey").value;
        hideDialog();
        state.manager.addUser(name, password, repeatPassword, function (success) {
            var message = success ? "<strong>New user added successfully!</strong>" :
                "<strong>Failed to create new user using the information provided</strong>";
            messageBox(message);
        });
    }
    var dialog = {
        id: "#adminTools",
        onaccept: addUser
    };
    showDialog(dialog);
}
function downloadSingle() {
    var entry = state.selectStart;
    if (!entry)
        return;
    var a = get("#downloader");
    a.href = "/" + state.user + "/" + entry.type.split('/')[0] + "s/" + encodeURI(entry.name) + "?download";
    a.click();
}
function downloadAll() {
    var a = get("#downloader");
    var selection = findSelection();
    var i = 0;
    var _loop_2 = function (entry) {
        var s = "/" + state.user + "/" + entry.type.split('/')[0] + "s/" + encodeURI(entry.name) + "?download";
        setTimeout(function () {
            console.log(s);
            a.href = s;
            a.click();
        }, i++ * 500 + 250);
    };
    for (var _i = 0, selection_1 = selection; _i < selection_1.length; _i++) {
        var entry = selection_1[_i];
        _loop_2(entry);
    }
}
function openMedia(entry) {
    if (entry == undefined)
        return;
    var selection = findSelection();
    get("#viewer .close").addEventListener("click", hideDialog);
    get("#downloadSingle").style.display = "block";
    if (selection.length > 1)
        get("#downloadAll").style.display = "block";
    var busy = get("#viewer .content .busy");
    var content = get("#viewer .content");
    var summary = get("#viewer .summary");
    var words = get("#viewer .words");
    var extra = get("#viewer .extra");
    var marker = window["_marker"];
    if (!marker)
        marker = 1;
    var autoplay = false;
    function addSummary(tail) {
        words.innerText = state.selectStart.name;
        extra.innerText = tail;
        busy.removeClass("loading");
        summary.removeClass("loading");
        var w = 12;
        var child = summary.firstElementChild;
        while (child) {
            w += child.offsetWidth + 10;
            child = child.nextElementSibling;
        }
        var x = (content.offsetWidth - w) / 2;
        setStyle(summary, {
            left: x,
            width: w
        });
    }
    function imageLoad() {
        marker++;
        var image = this;
        var s = image.naturalWidth + "x" + image.naturalHeight;
        addSummary(s);
    }
    function textLoad(r) {
        marker++;
        var text = get("#viewer .content span pre");
        var data = r.response;
        var size = data.length;
        data = data.replace(/\t/g, "  ");
        text.innerText = data;
        var s = "" + state.selectStart.size.toBytes();
        addSummary(s);
    }
    function mediaLoad() {
        marker++;
        var audio = get("#viewer span audio");
        if (audio) {
            audio.currentTime = 0;
            audio.addEventListener("ended", function () {
                index++;
                if (index >= selection.length)
                    index = 0;
                var entry = selection[index];
                var type = entry.type.split('/')[0];
                autoplay = type == "audio";
                update();
            });
            if (autoplay)
                audio.play();
            autoplay = false;
        }
        var video = get("#viewer span video");
        var media = (audio ? audio : video);
        var s = "" + media.duration.toTimeSpan();
        addSummary(s);
    }
    function mediaTimeout() {
        autoplay = false;
        get("#viewer span").innerHTML = "Unable to load preview for this file";
        var s = "" + state.selectStart.size.toBytes();
        addSummary(s);
    }
    var index = selection.findIndex(function (e) { return e.key == entry.key; });
    marker++;
    var localMarker = marker;
    function update() {
        var entry = selection[index];
        state.selectStart = entry;
        busy.addClass("loading");
        summary.addClass("loading");
        words.innerText = "" + entry.name;
        var type = entry.type.split('/')[0];
        var ext = entry.type.split('/')[1];
        var link = "/" + state.user + "/" + type + "s/" + encodeURI(entry.name);
        var span = get("#viewer span");
        span.clearChildren();
        switch (type) {
            case "image":
                var image = document.createElement("img");
                span.appendChild(image);
                image.addEventListener("load", imageLoad);
                image.src = link;
                break;
            case "text":
                var text = document.createElement("pre");
                span.appendChild(text);
                sendRequest(link, textLoad);
                break;
            case "audio":
                var audio = document.createElement("audio");
                audio.addEventListener("loadedmetadata", mediaLoad);
                var audioSource = document.createElement("source");
                audioSource.type = entry.type;
                audioSource.src = link;
                audio.appendChild(audioSource);
                span.appendChild(audio);
                audio.controls = true;
                break;
            case "video":
                var video = document.createElement("video");
                video.addEventListener("loadedmetadata", mediaLoad);
                var videoSource = document.createElement("source");
                videoSource.type = entry.type;
                videoSource.src = link;
                video.appendChild(videoSource);
                span.appendChild(video);
                video.controls = true;
                break;
            default:
                marker++;
                mediaTimeout();
                return;
        }
        setTimeout(function () {
            if (localMarker == marker)
                mediaTimeout();
        }, isMobile() ? 15000 : 5000);
    }
    function prior() {
        autoplay = false;
        index--;
        if (index < 0)
            index = selection.length - 1;
        update();
    }
    function next() {
        autoplay = false;
        index++;
        if (index >= selection.length)
            index = 0;
        update();
    }
    function viewerKeyDown(ev) {
        if (selection.length < 2)
            return;
        switch (ev.which) {
            case Key.Left:
                prior();
                ev.preventDefault();
                return;
            case Key.Right:
                next();
                ev.preventDefault();
                return;
        }
    }
    update();
    if (selection.length == 1) {
        get("#viewer .prior").hide();
        get("#viewer .next").hide();
    }
    else {
        get("#viewer .prior").addEventListener("click", prior);
        get("#viewer .next").addEventListener("click", next);
    }
    var dialog = {
        id: "#viewer",
        onaccept: function () { },
        oncreate: function () {
            document.body.addEventListener("keydown", viewerKeyDown);
        },
        ondestroy: function () {
            marker++;
            window["_marker"] = marker;
            document.body.removeEventListener("keydown", viewerKeyDown);
        }
    };
    showDialog(dialog);
    return true;
}
function findFileRow(key) {
    if (key == undefined)
        return undefined;
    return typeof key == "string" ? get("#file-" + key) : get("#file-" + key.key);
}
function findFileEntry(key) {
    if (typeof key != "string") {
        if (key == undefined || key.id == undefined)
            return undefined;
        while (!key.id.startsWith("file-")) {
            key = key.parentElement;
            if (key == document.body)
                return undefined;
        }
        key = key.id.split("-")[1];
    }
    return state.files.find(function (e) { return e.key == key; });
}
function findSelectedEntry(key) {
    var entry = findFileEntry(this);
    if (entry == undefined || !entry.selected) {
        entry = state.selectStart;
        if (entry == undefined || !entry.selected) {
            state.selectStart = undefined;
            var row = get(".file.selected");
            entry = findFileEntry(row);
            if (entry == undefined)
                return undefined;
            ;
        }
    }
    return entry;
}
function findSelection() {
    var selection = [];
    var files = getAll(".file.selected");
    for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
        var file = files_2[_i];
        var entry = findFileEntry(file);
        selection.push(entry);
    }
    return selection;
}
function selectNone() {
    var files = getAll(".file.selected");
    for (var _i = 0, files_3 = files; _i < files_3.length; _i++) {
        var file = files_3[_i];
        file.removeClass("selected");
        findFileEntry(file).selected = false;
    }
    for (var _a = 0, _b = state.files; _a < _b.length; _a++) {
        var file = _b[_a];
        file.selected = false;
    }
    state.selectStart = undefined;
}
function initSorting() {
    if (window["initSortingDone"])
        return;
    window["initSortingDone"] = true;
    var overlays = ["overlay", "search", "audio", "page"];
    function clearMouseDown(ev) {
        var node = ev.target;
        while (node != document.body) {
            if (node.id == "rename")
                return;
            if (node.id.startsWith("file-"))
                return;
            if (overlays.indexOf(node.id) > -1)
                if (get("#rename.current")) {
                    hideDialog();
                    return;
                }
                else
                    return;
            node = node.parentElement;
        }
        selectNone();
    }
    function computed(query) {
        return getComputedStyle(get(query));
    }
    function scrollKeyDown(ev) {
        var view = get("#view");
        switch (ev.which) {
            case Key.PageUp:
                view.scrollTop -= window.innerHeight / 2;
                break;
            case Key.PageDown:
                view.scrollTop += window.innerHeight / 2;
                break;
            case Key.Up:
                view.scrollTop -= 25;
                break;
            case Key.Down:
                view.scrollTop += 25;
                break;
        }
        ev.preventDefault();
    }
    function clearKeyDown(ev) {
        var node = ev.target;
        if (node.getBoundingClientRect().top > 0)
            return;
        if (ev.which == Key.Space) {
            var media = (get("#viewer audio") || get("#viewer video"));
            if (media) {
                ev.preventDefault();
                if (media.paused)
                    media.play();
                else
                    media.pause();
            }
        }
        if (computed("#overlay").opacity != "0")
            return;
        if (computed("#audio").display != "none")
            return;
        if (ev.which == Key.Space) {
            ev.preventDefault();
            var entry = findSelectedEntry();
            selectNone();
            if (!entry)
                entry = findFileEntry(get(".files .file"));
            if (entry) {
                entry.selected = true;
                findFileRow(entry).addClass("selected");
            }
        }
        else if (ev.which == Key.Enter) {
            ev.preventDefault();
            var entry = findSelectedEntry();
            if (entry)
                fileOpen(entry.key);
        }
        else if (ev.which == Key.Delete) {
            fileDeleteClick();
            ev.preventDefault();
        }
        if (ev.which == Key.F2) {
            fileRenameClick();
            ev.preventDefault();
        }
        else if (ev.which == Key.F3) {
            get("#search input").focus();
            ev.preventDefault();
        }
        else if (ev.which == Key.F4) {
            fileShareClick();
            ev.preventDefault();
        }
        else if (ev.which == Key.Escape) {
            selectNone();
            ev.preventDefault();
        }
        else if ([Key.PageUp, Key.PageDown, Key.Up, Key.Down].indexOf(ev.which) > -1) {
            var entry = findSelectedEntry();
            var row = findFileRow(entry);
            if (!row)
                return scrollKeyDown(ev);
            if (ev.which == Key.Up)
                row = row.previousElementSibling;
            else if (ev.which == Key.Down)
                row = row.nextElementSibling;
            else if (ev.which == Key.PageUp) {
                row = row.previousElementSibling;
                if (row == null || !row.id)
                    return scrollKeyDown(ev);
                var i = 9;
                while (i > 0) {
                    var r = row.previousElementSibling;
                    if (r == null || !r.id)
                        break;
                    row = r;
                    i--;
                }
            }
            else if (ev.which == Key.PageDown) {
                row = row.nextElementSibling;
                if (row == null || !row.id)
                    return scrollKeyDown(ev);
                var i = 9;
                while (i > 0) {
                    var r = row.nextElementSibling;
                    if (r == null || !r.id)
                        break;
                    row = r;
                    i--;
                }
            }
            if (row == null || !row.id)
                return scrollKeyDown(ev);
            selectNone();
            row.addClass("selected");
            findFileEntry(row).selected = true;
            var rect = row.bounds;
            var view = get("#view");
            if (rect.y - 3 < 0)
                view.scrollTop = view.scrollTop + rect.y - 3;
            else if (rect.y + 32 > window.innerHeight)
                view.scrollTop = view.scrollTop + ((rect.y + 32) - window.innerHeight);
            ev.preventDefault();
        }
    }
    document.body.addEventListener("mousedown", clearMouseDown);
    document.body.addEventListener("keydown", clearKeyDown);
    function orderBy(sort) {
        if (state.sort == sort)
            state.reverse = !state.reverse;
        else
            state.reverse = false;
        state.sort = sort;
        refreshFiles();
    }
    get("#row-name").addEventListener("click", function () { return orderBy(sortName); });
    get("#row-size").addEventListener("click", function () { return orderBy(sortSize); });
    get("#row-folder").addEventListener("click", function () { return orderBy(sortType); });
    get("#row-modifed").addEventListener("click", function () { return orderBy(sortModified); });
    get("#row-access").addEventListener("click", function () { return orderBy(sortAccess); });
    var input = get("#search input");
    var search = "";
    setInterval(function () {
        var s = input.value.trim();
        if (s != search) {
            search = s;
            refreshFiles();
        }
    }, 200);
    input.addEventListener("focus", function () {
        get("#search").addClass("big");
        get("#search span").hide();
        get("#search i").hide();
    });
    input.addEventListener("blur", function () {
        var s = input.value.trim();
        input.value = s;
        if (s.length == 0) {
            get("#search span").show();
            get("#search i").show();
            get("#search").removeClass("big");
        }
    });
    input.addEventListener("keyup", function (ev) {
        if (ev.which == 13) {
            input.blur();
        }
        else if (ev.which == 27) {
            input.value = "";
            input.blur();
        }
        ev.stopPropagation();
    });
}
function fileOpen(entry) {
    if (typeof entry == "string")
        entry = findFileEntry(entry);
    openMedia(entry);
}
function fileRenameClick() {
    var entry = findSelectedEntry(this);
    selectNone();
    entry.selected = true;
    var row = findFileRow(entry);
    row.addClass("selected");
    var rect = row.bounds;
    var view = get("#view");
    if (rect.y < 0) {
        view.scrollTop = view.scrollTop + rect.y - 20;
        rect = row.bounds;
    }
    else if (rect.y + 60 > window.innerHeight) {
        view.scrollTop = view.scrollTop + (rect.y + 60) - window.innerHeight;
        rect = row.bounds;
    }
    var type = entry.type.split("/")[0] + "s";
    var rename = get("#rename");
    var value = entry.name.replace(/\.[^/.]+$/, "");
    function renameAccept() {
        var name = getInput("#rename input").value.trim();
        if (value.length > 0 && value != name)
            state.manager.rename(entry.key, name, function (s) {
                entry.name = s;
                var link = row.get("a");
                link.innerText = s;
                link.setAttribute("data-tooltip", s);
            });
        hideDialog();
    }
    function renameCancel() {
        hideDialog();
    }
    get("#renameAccept").addEventListener("click", renameAccept);
    get("#renameCancel").addEventListener("click", renameCancel);
    rename.style.left = rect.x - 7 + "px";
    rename.style.top = rect.y - 14 + "px";
    getInput("#rename input").value = value;
    var dialog = {
        id: "#rename",
        onaccept: renameAccept
    };
    showDialog(dialog);
}
function fileShareClick() {
    var files = getAll(".file.selected");
    if (files.length < 1)
        return;
    var message = files.length + " files selected.";
    var keys = [];
    for (var _i = 0, files_4 = files; _i < files_4.length; _i++) {
        var file = files_4[_i];
        var key = file.id.split("-")[1];
        keys.push(key);
    }
    ;
    var privateCount = 0;
    var publicCount = 0;
    if (files.length == 1) {
        var entry = findFileEntry(files[0]);
        var type = entry.type.split("/")[0] + "s";
        message = "File '" + type + "/" + entry.name + "' selected.";
        if (entry.access == 0)
            privateCount = 1;
        else
            publicCount = 1;
        var direct = baseUrl() + "/" + state.user + "/" + entry.type.split('/')[0] + "s/" + encodeURI(entry.name);
        var sharedUrl_1 = get("#shareUrl");
        sharedUrl_1.value = direct;
        var viewer = direct + "?view";
        var viewUrl_1 = get("#viewUrl");
        viewUrl_1.value = viewer;
        get("#shareUrlCopy").addEventListener("click", function () {
            sharedUrl_1.focus();
            sharedUrl_1.select();
            document.execCommand("copy");
        });
        get("#viewUrlCopy").addEventListener("click", function () {
            viewUrl_1.focus();
            viewUrl_1.select();
            document.execCommand("copy");
        });
    }
    else {
        for (var _a = 0, keys_3 = keys; _a < keys_3.length; _a++) {
            var key = keys_3[_a];
            var entry = findFileEntry(key);
            if (entry.access == 0)
                privateCount++;
            else
                publicCount++;
        }
        get("#share .block").addClass("mixed");
        get("#private span").innerText = "These files can only be accessed by you";
        get("#public span").innerText = "These files can be read by anyone if they know the url";
    }
    get("#share .message").innerText = message;
    var private = get("#private");
    var public = get("#public");
    if (privateCount > 0 && publicCount == 0)
        private.addClass("selected");
    else if (publicCount > 0 && privateCount == 0)
        public.addClass("selected");
    private.addEventListener("click", function () {
        private.addClass("selected");
        public.removeClass("selected");
    });
    public.addEventListener("click", function () {
        public.addClass("selected");
        private.removeClass("selected");
    });
    function updateAccess() {
        hideDialog();
        var access = -1;
        if (private.hasClass("selected"))
            access = 0;
        else if (public.hasClass("selected"))
            access = 1;
        if (access < 0)
            return;
        state.manager.share(keys, access);
        for (var _i = 0, files_5 = files; _i < files_5.length; _i++) {
            var file = files_5[_i];
            file.get(".access").innerText = access == 0 ? "private" : "public";
            findFileEntry(file).access = access;
        }
    }
    var dialog = {
        id: "#share",
        onaccept: updateAccess
    };
    showDialog(dialog);
    get("#shareUrl").blur();
}
function fileDeleteClick() {
    var files = getAll(".file.selected");
    if (files.length == 0)
        return;
    var message = "Are you sure you want to delete these " + files.length + " items?";
    if (files.length == 1) {
        var entry = findFileEntry(files[0]);
        var type = entry.type.split("/")[0] + "s";
        message = "Are you sure you want to delete '" + type + "/" + entry.name + "'?";
    }
    var keys = [];
    for (var _i = 0, files_6 = files; _i < files_6.length; _i++) {
        var file = files_6[_i];
        var key = file.id.split("-")[1];
        keys.push(key);
    }
    ;
    messageConfirm(message, function () {
        state.manager.delete(keys);
        for (var _i = 0, files_7 = files; _i < files_7.length; _i++) {
            var file = files_7[_i];
            file.parentElement.removeChild(file);
        }
        state.files = state.files.filter(function (e) { return keys.indexOf(e.key) < 0; });
    });
}
function refreshFiles() {
    var rows = get(".files.rows");
    rows.onclick;
    rows.clearChildren(".empty");
    var files = state.files;
    var input = get("#search input");
    var search = input.value.trim().toUpperCase();
    if (search.length > 0) {
        files = files.filter(function (entry) {
            var s = entry.name.toUpperCase();
            if (s.indexOf(search) >= 0)
                return true;
            s = entry.type.toUpperCase();
            return s.indexOf(search) >= 0;
        });
    }
    if (state.reverse)
        files.sort(sortReverse(state.sort));
    else
        files.sort(state.sort);
    for (var _i = 0, files_8 = files; _i < files_8.length; _i++) {
        var entry = files_8[_i];
        var d = new Date(entry.modified);
        var modified = d.format("#YYYY#/#MM#/#DD# #h#:#mm#");
        var selected = entry.selected ? "selected" : "";
        var row = ("\n<div class=\"row file " + selected + "\" id=\"file-" + entry.key + "\">\n    <div><a href=\"javascript:fileOpen('" + entry.key + "')\" class=\"tooltip fixed\" data-tooltip=\"" + entry.name + "\">" + entry.name + "</a></div>\n    <div>" + entry.size.toBytes() + "</div>\n    <div>" + entry.type.split('/')[0] + "</div>\n    <div>" + modified + "</div>\n    <div class=\"access\">" + (entry.access == 0 ? "private" : "public") + "</div>\n    <div class=\"button delete tooltip\" data-tooltip=\"Delete this file (Delete)\"><i class=\"fa fa-times fa-lg\"></i></div>\n    <div class=\"button share tooltip\" data-tooltip=\"Share this file (F4)\"><i class=\"fa fa-share-alt fa-lg\"></i></div>\n    <div class=\"button rename tooltip\" data-tooltip=\"Rename this file (F2)\"><i class=\"fa fa-pencil fa-lg\"></i></div>\n</div>").toElement();
        rows.appendChild(row);
    }
    function fileClick(ev) {
        var ctrl = !!ev.ctrlKey;
        var shift = !!ev.shiftKey;
        var entry = findFileEntry(this);
        var count = getAll(".row.file.selected").length;
        if (count == 0)
            state.selectStart = undefined;
        var startNode = state.selectStart ? get("#file-" + state.selectStart.key) : undefined;
        if (shift && startNode) {
            var range = selectRange(startNode, this);
            for (var _i = 0, _a = state.files; _i < _a.length; _i++) {
                var f = _a[_i];
                f.selected = false;
            }
            removeClass(".row.file.selected", "selected");
            for (var _b = 0, range_1 = range; _b < range_1.length; _b++) {
                var r = range_1[_b];
                addClass(r, "selected");
                findFileEntry(r).selected = true;
            }
            entry.selected = true;
            addClass(this, "selected");
        }
        else if (ctrl) {
            if (!state.selectStart) {
                state.selectStart = entry;
                state.selectStart.selected = false;
            }
            entry.selected = !entry.selected;
            if (entry.selected)
                addClass(this, "selected");
            else
                removeClass(this, "selected");
        }
        else {
            for (var _c = 0, _d = state.files; _c < _d.length; _c++) {
                var f = _d[_c];
                f.selected = false;
            }
            entry.selected = true;
            removeClass(".row.file.selected", "selected");
            addClass("#file-" + entry.key, "selected");
            state.selectStart = entry;
        }
    }
    function fileMobileClick(ev) {
        var entry = findFileEntry(this);
        entry.selected = !entry.selected;
        if (entry.selected)
            addClass(this, "selected");
        else
            removeClass(this, "selected");
        ev.stopPropagation();
    }
    function fileItemDown(ev) {
        var entry = findFileEntry(this);
        var node = findFileRow(entry);
        if (!entry.selected) {
            for (var _i = 0, _a = state.files; _i < _a.length; _i++) {
                var f = _a[_i];
                f.selected = false;
            }
            removeClass(".row.file.selected", "selected");
        }
        entry.selected = true;
        addClass(node, "selected");
        ev.stopPropagation();
    }
    if (isMobile())
        addEvent(rows.getAll(".file"), "mousedown", fileMobileClick);
    else
        addEvent(rows.getAll(".file"), "mousedown", fileClick);
    addEvent(rows.getAll(".file a"), "mousedown", fileItemDown);
    addEvent(rows.getAll(".file .button"), "mousedown", fileItemDown);
    addEvent(rows.getAll(".file .button.rename"), "click", fileRenameClick);
    addEvent(rows.getAll(".file .button.share"), "click", fileShareClick);
    addEvent(rows.getAll(".file .button.delete"), "click", fileDeleteClick);
    if (state.files.length)
        get(".files .row.empty").hide();
}
//# sourceMappingURL=manager.js.map